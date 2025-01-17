import Link from "next/link";
import { Badge } from "./ui/badge";
import { Animal } from "../types";
import { ArrowLeft } from "lucide-react";

interface AnimalType {
  animal: Animal;
}

const AnimalData: React.FC<AnimalType> = ({ animal }) => {
  // Helper function to split the color string into individual colors
  const getColors = (colorString: string): string[] => {
    return colorString.match(/[A-Z][a-z]*/g) || [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        <div className="flex gap-1">
          <ArrowLeft /> Back to all animals
        </div>
      </Link>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {animal.name}
          </h1>
          <p className="mb-4 font-sans">{animal.characteristics.slogan}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="font-light" variant="secondary">
              {animal.taxonomy.class}
            </Badge>
            <Badge className="font-light" variant="outline">
              {animal.characteristics.diet}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Habitat
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {animal.characteristics.habitat}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                Diet
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {animal.characteristics.diet}
              </p>
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
              Colors
            </h2>
            <div className="flex flex-wrap gap-2">
              {getColors(animal.characteristics.color).map((color, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Characteristics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(animal.characteristics).map(([key, value]) =>
                key !== "slogan" && key !== "color" ? (
                  <div
                    key={key}
                    className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {key
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{value}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalData;
