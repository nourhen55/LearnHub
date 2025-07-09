import React from 'react';
import { Phone, Mail, MapPin, Calendar, User, Star } from 'lucide-react';
import { Teacher } from '../../dashbord/types';

interface ContactSectionProps {
  teachers: Teacher[];
}

const ContactSection: React.FC<ContactSectionProps> = ({ teachers }) => {
  const activeTeachers = teachers.filter(teacher => teacher.status === 'active');

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Répertoire des Contacts
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:shadow-2xl hover:border-white/30 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative">
                    <span className="text-white font-bold text-lg">
                      {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                    </span>
                    <div className="absolute -top-1 -right-1">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-white text-lg">
                      {teacher.firstName} {teacher.lastName}
                    </h4>
                    <p className="text-cyan-400 font-medium">{teacher.subject}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors group/item">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-cyan-500/20 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <a href={`mailto:${teacher.email}`} className="hover:underline flex-1">
                      {teacher.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group/item">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-purple-500/20 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <a href={`tel:${teacher.phone}`} className="hover:underline flex-1">
                      {teacher.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center text-gray-300 group/item">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="flex-1">{teacher.department}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300 group/item">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="flex-1">Depuis {new Date(teacher.hireDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {activeTeachers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-400 text-xl">Aucun professeur actif trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;