import React, { useState } from 'react';
import { UserAccount } from '../types';
import { Shield, Key, LogIn, LogOut, UserCheck, X, Sparkles, CheckCircle2, Lock, User, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  user?: UserAccount | null;
  currentUser?: UserAccount | null;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, role: 'Owner' | 'Administrator' | 'Moderator' | 'VIP Member') => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  user,
  currentUser,
  isOpen,
  onClose,
  onLogin,
  onLogout,
}) => {
  const activeUser = user || currentUser;
  const [usernameInput, setUsernameInput] = useState<string>('noxi_nick');
  const [passcode, setPasscode] = useState<string>('noxelia2026');
  const [roleInput, setRoleInput] = useState<'Owner' | 'Administrator' | 'Moderator' | 'VIP Member'>('Owner');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!usernameInput.trim()) {
      setErrorMsg('Veuillez saisir un nom d\'utilisateur.');
      return;
    }

    if (!passcode.trim()) {
      setErrorMsg('Veuillez saisir un code d\'accès ou mot de passe.');
      return;
    }

    onLogin(usernameInput.trim(), roleInput);
    setSuccessMsg(`Bienvenue, ${usernameInput} ! Connexion réussie avec le rôle ${roleInput}. ❀`);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const handleSelectPreset = (uname: string, role: 'Owner' | 'Administrator' | 'Moderator' | 'VIP Member', code: string) => {
    setUsernameInput(uname);
    setRoleInput(role);
    setPasscode(code);
    setErrorMsg(null);
  };

  const handleLogoutClick = () => {
    onLogout();
    setSuccessMsg('Déconnexion effectuée avec succès. Vous êtes en mode invité. ❀');
    setTimeout(() => {
      setSuccessMsg(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1A1A18] border border-[#D9CEBF] dark:border-white/10 rounded-[28px] w-full max-w-md p-6 sm:p-8 shadow-2xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F7F3F0] dark:bg-[#282824] text-[#7C7C6D] hover:text-[#33332D] dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#B48A8A]/15 text-[#B48A8A] flex items-center justify-center mx-auto border border-[#B48A8A]/30">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif-aesthetic font-bold text-[#33332D] dark:text-[#EAE3DB]">
            Espace Connexion & Sécurité Noxélia
          </h3>
          <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A]">
            Connectez-vous pour accéder à la modération et au contrôle du Bot Discord.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* User Session Info if Logged In (No Photo) */}
        {activeUser?.isLoggedIn ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] dark:bg-[#B48A8A] text-white flex items-center justify-center font-bold text-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#33332D] dark:text-[#EAE3DB]">{activeUser.displayName || activeUser.username}</h4>
                  <span className="text-[10px] font-bold bg-[#B48A8A] text-white px-2 py-0.5 rounded-full">
                    {activeUser.role}
                  </span>
                </div>
                <p className="text-xs text-[#7C7C6D] dark:text-[#A8A89A]">@{activeUser.username}</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">
                  • Session active (Dernière connexion : {activeUser.lastLogin || 'Aujourd\'hui'})
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F3F0] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-xs space-y-1.5 text-[#7C7C6D] dark:text-[#A8A89A]">
              <div className="flex justify-between">
                <span>Permission commande /say :</span>
                <strong className="text-emerald-600 dark:text-emerald-400">Autorisé ❀</strong>
              </div>
              <div className="flex justify-between">
                <span>Gestion salons & webhooks :</span>
                <strong className="text-emerald-600 dark:text-emerald-400">Accès Total ❀</strong>
              </div>
            </div>

            <button
              onClick={handleLogoutClick}
              className="w-full py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Se Déconnecter
            </button>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmitLogin} className="space-y-4">
            {/* Quick Login Presets */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#7C7C6D] dark:text-[#A8A89A] block">
                Comptes rapides préconfigurés :
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleSelectPreset('noxi_nick', 'Owner', 'noxelia2026')}
                  className="p-2 rounded-xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-left hover:border-[#5A5A40] transition-all"
                >
                  <p className="font-bold text-[#33332D] dark:text-[#EAE3DB]">Noxélia ❀</p>
                  <p className="text-[10px] text-[#8C5E5E] dark:text-[#E2BABA]">Fondatrice (Owner)</p>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPreset('modo_care', 'Moderator', 'care2026')}
                  className="p-2 rounded-xl bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-left hover:border-[#5A5A40] transition-all"
                >
                  <p className="font-bold text-[#33332D] dark:text-[#EAE3DB]">Modo Care ❀</p>
                  <p className="text-[10px] text-[#8C5E5E] dark:text-[#E2BABA]">Modérateur</p>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                Pseudonyme Discord / TikTok
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#A89E8E] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="noxi_nick"
                  className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs pl-10 pr-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                Code d'accès Sécurisé / Mot de passe
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#A89E8E] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs pl-10 pr-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#7C7C6D] dark:text-[#A8A89A] block mb-1">
                Rôle attribué
              </label>
              <select
                value={roleInput}
                onChange={(e: any) => setRoleInput(e.target.value)}
                className="w-full bg-[#FDFBF7] dark:bg-[#282824] border border-[#D9CEBF] dark:border-white/10 text-[#33332D] dark:text-[#EAE3DB] text-xs px-3.5 py-2.5 rounded-2xl focus:outline-none focus:border-[#5A5A40]"
              >
                <option value="Owner">Owner / Propriétaire (Noxélia)</option>
                <option value="Administrator">Administrateur</option>
                <option value="Moderator">Modérateur</option>
                <option value="VIP Member">Membre VIP</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#5A5A40] dark:bg-[#B48A8A] text-white font-bold text-xs hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Se Connecter au Panel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
