import { PredictionResponse } from '../types';

const API_BASE_URL = "https://e5d8-34-69-62-221.ngrok-free.app"; // ← update if changed

export const predictDiseases = async (symptoms: string): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symptoms })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // data already has { results: Disease[] }
    return data;  // <-- Just return data directly
  } catch (error) {
    console.error("Error predicting diseases:", error);
    throw error;
  }
};

 