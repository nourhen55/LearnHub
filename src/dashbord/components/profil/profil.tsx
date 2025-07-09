// src/pages/profile/ProfilPage.tsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  User as UserIcon,
  Camera,
  Save,
  Bell,
  Shield,
  Moon,
  Sun,
  Settings,
  ArrowRight,
  Check,
} from "lucide-react";

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import User from "../../../models/users";
import { Eye, EyeOff } from "lucide-react";

function ProfilPage() {
  // Alertes
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [showAlert, setShowAlert] = useState(false);

  function showAlertMessage(message: string, type: "success" | "error" = "success") {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }

  // Gestion mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
  console.log("Début du changement de mot de passe");

  if (newPassword !== confirmPassword) {
    console.log("Erreur : les nouveaux mots de passe ne correspondent pas");
    showAlertMessage("Les nouveaux mots de passe ne correspondent pas.", "error");
    return;
  }

  if (!currentPassword || !newPassword) {
    console.log("Erreur : un ou plusieurs champs sont vides");
    showAlertMessage("Veuillez remplir tous les champs du mot de passe.", "error");
    return;
  }

  try {
    const user = auth.currentUser;
    console.log("Utilisateur actuel :", user);

    if (!user || !user.email) {
      console.log("Erreur : utilisateur non authentifié ou email manquant");
      throw new Error("Utilisateur non authentifié");
    }

    console.log("Email utilisateur :", user.email);
    console.log("Mot de passe actuel saisi :", currentPassword);

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    console.log("Credential créé :", credential);

    console.log("Tentative de ré-authentification...");
    await reauthenticateWithCredential(user, credential);
    console.log("Ré-authentification réussie");

    console.log("Mise à jour du mot de passe...");
    await updatePassword(user, newPassword);
    console.log("Mot de passe mis à jour avec succès");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showAlertMessage("Mot de passe mis à jour avec succès.", "success");
  } catch (error: any) {
    console.error("Erreur lors du changement de mot de passe :", error);
    showAlertMessage("Erreur lors du changement de mot de passe : " + error.message, "error");
  }
};


  // Données profil
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    localisation: "",
    company: "",
    position: "",
    status: "",
    interests: { frontend: false, backend: false, design: false, devops: false },
    discoverySource: "",
  });

  // Utilisateur connecté
  const [user, setUser] = useState<User | null>(null);

  // Charger données utilisateur Firestore
  async function fetchUserData(uid: string): Promise<User | null> {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return new User(
          uid,
          data.name || "",
          data.email || "",
          data.photoURL || "",
          data.createdAt ? data.createdAt.toDate() : new Date(),
          ""
        );
      } else {
        console.log("Utilisateur non trouvé");
        return null;
      }
    } catch (error) {
      console.error("Erreur chargement utilisateur:", error);
      return null;
    }
  }

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchUserData(currentUser.uid).then((userData) => {
        if (userData) {
          setUser(userData);

          const nameParts = userData.name.trim().split(" ");
          setProfileData((prev) => ({
            ...prev,
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: userData.email,
          }));

          // Charger aussi les autres données spécifiques
          const docRef = doc(db, "users", currentUser.uid);
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setProfileData((prev) => ({
                ...prev,
                phone: data.phone || "",
                localisation: data.localisation || "",
                company: data.company || "",
                position: data.position || "",
                status: data.status || "",
                interests: data.interests || { frontend: false, backend: false, design: false, devops: false },
                discoverySource: data.discoverySource || "",
              }));
            }
          });
        }
      });
    }
  }, []);

  // Sauvegarder modifications profil
  const handleSave = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: profileData.firstName + " " + profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        localisation: profileData.localisation,
        company: profileData.company,
        position: profileData.position,
      });

      showAlertMessage("Profil mis à jour avec succès !", "success");
    } catch (error: any) {
      console.error("Erreur mise à jour :", error);
      showAlertMessage("Erreur lors de la mise à jour du profil : " + error.message, "error");
    }
  };

  // Sauvegarder préférences compte
  const handleSaveAccount = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        status: profileData.status,
        interests: profileData.interests,
        discoverySource: profileData.discoverySource,
      });
      showAlertMessage("Préférences du compte mises à jour avec succès !", "success");
    } catch (error: any) {
      console.error("Erreur mise à jour compte :", error);
      showAlertMessage("Erreur lors de la mise à jour : " + error.message, "error");
    }
  };

  // Options pour statut, intérêts et source découverte
  const statusOptions = [
    { value: "student", label: "Étudiant", icon: UserIcon },
    { value: "employed", label: "Travailleur", icon: Shield },
    { value: "other", label: "Autre", icon: Settings },
  ];

  const interestOptions = [
    { key: "frontend", label: "Frontend", icon: Settings, color: "bg-blue-500" },
    { key: "backend", label: "Backend", icon: Shield, color: "bg-green-500" },
    { key: "design", label: "Design", icon: UserIcon, color: "bg-pink-500" },
    { key: "devops", label: "DevOps", icon: Save, color: "bg-yellow-500" },
  ];

  const discoveryOptions = [
    { value: "friend", label: "Un ami" },
    { value: "school", label: "L'école" },
    { value: "google", label: "Google" },
    { value: "other", label: "Autre" },
  ];

  // Modifier un champ simple
  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  // Modifier les intérêts (multi choix)
  const handleInterestChange = (key: string) => {
    setProfileData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [key]: !prev.interests[key],
      },
    }));
  };

  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleNotificationChange = (type: string) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickChangePhoto = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  // Upload photo
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      showAlertMessage("Fichier trop volumineux (max 2MB)", "error");
      return;
    }

    try {
      setUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `profile_photos/${user?.uid}/${file.name}`);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { photoURL: downloadURL });
        setUser((prev) => (prev ? { ...prev, photoURL: downloadURL } : prev));
      }

      showAlertMessage("Photo mise à jour avec succès", "success");
    } catch (error) {
      console.error(error);
      showAlertMessage("Erreur lors de l'upload de la photo", "error");
    } finally {
      setUploading(false);
    }
  };

  const navigate = useNavigate();

  const tabs = [
    { id: "profile", label: "Profil", icon: UserIcon },
    { id: "account", label: "Compte", icon: Settings },
    { id: "security", label: "Sécurité", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Alert message */}
      {showAlert && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold animate-slideIn ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alertMessage}
        </div>
      )}

      <header
        className={`border-b transition-colors duration-300 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isDarkMode ? "bg-slate-700" : "bg-slate-100"}`}>
                <Settings className={`${isDarkMode ? "text-slate-300" : "text-slate-600"}`} size={24} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Paramètres du Profil</h1>
                <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Gérez vos informations personnelles et préférences</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-300" : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-300"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <nav className={`rounded-xl p-6 transition-colors duration-300 ${isDarkMode ? "bg-slate-800" : "bg-white"} shadow-lg`}>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-amber-500 text-white shadow-lg transform scale-105"
                        : isDarkMode
                        ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          <div className={`lg:col-span-3 rounded-xl p-8 transition-colors duration-300 ${isDarkMode ? "bg-slate-800" : "bg-white"} shadow-lg`}>
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Informations du Profil</h2>
                  <button
                    onClick={handleSave}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Save size={18} />
                    Sauvegarder
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={
                        user && user.photoURL && user.photoURL.trim() !== ""
                          ? user.photoURL
                          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-amber-400"
                    />
                    <button
                      onClick={handleClickChangePhoto}
                      className="absolute -bottom-2 -right-2 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors duration-300"
                      disabled={uploading}
                      title={uploading ? "Téléchargement en cours..." : "Changer la photo"}
                    >
                      <Camera size={16} />
                    </button>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>Photo de Profil</h3>
                    <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"} mb-3`}>JPG, PNG ou GIF. Taille maximale 2MB.</p>
                    <button
                      onClick={handleClickChangePhoto}
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
                      }`}
                      disabled={uploading}
                    >
                      {uploading ? "Téléchargement..." : "Changer la photo"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Prénom</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                          : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Nom</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                          : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                          : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Téléphone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                          : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>Localisation</label>
                    <input
                      type="text"
                      value={profileData.localisation}
                      onChange={(e) => handleInputChange("localisation", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                          : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    Préférences Professionnelles
                  </h2>
                  <button
                    onClick={handleSaveAccount}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <Save size={18} />
                    Sauvegarder
                  </button>
                </div>

                {/* Statut Professionnel */}
                <div
                  className={`p-6 rounded-lg border ${
                    isDarkMode ? "border-slate-700 bg-slate-700/50" : "border-slate-200 bg-slate-50"
                  } mb-8`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    Statut Professionnel
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleInputChange("status", option.value)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 ${
                            profileData.status === option.value
                              ? "border-amber-500 bg-amber-50 text-amber-700"
                              : isDarkMode
                              ? "border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500"
                              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                          }`}
                          type="button"
                        >
                          <Icon size={20} />
                          <span className="font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Domaines d'Intérêt */}
                <div
                  className={`p-6 rounded-lg border ${
                    isDarkMode ? "border-slate-700 bg-slate-700/50" : "border-slate-200 bg-slate-50"
                  } mb-8`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    Domaines d'Intérêt
                  </h3>
                  <p className={`text-sm mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    Sélectionnez les domaines qui vous intéressent (plusieurs choix possibles)
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interestOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = profileData.interests[option.key];
                      return (
                        <button
                          key={option.key}
                          onClick={() => handleInterestChange(option.key)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 ${
                            isSelected
                              ? "border-amber-500 bg-amber-50 text-amber-700 transform scale-105"
                              : isDarkMode
                              ? "border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500"
                              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                          }`}
                          type="button"
                        >
                          <div className={`p-2 rounded-lg ${isSelected ? "bg-amber-500 text-white" : option.color + " text-white"}`}>
                            <Icon size={16} />
                          </div>
                          <span className="font-medium">{option.label}</span>
                          {isSelected && <Check size={16} className="ml-auto text-amber-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Source de découverte */}
                <div
                  className={`p-6 rounded-lg border ${
                    isDarkMode ? "border-slate-700 bg-slate-700/50" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    Comment avez-vous découvert notre application ?
                  </h3>
                  <div className="space-y-3">
                    {discoveryOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                          isDarkMode ? "hover:bg-slate-600" : "hover:bg-slate-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="discoverySource"
                          value={option.value}
                          checked={profileData.discoverySource === option.value}
                          onChange={(e) => handleInputChange("discoverySource", e.target.value)}
                          className="w-4 h-4 text-amber-500 border-slate-300 focus:ring-amber-500"
                        />
                        <span className={`font-medium ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Sécurité
                </h2>

                <div className="space-y-6">
                  {/* Section changement mot de passe */}
                  <div
                    className={`p-6 rounded-lg border ${
                      isDarkMode ? "border-slate-700 bg-slate-700/50" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Changer le mot de passe
                    </h3>

                    <div className="space-y-4">
                      {/* Ancien mot de passe */}
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Mot de passe actuel
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                                : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                            } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                              isDarkMode ? "text-slate-400 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"
                            }`}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>

                      {/* Nouveau mot de passe */}
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                              : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                          } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      {/* Confirmation nouveau mot de passe */}
                      <div>
                        <label
                          className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Confirmer le nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-slate-700 border-slate-600 text-white focus:border-amber-400"
                              : "bg-white border-slate-300 text-slate-800 focus:border-amber-500"
                          } focus:outline-none focus:ring-2 focus:ring-amber-500/20`}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      {/* Bouton mise à jour */}
                      <button
                        onClick={handleChangePassword}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        Mettre à jour le mot de passe
                      </button>
                    </div>
                  </div>

                  {/* Section Authentification à deux facteurs */}
                  <div
                    className={`p-6 rounded-lg border ${
                      isDarkMode ? "border-slate-700 bg-slate-700/50" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Authentification à Deux Facteurs
                    </h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      Ajoutez une couche de sécurité supplémentaire à votre compte.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                      <Shield size={18} />
                      Activer 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Notifications
                </h2>

                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className={`flex items-center justify-between p-6 rounded-lg border ${
                      isDarkMode ? 'border-slate-700 bg-slate-700/50' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          {key === 'email' ? 'Notifications Email' : 
                           key === 'push' ? 'Notifications Push' : 'Notifications SMS'}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {key === 'email' ? 'Recevez des notifications par email' : 
                           key === 'push' ? 'Recevez des notifications push sur votre navigateur' : 
                           'Recevez des notifications par SMS'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          value ? 'bg-amber-500' : isDarkMode ? 'bg-slate-600' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilPage;