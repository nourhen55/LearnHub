import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

import { db } from "../firebase";
import { 
  Globe, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ArrowLeft,
  User as IconUser,
  CheckCircle,
} from 'lucide-react';

type AuthMode = 'login' | 'register' | 'forgot';
import User from "../models/users";  
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { newUserToFirestore,saveUserToFirestore, getUserFromFirestore } from "../services/userService";
import { saveUserparam} from "../services/paramService";

function Login() {
    const navigate = useNavigate();

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // جلب المستخدم حسب uid من Firestore
    let existingUser = await getUserFromFirestore(firebaseUser.uid);

    if (!existingUser) {
      const newUser = new User(
        crypto.randomUUID(),
    formData.firstName + " " + formData.lastName,
    formData.email,
    "user",             // rôle
    formData.password,  // mot de passe
    undefined,          // photoURL
    new Date(),         // createdAt
    true,               // ✅ isOnline ← مصحّحة
    null                // ✅ lastSeen
      );

      await saveUserToFirestore(newUser);
      await saveUserparam(newUser);
      
      existingUser = newUser; // ✅ بعد التسجيل، استعمله مباشرة
    }

    // تخزين بيانات المستخدم في sessionStorage
    sessionStorage.setItem("userId", existingUser.uid);
    sessionStorage.setItem("userName", existingUser.name || "");
    sessionStorage.setItem("userEmail", existingUser.email || "");

    // ✅ استخدم role من existingUser وليس من firebaseUser
    if (existingUser.role === "user") {
      navigate("/dashboard");
    } else if (existingUser.role === "professeur") {
      navigate("/DashbordProf");
    } else if (existingUser.role === "admine") {
      navigate("/dashboardAdmine");
    } else {
      alert("❌ Rôle non reconnu.");
    }
  } catch (error) {
    console.error("Erreur d'authentification :", error);
  }
};

  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

const handleLogin = async () => {
  console.log("Début de handleLogin");

  if (!formData.email || !formData.password) {
    alert("Merci de remplir tous les champs");
    return;
  }

  try {
    console.log("Recherche de l'utilisateur avec email:", formData.email);

    const q = query(collection(db, "users"), where("email", "==", formData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("❌ Utilisateur non trouvé avec cet email.");
      console.log("Utilisateur non trouvé dans Firestore");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    console.log("Utilisateur trouvé:", userData);

    if (userData.password !== formData.password) {
      alert("❌ Mot de passe incorrect.");
      return;
    }

    alert("✅ Connexion réussie !");
    sessionStorage.setItem("userId", userData.uid);
        sessionStorage.setItem("userName", userData.displayName || "");
    sessionStorage.setItem("userEmail", userData.email || "");
if (userData.role === "user") {
  navigate("/dashboard");
} else if (userData.role === "professeur") {
  navigate("/DashbordProf");
} else if (userData.role === "admine") {
  navigate("/dashboardAdmine");
} else {
  alert("❌ Rôle non reconnu.");
}
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("❌ Une erreur est survenue pendant la connexion.");
  }
};

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mot de passe
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
 
        </label>
        <button
          type="button"
          onClick={() => setMode('forgot')}
          className="text-sm text-blue-600 hover:text-blue-500 font-medium"
        >
          Mot de passe oublié ?
        </button>
      </div>

      <button
      onClick={handleLogin}
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <span>Se connecter</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
const handleSubmit = async () => {
  if (formData.password !== formData.confirmPassword) {
    alert("❌ Les mots de passe ne correspondent pas !");
    return;
  }

try {
  const newUser = new User(
    crypto.randomUUID(),
    formData.firstName + " " + formData.lastName,
    formData.email,
    "user",             // rôle
    formData.password,  // mot de passe
    undefined,          // photoURL
    new Date(),         // createdAt
    true,               // ✅ isOnline ← مصحّحة
    null                // ✅ lastSeen
  );




    await newUserToFirestore(newUser);
    await saveUserparam(newUser);
    console.log("✅ Utilisateur enregistré :", newUser);

    sessionStorage.setItem("userId", newUser.uid);
    sessionStorage.setItem("userName", newUser.name || "");
    sessionStorage.setItem("userEmail", newUser.email || "");

if (newUser.role === "user") {
  navigate("/dashboard");
} else if (newUser.role === "professeur") {
  navigate("/dashboardprof");
} else if (newUser.role === "admine") {
  navigate("/dashboardAdmine");
} else {
  alert("❌ Rôle non reconnu.");
}
  } catch (error) {
    console.error("❌ Erreur d'inscription :", error);
    alert("⚠️ Une erreur est survenue lors de l'inscription.");
  }
};


  const renderRegisterForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom
          </label>
          <div className="relative">
            <IconUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Jean"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Dupont"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mot de passe
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirmer le mot de passe
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}

        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <span>Créer mon compte</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-xs text-gray-500 text-center">
        En créant un compte, vous acceptez nos{' '}
        <a href="#" className="text-blue-600 hover:text-blue-500">Conditions d'utilisation</a>
        {' '}et notre{' '}
        <a href="#" className="text-blue-600 hover:text-blue-500">Politique de confidentialité</a>
      </p>
    </div>
  );


  const sendVerificationCode = () => {
    if (!formData.email) {
      alert("Merci de saisir votre email");
      return;
    }
    const actionCodeSettings = {
  url: "http://localhost:5000/reset-password",
  handleCodeInApp: true,
};
sendPasswordResetEmail(auth, formData.email, actionCodeSettings)
  .then(() => {
    alert("📩 Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.");
  })
  .catch((error) => {
    console.error(error);
    alert("❌ Une erreur s’est produite. Veuillez vérifier l’adresse e-mail saisie.");
  });
  };
const renderForgotForm = () => (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <p className="text-gray-600">
        Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Adresse email
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="votre@email.com"
          required
        />
      </div>
    </div>

    <button
      type="button"
      onClick={sendVerificationCode}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
    >
      <span>Envoyer le lien</span>
      <ArrowRight className="w-5 h-5" />
    </button>

    <button
      type="button"
      onClick={() => setMode('login')}
      className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Retour à la connexion</span>
    </button>
  </div>
);


  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Connexion';
      case 'register': return 'Créer un compte';
      case 'forgot': return 'Mot de passe oublié';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Bon retour ! Connectez-vous pour continuer votre apprentissage.';
      case 'register': return 'Rejoignez plus de 50 000 étudiants qui transforment leur avenir.';
      case 'forgot': return 'Pas de souci, nous allons vous aider à récupérer votre compte.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinguaLearn
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {getTitle()}
            </h1>
            <p className="text-gray-600">
              {getSubtitle()}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            {mode === 'login' && renderLoginForm()}
            {mode === 'register' && renderRegisterForm()}
            {mode === 'forgot' && renderForgotForm()}
          </form>

          {/* Social Login (only for login and register) */}
          {mode !== 'forgot' && (
            <>
              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">ou</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
<button
  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
  onClick={handleGoogleLogin}
>                  <div className="w-5 h-5 mr-3">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Continuer avec Google</span>
                </button>
              </div>
            </>
          )}

          {/* Toggle between login/register */}
          {mode !== 'forgot' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
                >
                  {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Success indicators for registration */}
        {mode === 'register' && (
          <div className="mt-6 bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">Votre compte inclut :</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Accès gratuit pendant 7 jours</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Plus de 10 000 leçons interactives</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Suivi personnalisé de progression</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Login;