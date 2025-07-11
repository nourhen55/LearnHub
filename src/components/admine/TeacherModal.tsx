import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Teacher } from './TeacherTable'; // Interface Teacher

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacher: Omit<Teacher, 'id' | 'role'> & { id?: string }) => void;
  teacher?: Teacher;
  departements: string[];
}

const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose, onSave, teacher, departements }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    hireDate: '',
    status: 'Actif' as 'Actif' | 'Inactif',
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
        status: 'Actif',
      });
    }
  }, [teacher, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: teacher?.id });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-700 space-y-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">🧑‍🏫 {teacher ? 'Modifier' : 'Ajouter'} un Professeur</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <input
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <input
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            type="text"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            type="text"
            placeholder="Matière"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <select
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          >
            <option value="">Sélectionner un département</option>
            {departements.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
          <input
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            type="date"
            value={formData.hireDate}
            onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
          />
          <select
            className="w-full bg-gray-700 border border-gray-600 px-3 py-2 rounded"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Actif' | 'Inactif' })}
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{teacher ? 'Enregistrer' : 'Ajouter'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
