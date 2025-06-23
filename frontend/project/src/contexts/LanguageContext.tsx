import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translations } from '../types';

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

const translations: Record<string, Translations> = {
  en: {
    title: 'Rare Disease Diagnosis Assistant',
    subtitle: 'Describe your symptoms to get potential rare disease matches',
    inputPlaceholder: 'Describe your symptoms (e.g., "I have muscle weakness and blurry vision")',
    searchButton: 'Search Diseases',
    resultsTitle: 'Top Matching Rare Diseases',
    similarityScore: 'Similarity Score',
    moreInfo: 'More Information',
    noResults: 'No matching diseases found. Please try describing your symptoms differently.',
    error: 'An error occurred while searching. Please try again.',
    searching: 'Searching...'
  },
  fr: {
    title: 'Assistant de Diagnostic de Maladies Rares',
    subtitle: 'Décrivez vos symptômes pour obtenir des correspondances de maladies rares potentielles',
    inputPlaceholder: 'Décrivez vos symptômes (ex: "J\'ai une faiblesse musculaire et une vision floue")',
    searchButton: 'Rechercher des Maladies',
    resultsTitle: 'Principales Maladies Rares Correspondantes',
    similarityScore: 'Score de Similarité',
    moreInfo: 'Plus d\'Informations',
    noResults: 'Aucune maladie correspondante trouvée. Veuillez essayer de décrire vos symptômes différemment.',
    error: 'Une erreur s\'est produite lors de la recherche. Veuillez réessayer.',
    searching: 'Recherche en cours...'
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  translations: Translations;
  switchLanguage: (languageCode: 'en' | 'fr') => void;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const switchLanguage = (languageCode: 'en' | 'fr') => {
    const language = languages.find(lang => lang.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
    }
  };

  const value = {
    currentLanguage,
    translations: translations[currentLanguage.code],
    switchLanguage,
    languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};