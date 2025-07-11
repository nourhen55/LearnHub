import React from "react";

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  hireDate: string;
  status: "Actif" | "Inactif";
}

interface TeacherTableProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: string) => void;
}

const TeacherTable: React.FC<TeacherTableProps> = ({ teachers, onEdit, onDelete }) => {
  return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-slate-600 text-lg">
            {teachers.length} enseignant{teachers.length > 1 ? 's' : ''} enregistré{teachers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                  <th className="px-6 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        Enseignant
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        Contact
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        Matière
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        Département
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        Date d'embauche
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        Statut
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-right">
                    <span className="text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200/50">
                {teachers.map((teacher, index) => (
                  <tr 
                    key={teacher.id}
                    className={`
                      group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50
                      ${index % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/30'}
                      hover:shadow-lg hover:scale-[1.01] hover:z-10 relative
                    `}
                  >
                    {/* Teacher Info */}
                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <span className="text-white font-bold text-sm">
                              {teacher.firstName.charAt(0)}{teacher.lastName.charAt(0)}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-lg group-hover:text-blue-700 transition-colors">
                            {teacher.firstName} {teacher.lastName}
                          </div>
                          <div className="text-slate-500 text-sm font-medium">
                            ID: {teacher.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-6 py-6">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-slate-700 text-sm font-medium">{teacher.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-slate-600 text-sm">{teacher.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-6">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-purple-800 font-semibold text-sm">{teacher.subject}</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-6">
                      <div className="font-medium text-slate-700 text-sm bg-slate-100 px-3 py-2 rounded-lg inline-block group-hover:bg-slate-200 transition-colors">
                        {teacher.department}
                      </div>
                    </td>

                    {/* Hire Date */}
                    <td className="px-6 py-6">
                      <div className="text-slate-600 font-medium text-sm">
                        {new Date(teacher.hireDate).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-6">
                      <div className={`
                        inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold shadow-sm
                        ${teacher.status === 'Actif' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                          : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
                        }
                        group-hover:shadow-md transition-all duration-300
                      `}>
                        <div className={`
                          w-2 h-2 rounded-full mr-2 animate-pulse
                          ${teacher.status === 'Actif' ? 'bg-green-500' : 'bg-red-500'}
                        `}></div>
                        {teacher.status}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-6">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onEdit(teacher)}
                          className="group/btn relative w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                          title="Modifier"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Modifier
                          </div>
                        </button>
                        <button
                          onClick={() => onDelete(teacher.id)}
                          className="group/btn relative w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                          title="Supprimer"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Supprimer
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {teachers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">Aucun enseignant trouvé</h3>
              <p className="text-slate-500 text-lg">Commencez par ajouter votre premier enseignant à la base de données</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {teachers.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{teachers.length}</div>
                  <div className="text-slate-600 text-sm">Total Enseignants</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {teachers.filter(t => t.status === 'Actif').length}
                  </div>
                  <div className="text-slate-600 text-sm">Actifs</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {new Set(teachers.map(t => t.subject)).size}
                  </div>
                  <div className="text-slate-600 text-sm">Matières</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default TeacherTable;