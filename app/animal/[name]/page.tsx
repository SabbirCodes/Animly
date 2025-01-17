import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAnimal } from "../../utils/api";
import AnimalData from "@/app/components/AnimalData";

import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${name} - Animly`,
    description: `Learn more about ${name}, its characteristics, habitat, and more.`
  }
}

export default async function AnimalPage({ params }: any) {
  const { name } = await params;

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


  return Array.isArray(animal) ? (
    <div>
      {animal.map((data) => (
        <AnimalData key={data.id} animal={data} />
      ))}
    </div>
  ) : (
    <div>
      <AnimalData animal={animal} />
    </div>
  );
}
