import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Phase names
    'phase.dashboard': 'Dashboard',
    'phase.1': 'Phase 1: Investigation',
    'phase.2': 'Phase 2: Property Damage',
    'phase.3': 'Phase 3: Treatment',
    'phase.4': 'Phase 4: Demand Preparation',
    'phase.5': 'Phase 5: Negotiation and Insurance',
    'phase.6': 'Phase 6: Case Transfer to Litigation',
    'phase.7': 'Phase 7: Lawsuit Filed',
    'phase.8': 'Phase 8: Discovery',
    'phase.9': 'Phase 9: Depositions',
    'phase.10': 'Phase 10: Mediation',
    'phase.11': 'Phase 11: Trial Preparation',
    'phase.12': 'Phase 12: Appeal',
    'phase.13': 'Phase 13: Subrogations and Liens',
    'phase.14': 'Phase 14: Payoff',
    'phase.15': 'Phase 15: Closing the File',
    
    // Phase short names (for progress bar)
    'phase.short.1': 'Investigation',
    'phase.short.2': 'Property Damage',
    'phase.short.3': 'Treatment',
    'phase.short.4': 'Demand Prep',
    'phase.short.5': 'Negotiation',
    'phase.short.6': 'Litigation',
    'phase.short.7': 'Lawsuit Filed',
    'phase.short.8': 'Discovery',
    'phase.short.9': 'Depositions',
    'phase.short.10': 'Mediation',
    'phase.short.11': 'Trial Prep',
    'phase.short.12': 'Appeal',
    'phase.short.13': 'Subrogations',
    'phase.short.14': 'Payoff',
    'phase.short.15': 'Closing',
    
    // UI elements
    'progress.of': 'of',
    'video.summary': 'Summary',
  },
  es: {
    // Phase names
    'phase.dashboard': 'Panel de Control',
    'phase.1': 'Fase 1: Investigación',
    'phase.2': 'Fase 2: Daños a la Propiedad',
    'phase.3': 'Fase 3: Tratamiento',
    'phase.4': 'Fase 4: Preparación de Demanda',
    'phase.5': 'Fase 5: Negociación y Seguro',
    'phase.6': 'Fase 6: Transferencia del Caso a Litigio',
    'phase.7': 'Fase 7: Demanda Presentada',
    'phase.8': 'Fase 8: Descubrimiento',
    'phase.9': 'Fase 9: Deposiciones',
    'phase.10': 'Fase 10: Mediación',
    'phase.11': 'Fase 11: Preparación del Juicio',
    'phase.12': 'Fase 12: Apelación',
    'phase.13': 'Fase 13: Subrogaciones y Gravámenes',
    'phase.14': 'Fase 14: Liquidación',
    'phase.15': 'Fase 15: Cierre del Expediente',
    
    // Phase short names (for progress bar)
    'phase.short.1': 'Investigación',
    'phase.short.2': 'Daños Propiedad',
    'phase.short.3': 'Tratamiento',
    'phase.short.4': 'Prep Demanda',
    'phase.short.5': 'Negociación',
    'phase.short.6': 'Litigio',
    'phase.short.7': 'Demanda',
    'phase.short.8': 'Descubrimiento',
    'phase.short.9': 'Deposiciones',
    'phase.short.10': 'Mediación',
    'phase.short.11': 'Prep Juicio',
    'phase.short.12': 'Apelación',
    'phase.short.13': 'Subrogaciones',
    'phase.short.14': 'Liquidación',
    'phase.short.15': 'Cierre',
    
    // UI elements
    'progress.of': 'de',
    'video.summary': 'Resumen',
  },
} as const;

type TranslationKey = keyof typeof translations.en;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    const translationKey = key as TranslationKey;
    return translations[language][translationKey] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}