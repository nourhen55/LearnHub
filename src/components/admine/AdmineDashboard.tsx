import React, { useState, useEffect } from 'react';
import { Plus, Users, BookOpen, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { Teacher } from '../../dashbord/types';
import Header from './Header';
import StatCard from './StatCart';
import TeacherTable from './TeacherTable';
import TeacherModal from './TeacherModal';
import ContactSection from './ContactSection';
import { 
  addDepartement, 
  getAllDepartements, 
  updateDepartement, 
  deleteDepartement 
} from '../../services/departementservice';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from '../../firebase';

const AdminDashboard: React.FC = () => {
  // États principaux
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [departements, setDepartements] = useState<{id: string, name: string}[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'teachers' | 'contacts'>('dashboard');
  
  // États pour la gestion des professeurs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    hireDate: '',
    status: 'Actif',
    role: 'professeur'
  });

  // Récupération des données
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "professeur"));
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
          status: data.status || "active",
          role: data.role || "professeur",
        };
      });
      setTeachers(profs);
    } catch (error) {
      console.error("Erreur lors de la récupération des professeurs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartements = async () => {
    try {
      const data = await getAllDepartements();
      setDepartements(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des départements:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchDepartements();
  }, []);

  // Statistiques
  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    inactive: teachers.filter(t => t.status === 'inactive').length,
    departments: new Set(departements.map(d => d.name)).size,
  };

  // Opérations CRUD pour les départements
  const handleAddDepartment = async () => {
    const name = prompt("Nom du département ?");
    if (name) {
      try {
        const newDept = await addDepartement({ name });
        setDepartements([...departements, newDept]);
      } catch (error) {
        console.error("Erreur lors de l'ajout du département:", error);
      }
    }
  };

  const handleEditDepartment = async (id: string, oldName: string) => {
    const newName = prompt("Nouveau nom ?", oldName);
    if (newName && newName !== oldName) {
      try {
        await updateDepartement(id, { name: newName });
        setDepartements(departements.map(dept => dept.id === id ? { ...dept, name: newName } : dept));
      } catch (error) {
        console.error("Erreur lors de la modification du département:", error);
      }
    }
  };

  const handleDeleteDepartment = async (id: string, name: string) => {
    if (window.confirm(`Supprimer le département "${name}" ?`)) {
      try {
        await deleteDepartement(id);
        setDepartements(departements.filter(dept => dept.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du département:", error);
      }
    }
  };

  // Composant de bouton d'onglet
  const TabButton: React.FC<{ 
    tab: typeof activeTab; 
    label: string; 
    icon: React.ReactNode 
  }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-medium transition-all relative overflow-hidden group ${
        activeTab === tab
          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/25'
          : 'text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 backdrop-blur-sm'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      <div className="relative z-10 flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
    </button>
  );

  // Opérations CRUD pour les professeurs
  const handleSaveTeacher = async (teacherData: Omit<Teacher, 'id'>) => {
    try {
      if (editingTeacher) {
        const teacherDocRef = doc(db, "users", editingTeacher.id!);
        await updateDoc(teacherDocRef, {
          ...teacherData,
          hireDate: teacherData.hireDate ? Timestamp.fromDate(new Date(teacherData.hireDate)) : Timestamp.now(),
        });
        setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...teacherData, id: editingTeacher.id } : t));
      } else {
        const docRef = await addDoc(collection(db, "users"), {
          ...teacherData,
          hireDate: teacherData.hireDate ? Timestamp.fromDate(new Date(teacherData.hireDate)) : Timestamp.now(),
          role: "professeur",
        });
        setTeachers([...teachers, { ...teacherData, id: docRef.id }]);
      }
      setIsModalOpen(false);
      setEditingTeacher(undefined);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du professeur:", error);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      try {
        await deleteDoc(doc(db, "users", id));
        setTeachers(teachers.filter(t => t.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du professeur:", error);
      }
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleAddTeacher = () => {
    setShowAddModal(true);
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmitNewTeacher = async () => {
  const newErrors: { [key: string]: string } = {};

  if (!newTeacher.firstName.trim()) newErrors.firstName = 'Prénom requis';
  if (!newTeacher.lastName.trim()) newErrors.lastName = 'Nom requis';
  if (!newTeacher.email.trim()) newErrors.email = 'Email requis';
  if (!newTeacher.phone.trim()) newErrors.phone = 'Téléphone requis';
  if (!newTeacher.subject.trim()) newErrors.subject = 'Matière requise';
  if (!newTeacher.department.trim()) newErrors.department = 'Département requis';
  if (!newTeacher.hireDate.trim()) newErrors.hireDate = "Date d'embauche requise";

  // Affiche les erreurs
  setErrors(newErrors);

  // Ne continue que si aucune erreur
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  // Si tout est OK, on sauvegarde
  await handleSaveTeacher(newTeacher);
  setShowAddModal(false);

  // Réinitialisation du formulaire
  setNewTeacher({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    hireDate: '',
    status: 'Actif',
    role: 'professeur'
  });

  // Réinitialise aussi les erreurs
  setErrors({});
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Éléments d'arrière-plan animés */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/5 to-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <div className="px-6 py-8">
          {/* Onglets de navigation */}
          <div className="flex space-x-4 mb-8">
            <TabButton
              tab="dashboard"
              label="Tableau de Bord"
              icon={<BarChart3 className="w-5 h-5" />}
            />
            <TabButton
              tab="teachers"
              label="Gestion des Professeurs"
              icon={<Users className="w-5 h-5" />}
            />
            <TabButton
              tab="contacts"
              label="Répertoire des Contacts"
              icon={<BookOpen className="w-5 h-5" />}
            />
          </div>

          {/* Contenu des onglets */}
          <div className="transition-all duration-300">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Professeurs"
                    value={stats.total}
                    color="purple"
                    trend={{ value: "+12%", isUp: true }}
                  />
                  <StatCard
                    title="Professeurs Actifs"
                    value={stats.active}
                    color="green"
                    trend={{ value: "+8%", isUp: true }}
                  />
                  <StatCard
                    title="Professeurs Inactifs"
                    value={stats.inactive}
                    color="orange"
                    trend={{ value: "-3%", isUp: false }}
                  />
                  <StatCard
                    title="Départements"
                    value={stats.departments}
                    color="blue"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">
                          Répartition par Département
                        </h3>
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={handleAddDepartment}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                          >
                            Ajouter
                          </button>
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6 overflow-y-auto" style={{ maxHeight: '300px' }}>
                        {Array.from(new Set(departements.map(t => t.name))).map(dept => {
                          const count = teachers.filter(t => t.department === dept).length;
                          const percentage = (count / teachers.length) * 100;
                          const deptObj = departements.find(d => d.name === dept);
                          
                          return (
                            <div key={dept} className="space-y-3 group">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-gray-300 font-medium">{dept}</span>
                                  {deptObj && (
                                    <>
                                      <button 
                                        onClick={() => handleEditDepartment(deptObj.id, deptObj.name)}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
                                      >
                                        ✏️
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteDepartment(deptObj.id, deptObj.name)}
                                        className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                      >
                                        🗑️
                                      </button>
                                    </>
                                  )}
                                </div>
                                <span className="text-white font-bold text-lg">{count}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">
                          Professeurs Récents
                        </h3>
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        {teachers
                          .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
                          .slice(0, 5)
                          .map(teacher => (
                            <div key={teacher.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group">
                              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold">
                                  {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-white">
                                  {teacher.firstName} {teacher.lastName}
                                </p>
                                <p className="text-sm text-gray-300">
                                  {teacher.subject} - {new Date(teacher.hireDate).toLocaleDateString('fr-FR')}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Gestion des Professeurs
                  </h2>
                  <button
                    onClick={handleAddTeacher}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center space-x-3 shadow-xl shadow-cyan-500/25 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    <Plus className="w-6 h-6 relative z-10" />
                    <span className="relative z-10 font-medium">Ajouter un Professeur</span>
                  </button>
                </div>

                {/* Modal d'ajout */}
                {showAddModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  <div className="bg-gray-900 text-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-700 space-y-5 relative">
    <h2 className="text-2xl font-bold text-center">🧑‍🏫 Ajouter un Professeur</h2>

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
        value={newTeacher[key as keyof typeof newTeacher]}
        onChange={(e) => setNewTeacher({ ...newTeacher, [key]: e.target.value })}
      />
    ))}

    <select
      className="w-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 px-4 py-2 rounded-lg transition"
      value={newTeacher.department}
      onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
    >
      <option value="">📚 Sélectionner un département</option>
      {departements.map((dept) => (
        <option key={dept.id} value={dept.name}>
          {dept.name}
        </option>
      ))}
    </select>

    <input
      type="date"
      className="w-full bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 px-4 py-2 rounded-lg transition"
      value={newTeacher.hireDate}
      onChange={(e) => setNewTeacher({ ...newTeacher, hireDate: e.target.value })}
    />

    <div className="flex justify-end space-x-3 pt-4">
      <button
        onClick={handleSubmitNewTeacher}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg transition"
      >
        Ajouter
      </button>
      <button
        onClick={() => setShowAddModal(false)}
        className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
      >
        Annuler
      </button>
    </div>
  </div>
</div>

                )}

                <TeacherTable
                  teachers={teachers}
                  onEdit={handleEditTeacher}
                  onDelete={handleDeleteTeacher}
                />
              </div>
            )}

            {activeTab === 'contacts' && (
<ContactSection teachers={teachers} />
            )}
          </div>
        </div>

        <TeacherModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTeacher(undefined);
          }}
          onSave={handleSaveTeacher}
          teacher={editingTeacher}
          departements={departements.map(d => d.name)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;