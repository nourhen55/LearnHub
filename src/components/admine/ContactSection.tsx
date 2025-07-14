import React, { useState, useRef, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import {
  Send, Search, ArrowLeft, Check, CheckCheck, Clock, 
  Phone, Video, MoreHorizontal, Paperclip, Smile,
  Circle, Users, MessageCircle, Info, Settings,
  Image, File, Download, Eye, Calendar
} from 'lucide-react';

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  hireDate: string;
  status: 'Actif' | 'Inactif';
  role: string;
  isOnline?: boolean;
  lastSeen?: Date | null;
  avatar?: string;
  isTyping?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  fileName?: string;
  fileSize?: number;
  deliveredAt?: Date;
  readAt?: Date;
}

const CURRENT_USER_ID = 'Admine';

const ContactSection: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatTimeAgo = (date: Date | null): string => {
    if (!date) return 'En ligne';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMin < 1) return 'À l\'instant';
    if (diffMin < 60) return `Il y a ${diffMin} min`;
    if (diffHrs < 24) return `Il y a ${diffHrs} h`;
    if (diffDays < 7) return `Il y a ${diffDays} j`;
    
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "professeur"));
        const querySnapshot = await getDocs(q);

        const profs = querySnapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            subject: data.subject || "",
            department: data.department || "",
            hireDate: data.hireDate ? data.hireDate.toDate().toISOString() : "",
            status: data.status || "Actif",
            role: data.role || "professeur",
            isOnline: data.isOnline || false,
            lastSeen: data.lastSeen ? data.lastSeen.toDate() : null,
            isTyping: false
          };
        });
        setTeachers(profs);
      } catch (error) {
        console.error("Erreur lors de la récupération des professeurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    if (!selectedTeacher) {
      setMessages([]);
      return;
    }

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            senderId: data.senderId,
            receiverId: data.receiverId,
            content: data.content,
            timestamp: data.timestamp.toDate(),
            isRead: data.isRead || false,
            type: data.type || 'text',
            fileName: data.fileName,
            fileSize: data.fileSize,
            deliveredAt: data.deliveredAt ? data.deliveredAt.toDate() : new Date(),
            readAt: data.readAt ? data.readAt.toDate() : null,
          } as Message;
        })
        .filter(m =>
          (m.senderId === CURRENT_USER_ID && m.receiverId === selectedTeacher.id) ||
          (m.senderId === selectedTeacher.id && m.receiverId === CURRENT_USER_ID)
        );

      setMessages(msgs);

      // Marquer les messages reçus comme lus
      msgs.forEach(async (msg) => {
        if (msg.senderId === selectedTeacher.id && !msg.isRead) {
          try {
            await updateDoc(doc(db, "messages", msg.id), {
              isRead: true,
              readAt: Timestamp.fromDate(new Date())
            });
          } catch (error) {
            console.error("Erreur lors de la mise à jour du statut de lecture:", error);
          }
        }
      });
    });

    return () => unsubscribe();
  }, [selectedTeacher]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedTeacher) {
      const now = new Date();
      const messageToSend = {
        senderId: CURRENT_USER_ID,
        receiverId: selectedTeacher.id,
        content: newMessage.trim(),
        timestamp: Timestamp.fromDate(now),
        isRead: false,
        type: 'text',
        deliveredAt: Timestamp.fromDate(now)
      };

      try {
        await addDoc(collection(db, "messages"), messageToSend);
        setNewMessage('');
      } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
      }
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !selectedTeacher) return;
    
    Array.from(files).forEach(async (file) => {
      const now = new Date();
      const messageToSend = {
        senderId: CURRENT_USER_ID,
        receiverId: selectedTeacher.id,
        content: file.name,
        timestamp: Timestamp.fromDate(now),
        isRead: false,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        fileName: file.name,
        fileSize: file.size,
        deliveredAt: Timestamp.fromDate(now)
      };

      try {
        await addDoc(collection(db, "messages"), messageToSend);
      } catch (error) {
        console.error("Erreur lors de l'envoi du fichier :", error);
      }
    });
  };

  const getTeacherMessages = (teacherId: string) => {
    return messages.filter(
      msg =>
        (msg.senderId === teacherId && msg.receiverId === CURRENT_USER_ID) ||
        (msg.senderId === CURRENT_USER_ID && msg.receiverId === teacherId)
    );
  };

  const getLastMessage = (teacherId: string) => {
    const teacherMessages = getTeacherMessages(teacherId);
    return teacherMessages[teacherMessages.length - 1];
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathématiques: 'from-blue-500 to-indigo-600',
      Histoire: 'from-amber-500 to-orange-600',
      Anglais: 'from-emerald-500 to-teal-600',
      Physique: 'from-purple-500 to-violet-600',
      Français: 'from-rose-500 to-pink-600',
      Chimie: 'from-cyan-500 to-blue-600',
      Biologie: 'from-green-500 to-emerald-600',
      Géographie: 'from-yellow-500 to-amber-600'
    };
    return colors[subject] || 'from-gray-500 to-slate-600';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatMessageDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffInHours < 48) {
      return 'Hier ' + date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }) + ' ' + date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getUnreadCount = (teacherId: string) => {
    return getTeacherMessages(teacherId).filter(
      m => !m.isRead && m.senderId === teacherId
    ).length;
  };

  const filteredTeachers = teachers.filter(
    teacher =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des professeurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">
                {teachers.filter(t => t.isOnline).length} en ligne
              </span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {filteredTeachers.length === 0 ? (
            <div className="p-6 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-400">Aucun professeur trouvé</p>
            </div>
          ) : (
            filteredTeachers.map((teacher) => {
              const lastMessage = getLastMessage(teacher.id);
              const isSelected = selectedTeacher?.id === teacher.id;
              const unreadCount = getUnreadCount(teacher.id);

              return (
                <div
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/15 ${
                    isSelected ? 'bg-white/20 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getSubjectColor(teacher.subject)} rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20`}>
                        <span className="text-white font-bold text-sm">
                          {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                        </span>
                      </div>
                      {teacher.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white truncate">
                          {teacher.firstName} {teacher.lastName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {lastMessage && (
                            <span className="text-xs text-slate-400">
                              {formatMessageDate(lastMessage.timestamp)}
                            </span>
                          )}
                          {unreadCount > 0 && (
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                              <span className="text-xs text-white font-bold">{unreadCount}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-slate-400">{teacher.subject}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{teacher.department}</span>
                      </div>
                      {teacher.isTyping ? (
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-blue-400">En train d'écrire...</span>
                        </div>
                      ) : lastMessage ? (
                        <p className="text-sm text-slate-300 truncate">
                          {lastMessage.senderId === CURRENT_USER_ID ? 'Vous: ' : ''}
                          {lastMessage.type === 'text' ? lastMessage.content : 
                           lastMessage.type === 'image' ? '📷 Image' : '📎 Fichier'}
                        </p>
                      ) : (
                        <p className="text-sm text-slate-500">Aucun message</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedTeacher ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedTeacher(null)}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                  <div className="relative">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getSubjectColor(selectedTeacher.subject)} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-sm">
                        {selectedTeacher.firstName.charAt(0)}{selectedTeacher.lastName.charAt(0)}
                      </span>
                    </div>
                    {selectedTeacher.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">
                      {selectedTeacher.firstName} {selectedTeacher.lastName}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {selectedTeacher.isTyping ? 'En train d\'écrire...' : 
                       selectedTeacher.isOnline ? 'En ligne' : formatTimeAgo(selectedTeacher.lastSeen)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Video className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Info className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {getTeacherMessages(selectedTeacher.id).length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">Aucun message</p>
                    <p className="text-slate-500 text-sm">Commencez la conversation !</p>
                  </div>
                </div>
              ) : (
                getTeacherMessages(selectedTeacher.id).map((message, index) => {
                  const isOwn = message.senderId === CURRENT_USER_ID;
                  const showDate = index === 0 || 
                    (new Date(message.timestamp).toDateString() !== 
                     new Date(getTeacherMessages(selectedTeacher.id)[index - 1].timestamp).toDateString());
                  
                  return (
                    <div key={message.id}>
                      {/* Date Separator */}
                      {showDate && (
                        <div className="flex items-center justify-center my-6">
                          <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-300">
                                {message.timestamp.toLocaleDateString('fr-FR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}>
                        <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                              isOwn
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                : 'bg-white/10 backdrop-blur-xl text-white border border-white/20'
                            }`}
                          >
                            {message.type === 'text' ? (
                              <p className="text-sm leading-relaxed">{message.content}</p>
                            ) : message.type === 'image' ? (
                              <div className="space-y-2">
                                <div className="w-48 h-32 bg-slate-700/50 rounded-lg flex items-center justify-center border border-white/10">
                                  <Image className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-xs text-slate-300">{message.fileName}</p>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-3 p-2">
                                <div className="p-2 bg-slate-700/50 rounded-lg">
                                  <File className="w-5 h-5 text-slate-300" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{message.fileName}</p>
                                  <p className="text-xs text-slate-400">{formatFileSize(message.fileSize || 0)}</p>
                                </div>
                                <button className="p-1 hover:bg-white/10 rounded transition-colors">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Message Info */}
                          <div className={`flex items-center mt-1 space-x-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-slate-400">
                              {formatMessageDate(message.timestamp)}
                            </span>
                            {isOwn && (
                              <div className="flex items-center space-x-1">
                                {message.readAt ? (
                                  <div className="flex items-center space-x-1">
                                    <CheckCheck className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs text-blue-400">Lu</span>
                                  </div>
                                ) : message.deliveredAt ? (
                                  <div className="flex items-center space-x-1">
                                    <Check className="w-4 h-4 text-slate-400" />
                                    <span className="text-xs text-slate-400">Envoyé</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span className="text-xs text-slate-500">En cours...</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 p-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Tapez votre message..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[48px] max-h-32 transition-all duration-200"
                    rows={1}
                  />
                  <div className="absolute right-3 top-3 flex items-center space-x-2">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Smile className="w-5 h-5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Paperclip className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <MessageCircle className="w-16 h-16 text-white/60" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Messagerie Enseignants</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                Sélectionnez un enseignant dans la liste pour commencer une conversation
              </p>
              <div className="mt-8 flex items-center justify-center space-x-8 text-slate-500">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{teachers.length} enseignants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Messages instantanés</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;