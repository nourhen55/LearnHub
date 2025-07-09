import React, { useState, useEffect } from 'react';
import { Plus, Users, BookOpen, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import { Teacher } from '../../dashbord/types';
import Header from './Header';
import StatCard from './StatCart';
import TeacherTable from './TeacherTable';
import TeacherModal from './TeacherModal';
import ContactSection from './ContactSection';

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
import { db } from '../../firebase'; // تأكد من إعداد Firebase بشكل صحيح في هذا الملف

const AdminDashboard: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'teachers' | 'contacts'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>();

  // Fetch teachers from Firestore where role === "professeur"
  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "professeur"));
      const querySnapshot = await getDocs(q);
      const profs: Teacher[] = querySnapshot.docs.map(docSnap => {
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

  useEffect(() => {
    fetchTeachers();
  }, []);

  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    inactive: teachers.filter(t => t.status === 'inactive').length,
    departments: new Set(teachers.map(t => t.department)).size,
  };

  // Save (create or update) teacher in Firestore
  const handleSaveTeacher = async (teacherData: Omit<Teacher, 'id'>) => {
    try {
      if (editingTeacher) {
        // Update existing
        const teacherDocRef = doc(db, "users", editingTeacher.id!);
        await updateDoc(teacherDocRef, {
          ...teacherData,
          hireDate: teacherData.hireDate ? Timestamp.fromDate(new Date(teacherData.hireDate)) : Timestamp.now(),
        });
        setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...teacherData, id: editingTeacher.id } : t));
      } else {
        // Add new
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

  // Delete teacher from Firestore
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
    setEditingTeacher(undefined);
    setIsModalOpen(true);
  };

  const TabButton: React.FC<{ tab: typeof activeTab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
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

  if (loading) {
    return <div className="text-white p-8">Chargement des professeurs...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/5 to-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <div className="px-6 py-8">
          {/* Navigation Tabs */}
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

          {/* Dashboard Tab */}
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
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      {Array.from(new Set(teachers.map(t => t.department))).map(dept => {
                        const count = teachers.filter(t => t.department === dept).length;
                        const percentage = (count / teachers.length) * 100;

                        return (
                          <div key={dept} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-300 font-medium">{dept}</span>
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

          {/* Teachers Tab */}
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

              <TeacherTable
                teachers={teachers}
                onEdit={handleEditTeacher}
                onDelete={handleDeleteTeacher}
              />
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Répertoire des Contacts
              </h2>
              <ContactSection teachers={teachers} />
            </div>
          )}
        </div>

        <TeacherModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTeacher(undefined);
          }}
          onSave={handleSaveTeacher}
          teacher={editingTeacher}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
