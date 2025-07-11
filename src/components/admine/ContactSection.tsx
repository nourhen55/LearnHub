import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Search,
  Paperclip,
  Smile,
  ArrowLeft,
  Circle,
  CheckCheck,
  Check
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
  isOnline?: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

const ContactSection: React.FC = () => {
  const [teachers] = useState<Teacher[]>([]); 
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTeacher) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'student',
        receiverId: selectedTeacher.id,
        content: newMessage.trim(),
        timestamp: new Date(),
        isRead: false,
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const getTeacherMessages = (teacherId: string) => {
    return messages.filter(
      msg =>
        (msg.senderId === teacherId && msg.receiverId === 'student') ||
        (msg.senderId === 'student' && msg.receiverId === teacherId)
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

  const filteredTeachers = teachers.filter(
    teacher =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      <div className="w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col">
        <div className="p-6 border-b border-white/20">
          <h1 className="text-2xl font-bold text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredTeachers.map((teacher) => {
            const lastMessage = getLastMessage(teacher.id);
            const isSelected = selectedTeacher?.id === teacher.id;

            return (
              <div
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                className={`p-4 border-b border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  isSelected ? 'bg-white/20 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${getSubjectColor(
                        teacher.subject
                      )} rounded-full flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-sm">
                        {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                      </span>
                    </div>
                    {teacher.isOnline !== false && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white truncate">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      {lastMessage && (
                        <span className="text-xs text-slate-400">
                          {lastMessage.timestamp.toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-1">{teacher.subject}</p>
                    {lastMessage && (
                      <p className="text-sm text-slate-300 truncate">
                        {lastMessage.senderId === 'student' ? 'Vous: ' : ''}
                        {lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedTeacher ? (
          <>
            <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="lg:hidden text-white hover:text-blue-400">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getSubjectColor(
                    selectedTeacher.subject
                  )} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-sm">
                      {selectedTeacher.firstName.charAt(0)}{selectedTeacher.lastName.charAt(0)}
                    </span>
                  </div>
                  {selectedTeacher.isOnline !== false && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg">
                    {selectedTeacher.firstName} {selectedTeacher.lastName}
                  </h2>
                  <p className="text-sm text-slate-300">
                    {selectedTeacher.isOnline !== false ? (
                      <span className="flex items-center">
                        <Circle className="w-2 h-2 text-green-500 fill-current mr-2" /> En ligne
                      </span>
                    ) : (
                      `Vu pour la dernière fois ${selectedTeacher.lastSeen || 'récemment'}`
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white"><Phone className="w-5 h-5" /></button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white"><Video className="w-5 h-5" /></button>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {getTeacherMessages(selectedTeacher.id).map((message) => {
                const isFromStudent = message.senderId === 'student';
                return (
                  <div key={message.id} className={`flex ${isFromStudent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${isFromStudent ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' : 'bg-white/20 backdrop-blur-sm text-white rounded-bl-md'} shadow-lg`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className={`flex items-center justify-end mt-2 space-x-1 ${isFromStudent ? 'text-blue-100' : 'text-slate-400'}`}>
                        <span className="text-xs">
                          {message.timestamp.toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {isFromStudent && (message.isRead ? <CheckCheck className="w-4 h-4 text-blue-200" /> : <Check className="w-4 h-4 text-blue-200" />)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 p-4">
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white"><Paperclip className="w-5 h-5" /></button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Tapez votre message..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full text-white"><Smile className="w-5 h-5" /></button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 rounded-full text-white disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Send className="w-16 h-16 text-white/60" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Messagerie Enseignants</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto">
                Sélectionnez un enseignant dans la liste pour commencer une conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;