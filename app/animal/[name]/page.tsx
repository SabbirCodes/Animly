import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/app/components/ui/badge";
import { fetchAnimal } from "../../utils/api";

// Metadata for SEO
export async function generateMetadata({ params }: { params: { name: string } }) {
  const { name } = params;

  try {
    const animal = await fetchAnimal(name);
    return {
      title: `${animal.name} | Animal Information`,
      description: animal.characteristics.slogan || `Learn about the ${animal.name}`,
    };
  } catch {
    return {
      title: "Animal Not Found",
      description: "The requested animal information could not be found.",
    };
  }
}

// Page Component
export default async function AnimalPage({ params }: { params: { name: string } }) {
  const { name } = params;

  let animal;
  try {
    animal = await fetchAnimal(name);
  } catch (error) {
    console.error("Failed to fetch animal:", error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to all animals
      </Link>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{animal.name}</h1>
          <p className="mb-4 font-sans">{animal.characteristics.slogan}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{animal.taxonomy.class}</Badge>
            <Badge variant="outline">{animal.characteristics.diet}</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Habitat
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{animal.characteristics.habitat}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Diet</h2>
              <p className="text-gray-600 dark:text-gray-400">{animal.characteristics.diet}</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Taxonomy
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {Object.entries(animal.taxonomy).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold">
                    {key
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </span>{" "}
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Locations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {animal.locations.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
