import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchFormProps {
  onSearch: (symptoms: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [symptoms, setSymptoms] = useState('');
  const { translations } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim() && !isLoading) {
      onSearch(symptoms.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <div className="relative">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={translations.inputPlaceholder}
          className="w-full px-6 py-4 pr-14 text-gray-800 bg-white border-2 border-gray-200 rounded-2xl resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 placeholder-gray-400 text-lg min-h-[120px] shadow-lg"
          rows={4}
          disabled={isLoading}
        />
        <div className="absolute bottom-4 right-4">
          <button
            type="submit"
            disabled={!symptoms.trim() || isLoading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span>{isLoading ? translations.searching : translations.searchButton}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;