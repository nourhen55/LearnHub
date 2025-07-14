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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  <div className="bg-gray-900 text-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-700 relative">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
    >
      <X />
    </button>

    <h2 className="text-2xl font-bold text-center mb-6">
       {teacher ? 'Modifier' : 'Ajouter'} un Professeur
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { placeholder: 'Prénom', key: 'firstName', type: 'text' },
        { placeholder: 'Nom', key: 'lastName', type: 'text' },
        { placeholder: 'Email', key: 'email', type: 'email' },
        { placeholder: 'Téléphone', key: 'phone', type: 'text' },
        { placeholder: 'Matière', key: 'subject', type: 'text' },
      ].map(({ placeholder, key, type }) => (
        <input
          key={key}
          type={type}
          placeholder={placeholder}
          className="w-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 px-4 py-2 rounded-lg outline-none transition"
          value={formData[key as keyof typeof formData]}
          onChange={(e) =>
            setFormData({ ...formData, [key]: e.target.value })
          }
        />
      ))}

      <select
        className="w-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 px-4 py-2 rounded-lg transition"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
      >
        <option value="">📚 Sélectionner un département</option>
        {departements.map((dept, idx) => (
          <option key={idx} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="w-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 px-4 py-2 rounded-lg transition"
        value={formData.hireDate}
        onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
      />

      <select
        className="w-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 px-4 py-2 rounded-lg transition"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value as 'Actif' | 'Inactif' })
        }
      >
        <option value="Actif">✅ Actif</option>
        <option value="Inactif">⛔ Inactif</option>
      </select>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" />
          <span>{teacher ? 'Enregistrer' : 'Ajouter'}</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
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
