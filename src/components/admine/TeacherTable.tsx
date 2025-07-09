// components/ProfessorsList.tsx
import React, { useEffect, useState } from "react";
import User from "../../models/users";
import { fetchProfessors } from "../../services/userProfesseur";

const ProfessorsList: React.FC = () => {
  const [professors, setProfessors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfessors = async () => {
      setLoading(true);
      const profs = await fetchProfessors();
      setProfessors(profs);
      setLoading(false);
    };
    loadProfessors();
  }, []);

  if (loading) return <p>Chargement des professeurs...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Liste des professeurs</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((prof) => (
            <tr key={prof.uid}>
              <td className="border border-gray-300 px-4 py-2">{prof.name}</td>
              <td className="border border-gray-300 px-4 py-2">{prof.email}</td>
              <td className="border border-gray-300 px-4 py-2">{prof.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessorsList;
