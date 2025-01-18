import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAnimal } from "../../utils/api";
import AnimalData from "@/app/components/AnimalData";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { name } = await params;

  return {
    title: `${name} - Animly | Learn About ${name}`,
    description: `Discover all about ${name}, including its characteristics, habitat, and behaviors. Dive into the world of wildlife with Animly.`,
    keywords: `${name}, ${name} characteristics, ${name} habitat, animal encyclopedia, wildlife research`,
    openGraph: {
      title: `${name} - Animly`,
      description: `Explore detailed information about ${name}. Learn about its habitat, behaviors, and unique traits.`,
      images: [
        {
          url: `https://animly.vercel.app/animlydemo.png`,
          width: 1200,
          height: 630,
          alt: `Detailed information about ${name}`,
        },
      ],
    },
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


  return Array.isArray(animal) && (
    <div key={name}>
      {animal.map((data) => (
        <AnimalData key={data.id} animal={data} />
      ))}
    </div>
  )
}
