import React, { useState } from 'react';
import { Heart, Stethoscope } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import { Disease } from './types';
import { predictDiseases } from './services/api';

const AppContent: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { translations } = useLanguage();

  const handleSearch = async (symptoms: string) => {
    setIsLoading(true);
    setError(null);
    setDiseases([]);
    console.log("🔍 Searching for symptoms:", symptoms);

    try {
      const response = await predictDiseases(symptoms);
      console.log("✅ Received response:", response);
      setDiseases(response.results);
    } catch (err) {
      console.error("❌ Search error:", err);
      setError(translations.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="relative px-6 py-8">
        <div className="absolute top-6 right-6">
          <LanguageSwitcher />
        </div>

        <div className="max-w-4xl mx-auto text-center pt-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            {translations.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {translations.subtitle}
          </p>
        </div>
      </header>

      <main className="px-6 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <section className="flex flex-col items-center">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            {isLoading && <p className="mt-4 text-blue-600 font-medium">Loading...</p>}
          </section>

          <section className="flex flex-col items-center">
            <ResultsDisplay diseases={diseases} error={error} />
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Stethoscope className="w-4 h-4" />
            <span>Medical information provided for educational purposes only</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
