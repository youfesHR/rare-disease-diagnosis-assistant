import React from 'react';
import { ExternalLink, Activity, AlertCircle } from 'lucide-react';
import { Disease } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultsDisplayProps {
  diseases: Disease[];
  error: string | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ diseases, error }) => {
  const { translations } = useLanguage();

  if (error) {
    return (
      <div className="w-full max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center space-x-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <p className="text-red-700 font-medium">{translations.error}</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(diseases) || diseases.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <Activity className="w-7 h-7 text-blue-600" />
          <span>{translations.resultsTitle}</span>
        </h2>
      </div>

      <div className="space-y-4">
        {diseases.map((disease, index) => {
          const score = typeof disease.similarity === 'number' && !isNaN(disease.similarity)
            ? disease.similarity * 100
            : 0;

          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {disease.name}
                  </h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">
                        {translations.similarityScore}:
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                          {score.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={disease.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="whitespace-nowrap">{translations.moreInfo}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsDisplay;
