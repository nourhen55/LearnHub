import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500'
  ];

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');
    
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would call your Firebase function:
      // await confirmPasswordReset(auth, oobCode, newPassword);
      
      setSuccess('Mot de passe réinitialisé avec succès !');
      
      // Simulate navigation after success
      setTimeout(() => {
        console.log('Navigate to login');
        // navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      setError('Une erreur est survenue. Le lien peut être invalide ou expiré.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-white/50"
          onClick={() => console.log('Navigate back')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la connexion
        </Button>

        <Card className="shadow-xl bg-white/95 backdrop-blur border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Nouveau mot de passe
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Choisissez un mot de passe sécurisé pour protéger votre compte
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-slate-700 font-medium">
                Nouveau mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10 h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Entrez votre nouveau mot de passe"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                </Button>
              </div>
              
              {/* Password strength indicator */}
              {newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Force du mot de passe:</span>
                    <span className={`font-medium ${passwordStrength >= 3 ? 'text-green-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          i < passwordStrength ? strengthColors[passwordStrength] : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10 h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Confirmez votre mot de passe"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                </Button>
              </div>
              
              {/* Password match indicator */}
              {confirmPassword && (
                <div className="flex items-center space-x-2 text-sm">
                  {newPassword === confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Les mots de passe correspondent</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600">Les mots de passe ne correspondent pas</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <Button
              onClick={handleResetPassword}
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Réinitialisation...</span>
                </div>
              ) : (
                'Réinitialiser le mot de passe'
              )}
            </Button>

            {/* Security tips */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-slate-800 text-sm">Conseils de sécurité:</h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Utilisez au moins 8 caractères</li>
                <li>• Combinez majuscules, minuscules et chiffres</li>
                <li>• Ajoutez des caractères spéciaux</li>
                <li>• Évitez les informations personnelles</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;