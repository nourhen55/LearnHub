import React, { useState, useEffect } from 'react';
import { X, Save, User, Sparkles } from 'lucide-react';
import { Teacher } from './TeacherTable'; // même interface

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacher: Omit<Teacher, 'id' | 'role'> & { id?: string }) => void;
  teacher?: Teacher;
}

const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose, onSave, teacher }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    hireDate: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phone: teacher.phone,
        subject: teacher.subject,
        department: teacher.department,
        hireDate: teacher.hireDate,
        status: teacher.status,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        hireDate: '',
        status: 'active',
      });
    }
  }, [teacher, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: teacher?.id });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
        <div className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg relative">
                <User className="w-6 h-6 text-white" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {teacher ? 'Modifier le professeur' : 'Ajouter un professeur'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-2xl border border-white/20 hover:border-white/30"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Prénom</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                required
              />
            </div>
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Nom</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                required
              />
            </div>
            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                required
              />
            </div>
            {/* Matière */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Matière</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 transition-all backdrop-blur-sm"
                required
              />
            </div>
            {/* Département */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Département</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-sm"
                required
              >
                <option value="">Sélectionnez un département</option>
                <option value="Sciences">Sciences</option>
                <option value="Lettres">Lettres</option>
                <option value="Langues">Langues</option>
                <option value="Sciences Humaines">Sciences Humaines</option>
                <option value="Arts">Arts</option>
                <option value="Sport">Sport</option>
              </select>
            </div>
            {/* Date d'embauche */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Date d'embauche</label>
              <input
                type="date"
                value={formData.hireDate}
                onChange={e => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-sm"
                required
              />
            </div>
            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-3">Statut</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-2xl text-white transition-all backdrop-blur-sm"
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>

            {/* Boutons */}
            <div className="flex space-x-4 pt-8">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 text-gray-300 bg-white/5 border border-white/20 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-3 shadow-xl shadow-cyan-500/25 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <Save className="w-5 h-5 relative z-10" />
                <span className="relative z-10 font-medium">Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherModal;
