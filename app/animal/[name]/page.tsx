import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/app/components/ui/badge';
import { fetchAnimal } from '../../utils/api';
import { Animal } from '@/app/types';

export default async function AnimalPage({ params }: { params: { name: string } }) {
  let animal: Animal | null = null;

  try {
    animal = await fetchAnimal(params.name);
  } catch (error) {
    console.error('Failed to fetch animal:', error);
    notFound();
  }

  if (!animal) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <p className="mb-2 font-bold">
          Sorry, we couldn&apos;t find the animal you&apos;re looking for.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to the homepage
        </Link>
      </div>
    );
  }

  const characteristics = Object.entries(animal.characteristics).filter(
    ([key]) => key !== 'slogan'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to all animals
      </Link>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{animal.name}</h1>
          <p className="mb-4 font-sans">{animal.characteristics.slogan || 'No slogan available.'}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{animal.taxonomy.class}</Badge>
            <Badge variant="outline">{animal.characteristics.diet || 'Unknown diet'}</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Habitat</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {animal.characteristics.habitat || 'No habitat information available.'}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Diet</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {animal.characteristics.diet || 'Unknown diet'}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Taxonomy</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {Object.entries(animal.taxonomy).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold">
                    {key.replace(/_/g, ' ').toLowerCase().replace(/^./, str => str.toUpperCase())}:
                  </span>{' '}
                  {value || 'N/A'}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Locations</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {animal.locations?.join(', ') || 'No location data available.'}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Characteristics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characteristics.map(([key, value]) => (
                <div key={key} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    {key
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{value || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
