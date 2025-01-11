import { Animal } from '../types';

const API_KEY = process.env.API_KEY as string;

export async function fetchAnimal(name: string): Promise<Animal> {
  const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
    headers: {
      'X-Api-Key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch animal data');
  }

  const data = await response.json();
  return data[0] as Animal;
}



