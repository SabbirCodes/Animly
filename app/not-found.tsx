import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] md:h-[60vh] text-center">
      <PawPrint className="w-40 h-40 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold mb-2">Animal not found</h1>
      <p className="text-gray-600 mb-4 px-5">
        Sorry, we couldn’t find the animal you were looking for. 🐾
      </p>
      <Link href={"/"}>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  );
}
