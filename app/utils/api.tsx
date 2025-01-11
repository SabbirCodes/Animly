import { Animal } from '../types';

const API_KEY = process.env.API_KEY as string;

if (!API_KEY) {
  throw new Error('API_KEY is not defined in environment variables');
}

export async function fetchAnimal(name: string): Promise<Animal> {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(name)}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      console.error(`API call failed with status ${response.status}: ${response.statusText}`);
      throw new Error('Failed to fetch animal data');
    }

    const data = await response.json();

    if (!data || !data[0]) {
      throw new Error(`No data found for animal: ${name}`);
    }

    return data[0] as Animal;
  } catch (error) {
    console.error('Error in fetchAnimal:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
}
