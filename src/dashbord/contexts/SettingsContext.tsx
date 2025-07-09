import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserSettings } from '../types';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  theme: 'light',
  fontSize: 'medium',
  language: 'fr',
  notifications: true,
  autoPlay: false,
  sidebarCollapsed: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchSettings = async () => {
      if (!userId) return;

      const docRef = doc(db, "parameters", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings({
          theme: data.theme === 's' ? 'dark' : 'light',
          fontSize: data.taille || 'medium',
          language: data.language || 'fr',
          notifications: data.notification === 'oui',
          autoPlay: data.lectureauto === 'oui',
          sidebarCollapsed: false, // tu peux ajuster selon ta structure
        });
      } else {
        // document inexistant → enregistrer les valeurs par défaut
        await setDoc(docRef, {
          uid: userId,
          theme: 'c',
          taille: 'medium',
          language: 'fr',
          notification: 'oui',
          lectureauto: 'non',
        });
      }
    };

    fetchSettings();
  }, [userId]);

  // 🟢 Update settings local + Firestore
  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    if (!userId) return;

    await setDoc(doc(db, "parameters", userId), {
      uid: userId,
      theme: updated.theme === 'dark' ? 's' : 'c',
      taille: updated.fontSize,
      language: updated.language,
      notification: updated.notifications ? 'oui' : 'non',
      lectureauto: updated.autoPlay ? 'oui' : 'non',
    });
  };

  // Appliquer les classes CSS
  useEffect(() => {
    const root = document.documentElement;

    // Theme
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Font size
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (settings.fontSize) {
      case 'small':
        root.classList.add('text-sm');
        break;
      case 'medium':
        root.classList.add('text-base');
        break;
      case 'large':
        root.classList.add('text-lg');
        break;
    }
  }, [settings.theme, settings.fontSize]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
