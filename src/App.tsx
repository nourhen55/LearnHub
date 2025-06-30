import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

import { 
  Play, 
  Code, 
  Users, 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  MessageCircle, 
  Monitor,
  Palette,
  Target,
  Zap,
  Github,
  Coffee
} from 'lucide-react';

function App() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeCraft Academy
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Fonctionnalités
              </a>
              <a href="#languages" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Technologies
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Témoignages
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClick}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Maîtrisez le{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Code
                </span>
                {' '}et le{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Design
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Apprenez les technologies web les plus demandées avec notre méthode innovante. 
                Des cours interactifs, des projets pratiques et un suivi personnalisé pour devenir développeur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Commencer gratuitement</span>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Voir la démo</span>
                </button>
              </div>
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">25K+</div>
                  <div className="text-gray-600">Développeurs formés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">95%</div>
                  <div className="text-gray-600">Taux d'emploi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">500+</div>
                  <div className="text-gray-600">Projets créés</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Projet du jour</h3>
                      <p className="text-gray-400 text-sm">Application React Todo</p>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="text-green-400 text-sm font-mono">
                      <div className="text-blue-400">const</div>
                      <div className="ml-2 text-yellow-400">TodoApp = () =&gt; {'{'}</div>
                      <div className="ml-4 text-purple-400">return (</div>
                      <div className="ml-6 text-red-400">&lt;div className="app"&gt;</div>
                      <div className="ml-8 text-green-400">// Votre code ici</div>
                      <div className="ml-6 text-red-400">&lt;/div&gt;</div>
                      <div className="ml-4 text-purple-400">);</div>
                      <div className="text-yellow-400">{'}'}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">Components React</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">State Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full"></div>
                      <span className="text-gray-500">Styling avec CSS</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progression</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir CodeCraft Academy ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme combine technologie avancée et pédagogie éprouvée pour vous offrir 
              la meilleure expérience d'apprentissage du développement web et du design.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Éditeur Intégré</h3>
              <p className="text-gray-600 leading-relaxed">
                Codez directement dans le navigateur avec notre éditeur avancé. 
                Syntaxe highlighting, autocomplétion et prévisualisation en temps réel.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Projets Pratiques</h3>
              <p className="text-gray-600 leading-relaxed">
                Apprenez en construisant de vrais projets. De la landing page 
                à l'application complète, développez votre portfolio professionnel.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Parcours Personnalisés</h3>
              <p className="text-gray-600 leading-relaxed">
                Suivez un parcours adapté à vos objectifs : développeur front-end, 
                full-stack ou designer UX/UI. Progressez à votre rythme.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Communauté Active</h3>
              <p className="text-gray-600 leading-relaxed">
                Rejoignez plus de 25 000 développeurs. Participez aux défis de code, 
                partagez vos projets et apprenez des autres membres.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Certifications</h3>
              <p className="text-gray-600 leading-relaxed">
                Obtenez des certifications reconnues par l'industrie et 
                valorisez vos compétences techniques auprès des employeurs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Design UX/UI</h3>
              <p className="text-gray-600 leading-relaxed">
                Apprenez les principes du design, la création de prototypes 
                et l'utilisation d'outils comme Figma pour créer de belles interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="languages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technologies modernes, compétences d'avenir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maîtrisez les frameworks et outils les plus demandés par les entreprises. 
              De la base HTML/CSS aux frameworks avancés comme React et Vue.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-white">HTML</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Frontend Development</h3>
                  <p className="text-gray-600">HTML, CSS, JavaScript & Frameworks</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">HTML5 sémantique et accessibilité</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">CSS3, Flexbox, Grid et animations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">JavaScript ES6+ et API modernes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">React, Vue.js et Angular</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Explorer le Frontend</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">UX/UI Design</h3>
                  <p className="text-gray-600">Design thinking et prototypage</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Principes de design et ergonomie</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Figma, Adobe XD et prototypage</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Research utilisateur et personas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Design systems et composants</span>
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Apprendre le Design</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Technology Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">React</h4>
              <p className="text-gray-600 text-sm">Bibliothèque JavaScript pour créer des interfaces utilisateur interactives</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Vue.js</h4>
              <p className="text-gray-600 text-sm">Framework progressif pour construire des applications web modernes</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Angular</h4>
              <p className="text-gray-600 text-sm">Plateforme pour créer des applications web et mobiles robustes</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">TypeScript</h4>
              <p className="text-gray-600 text-sm">JavaScript typé pour développer des applications plus fiables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos développeurs
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de milliers d'étudiants qui ont transformé leur carrière
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "CodeCraft m'a permis de passer de débutant à développeur React en 6 mois. 
                Les projets pratiques et la communauté sont exceptionnels !"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">AL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Alexandre Lefebvre</div>
                  <div className="text-gray-600 text-sm">Développeur React chez Spotify</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "La formation UX/UI design est fantastique. J'ai appris Figma et les 
                principes de design, maintenant je travaille dans une startup !"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">CM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Clara Martin</div>
                  <div className="text-gray-600 text-sm">UX Designer chez Figma</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "L'éditeur intégré et les projets en temps réel sont géniaux. 
                J'ai pu construire mon portfolio pendant ma formation !"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">TD</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Thomas Dubois</div>
                  <div className="text-gray-600 text-sm">Full-Stack Developer chez Airbnb</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à devenir développeur ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez plus de 25 000 étudiants qui ont transformé leur carrière 
            en maîtrisant les technologies web modernes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Commencer gratuitement</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
              <Github className="w-5 h-5" />
              <span>Voir les projets</span>
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            Essai gratuit de 14 jours • Projets illimités • Support communauté
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CodeCraft Academy
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                La plateforme d'apprentissage qui révolutionne la formation au développement web. 
                Apprenez en codant, créez votre portfolio et lancez votre carrière tech.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Github className="w-5 h-5 text-blue-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Coffee className="w-5 h-5 text-blue-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Formations</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Frontend Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">UX/UI Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">JavaScript Avancé</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">React & Vue.js</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Communauté</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog Tech</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Projets Open Source</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 CodeCraft Academy. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Code de conduite
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;