"use client";
import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { useState } from "react";

export default function AnimalCard({ name, id }: { name: string; id: number }) {
  const [runnig, setRunnig] = useState(false);
  return (
    <Link href={`/animal/${encodeURIComponent(name)}`}>
      <div
        key={id}
        className="border flex rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={() => setRunnig(true)}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            {name}
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="dark:bg-gray-900">
              View Details
            </Badge>
          </div>
        </div>
        {runnig && (
          <div className="w-24 h-24 flex items-center justify-center">
            <img
              src="white.gif"
              alt="runnig cheeta"
              className="mix-blend-lighten w-full h-full object-cover hidden dark:block"
            />
            <img
              src="black.gif"
              alt="runnig cheeta"
              className="mix-blend-multiply w-full h-full object-cover block dark:hidden"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
