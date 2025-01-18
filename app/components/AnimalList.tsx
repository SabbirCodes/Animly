"use client"
import { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import { animals } from '../data/animals';


interface Animals {
  id: number;
  name: string;
}
export default function AnimalList() {
  const [visibleCount, setVisibleCount] = useState(30);
  const [randomAnimals, setRandomAnimals] = useState<Animals[]>([])


  useEffect(() => {
    const shuffled = [...animals].sort(() => Math.random() - 0.5);
    setRandomAnimals(shuffled);
  }, [" "]);

  const loadMore = () => {
    setVisibleCount(visibleCount + 30);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {randomAnimals.slice(0, visibleCount).map((animal, idx) => (
          <AnimalCard key={animal.id} name={animal.name} id={idx} />
        ))}
      </div>

      {visibleCount < animals.length && (
        <div className='flex justify-center'>
          <button
          onClick={loadMore}
          className="mt-6 px-4 p-2 dark:bg-blue-700 dark:hover:bg-blue-900 bg-gray-800 hover:bg-gray-600 text-white rounded"
        >
          Load More
        </button>
        </div>
      )}
    </div>
  );
}
