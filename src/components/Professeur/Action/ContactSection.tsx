import React, { useState, useRef, useEffect } from 'react';
import { db } from '../../../firebase';
import { getMessagesBetweenUsers } from '../../../services/usermessage';
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
  Users, MessageCircle, Info,
  Image, File, Download, Calendar
} from 'lucide-react';

interface User {
  id: string;
  name:string
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject?: string;
  department?: string;
  hireDate?: string;
  status: 'Actif' | 'Inactif';
  role: 'admin' | 'user' | 'professeur';
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

const ContactSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Récupérer l'utilisateur connecté
const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
  const CURRENT_USER_ID = sessionStorage.getItem('userId');
  const CURRENT_USER_ROLE = currentUser.userEmail || 'professeur';

  // Formater la date relative
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

  // Charger les utilisateurs selon le rôle
  useEffect(() => {
    const fetchUsers = async () => {
  setLoading(true);
  try {
    // 🔎 Création de la requête pour "admin" et "user"
    const q = query(
      collection(db, 'users'),
      where('role', 'in', ['admine', 'user'])
    );

    // 📥 Récupération des documents
    const querySnapshot = await getDocs(q);

    // 🛠️ Transformation des documents en objets
    const usersList = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        subject: data.subject || '',
        department: data.department || '',
        hireDate: data.hireDate ? data.hireDate.toDate().toISOString() : '',
        status: data.status || 'Actif',
        role: data.role || '',
        isOnline: data.isOnline || false,
        lastSeen: data.lastSeen ? data.lastSeen.toDate() : null,
        isTyping: false,
      };
    });

    // 💾 Enregistrement dans l'état local
    setUsers(usersList);
    console.log('Utilisateurs (admin & user):', usersList);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  } finally {
    setLoading(false);
  }
};


    fetchUsers();
  }, [CURRENT_USER_ROLE]);

  // Charger les messages
 useEffect(() => {
  console.log("useEffect triggered. selectedUser:", selectedUser, "CURRENT_USER_ID:", CURRENT_USER_ID);

  if (!selectedUser) {
    console.log("Pas de selectedUser. On vide les messages.");
    setMessages([]);
    return;
  }

  const fetchInitialMessages = async () => {
    try {
      console.log("Début fetchInitialMessages");
      const messagesRef = collection(db, "messages");
      const querySnapshot = await getDocs(messagesRef);
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Messages initiales récupérées:", messages);
    } catch (error) {
      console.error("Erreur dans fetchInitialMessages:", error);
    }
  };

  fetchInitialMessages();

  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  console.log("Query définie pour onSnapshot:", q);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log("Nouveau snapshot reçu. Nombre de docs:", snapshot.docs.length);
    
    const msgs = snapshot.docs
      .map(doc => {
        const data = doc.data();
        console.log("Traitement doc id:", doc.id, "data:", data);
        return {
          id: doc.id,
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          timestamp: data.timestamp?.toDate(),
          isRead: data.isRead || false,
          type: data.type || 'text',
          fileName: data.fileName,
          fileSize: data.fileSize,
          deliveredAt: data.deliveredAt ? data.deliveredAt.toDate() : new Date(),
          readAt: data.readAt ? data.readAt.toDate() : null,
        } as Message;
      })

      .filter(m => {
        const keep = (m.senderId === CURRENT_USER_ID && m.receiverId === selectedUser.id) ||
                     (m.senderId === selectedUser.id && m.receiverId === CURRENT_USER_ID)||
                     (m.senderId === "Admine" && m.receiverId === CURRENT_USER_ID);
        if (!keep) {
          console.log("Message filtré (hors conversation):", m.id);
        }
        return keep;
      });

    console.log("Messages filtrés (entre utilisateurs):", msgs);

    // 6. تحديث حالة الرسائل في الواجهة
    setMessages(msgs);

    // 7. تمييز الرسائل التي تم استقبالها كمقروءة
    msgs.forEach(async (msg) => {
      if (msg.senderId === selectedUser.id && !msg.isRead) {
        console.log("Mise à jour du message lu id:", msg.id);
        try {
          await updateDoc(doc(db, "messages", msg.id), {
            isRead: true,
            readAt: Timestamp.fromDate(new Date())
          });
          console.log("Message mis à jour comme lu:", msg.id);
        } catch (error) {
          console.error("Erreur lors de la mise à jour du statut de lecture:", error);
        }
      }
    });
  });

  // 8. تنظيف الاشتراك عند خروج المكون أو تغيير المتغيرات في useEffect
  return () => {
    console.log("Cleanup useEffect: unsubscribe onSnapshot");
    unsubscribe();
  };

}, [selectedUser, CURRENT_USER_ID]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoyer un message
  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const now = new Date();
      const messageToSend = {
        senderId: CURRENT_USER_ID,
        receiverId: selectedUser.id,
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

  // Envoyer un fichier
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !selectedUser) return;
    
    Array.from(files).forEach(async (file) => {
      const now = new Date();
      const messageToSend = {
        senderId: CURRENT_USER_ID,
        receiverId: selectedUser.id,
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

  // Obtenir les messages entre utilisateurs
  const getUserMessages = (userId: string) => {
  return messages.filter((msg) =>
    (msg.senderId === CURRENT_USER_ID && msg.receiverId === userId) ||
    (msg.senderId === userId && msg.receiverId === CURRENT_USER_ID) ||
    (msg.senderId === "Admine" && msg.receiverId === CURRENT_USER_ID)
  );
};


  // Obtenir le dernier message
  const getLastMessage = (userId: string) => {
    const userMessages = getUserMessages(userId);
    return userMessages[userMessages.length - 1];
  };

  // Couleur selon la matière
  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathématiques: 'from-emerald-400 to-teal-500',
      Histoire: 'from-amber-400 to-orange-500',
      Anglais: 'from-rose-400 to-pink-500',
      Physique: 'from-purple-400 to-violet-500',
      Français: 'from-blue-400 to-indigo-500',
      Chimie: 'from-cyan-400 to-sky-500',
      Biologie: 'from-green-400 to-emerald-500',
      Géographie: 'from-yellow-400 to-amber-500'
    };
    return colors[subject] || 'from-slate-400 to-gray-500';
  };

  // Formater la taille des fichiers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formater la date des messages
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

  // Compter les messages non lus
  const getUnreadCount = (userId: string) => {
    return getUserMessages(userId).filter(
      m => !m.isRead && m.senderId === userId
    ).length;
  };

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter(
    user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.subject && user.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="relative mb-8">
            <div className="w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-800">Chargement des contacts</p>
            <p className="text-sm text-gray-500">Préparation de votre messagerie...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-2xl shadow-xl border-r border-gray-200/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200/50 bg-white/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Messages</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">
                  {users.filter(u => u.isOnline).length} en ligne
                </span>
              </div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Rechercher un contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Aucun contact trouvé</p>
              <p className="text-sm text-gray-400 mt-1">Essayez un autre terme de recherche</p>
            </div>
          ) : (
            <div className="space-y-1 p-3">
              {filteredUsers.map((user) => {
                const lastMessage = getLastMessage(user.id);
                const isSelected = selectedUser?.id === user.id;
                const unreadCount = getUnreadCount(user.id);

                return (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                      isSelected 
                        ? 'bg-blue-50 shadow-lg scale-[1.02] border border-blue-200/50' 
                        : 'hover:bg-gray-50/80 hover:shadow-md hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getSubjectColor(user.subject || '')} rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white transition-transform duration-300 group-hover:scale-110`}>
                          <span className="text-white font-bold text-sm">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                        {user.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm">
                            <div className="w-full h-full bg-emerald-400 rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate text-sm">
                            {user.firstName} {user.lastName}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {lastMessage && (
                              <span className="text-xs text-gray-500 font-medium">
                                {formatMessageDate(lastMessage.timestamp)}
                              </span>
                            )}
                            {unreadCount > 0 && (
                              <div className="min-w-[20px] h-5 bg-blue-500 rounded-full flex items-center justify-center px-1.5 shadow-md">
                                <span className="text-xs text-white font-bold">{unreadCount}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded-lg">
                            {user.role === "admine" ? "Admin" : 
                             user.role === "user" ? "Étudiant" : "Utilisateur"}
                          </span>
                          {user.subject && (
                            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-lg">
                              {user.subject}
                            </span>
                          )}
                        </div>

                        {user.isTyping ? (
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-blue-500 font-medium">En train d'écrire...</span>
                          </div>
                        ) : lastMessage ? (
                          <p className="text-sm text-gray-600 truncate">
                            {lastMessage.senderId === CURRENT_USER_ID ? (
                              <span className="text-gray-500">Vous: </span>
                            ) : null}
                            {lastMessage.type === 'text' ? lastMessage.content : 
                             lastMessage.type === 'image' ? '📷 Image' : '📎 Fichier'}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-400 italic">Aucun message</p>
                        )}
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-2xl">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getSubjectColor(selectedUser.subject || '')} rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white`}>
                      <span className="text-white font-bold text-sm">
                        {selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}
                      </span>
                    </div>
                    {selectedUser.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 font-medium">
                      {selectedUser.isTyping ? (
                        <span className="text-blue-500">En train d'écrire...</span>
                      ) : selectedUser.isOnline ? (
                        <span className="text-emerald-500">En ligne</span>
                      ) : (
                        formatTimeAgo(selectedUser.lastSeen)
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {[
                    { icon: Phone, label: "Appeler" },
                    { icon: Video, label: "Vidéo" },
                    { icon: Info, label: "Infos" },
                    { icon: MoreHorizontal, label: "Plus" }
                  ].map(({ icon: Icon, label }, index) => (
                    <button
                      key={index}
                      className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group relative"
                      title={label}
                    >
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {getUserMessages(selectedUser.id).length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center max-w-sm">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center">
                      <MessageCircle className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun message</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Commencez une conversation avec {selectedUser.firstName} !
                    </p>
                  </div>
                </div>
              ) : (
                getUserMessages(selectedUser.id).map((message, index) => {
                  const isOwn = message.senderId === CURRENT_USER_ID;
                  const showDate = index === 0 || 
                    (new Date(message.timestamp).toDateString() !== 
                     new Date(getUserMessages(selectedUser.id)[index - 1].timestamp).toDateString());
                  
                  return (
                    <div key={message.id}>
                      {/* Date Separator */}
                      {showDate && (
                        <div className="flex items-center justify-center my-8">
                          <div className="bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl border border-gray-200/50 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700">
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
                            className={`px-5 py-4 rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-xl relative ${
                              isOwn
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white ml-auto'
                                : 'bg-white text-gray-900 border border-gray-200/50'
                            } ${isOwn ? 'rounded-br-lg' : 'rounded-bl-lg'}`}
                          >
                            {message.type === 'text' ? (
                              <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                            ) : message.type === 'image' ? (
                              <div className="space-y-3">
                                <div className="w-48 h-32 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200/50">
                                  <Image className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{message.fileName}</p>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-4 p-2">
                                <div className="p-3 bg-gray-100 rounded-2xl">
                                  <File className="w-5 h-5 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold">{message.fileName}</p>
                                  <p className="text-xs text-gray-500">{formatFileSize(message.fileSize || 0)}</p>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                  <Download className="w-4 h-4 text-gray-500" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Message Info */}
                          <div className={`flex items-center mt-2 space-x-3 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-gray-500 font-medium">
                              {formatMessageDate(message.timestamp)}
                            </span>
                            {isOwn && (
                              <div className="flex items-center space-x-2">
                                {message.readAt ? (
                                  <div className="flex items-center space-x-1">
                                    <CheckCheck className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs text-blue-500 font-medium">Lu</span>
                                  </div>
                                ) : message.deliveredAt ? (
                                  <div className="flex items-center space-x-1">
                                    <Check className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs text-gray-400 font-medium">Envoyé</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4 text-gray-300" />
                                    <span className="text-xs text-gray-300 font-medium">En cours...</span>
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
            <div className="bg-white/90 backdrop-blur-2xl border-t border-gray-200/50 p-6">
              <div className="flex items-end space-x-4">
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
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200/50 rounded-3xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 resize-none min-h-[56px] max-h-32 transition-all duration-300 font-medium"
                    rows={1}
                  />
                  <div className="absolute right-4 top-4 flex items-center space-x-2">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <Smile className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
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
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-lg">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-xl">
                <MessageCircle className="w-16 h-16 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Messagerie</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Sélectionnez un contact dans la liste pour commencer une conversation
              </p>
              <div className="flex items-center justify-center space-x-8 text-gray-500">
                <div className="flex items-center space-x-3 bg-white/60 px-4 py-3 rounded-2xl border border-gray-200/50">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{users.length} contacts</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 px-4 py-3 rounded-2xl border border-gray-200/50">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Messages instantanés</span>
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