export interface Disease {
  name: string;
  url: string;
  similarity: number;
}


export interface PredictionResponse {
  results: Disease[];
}

export interface Language {
  code: 'en' | 'fr';
  name: string;
  flag: string;
}

export interface Translations {
  title: string;
  subtitle: string;
  inputPlaceholder: string;
  searchButton: string;
  resultsTitle: string;
  similarityScore: string;
  moreInfo: string;
  noResults: string;
  error: string;
  searching: string;
}