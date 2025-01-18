"use client"
import React, { useState, useEffect } from "react";
import { RefreshCcw } from "lucide-react";

interface UnsplashImageProps {
  query: string;
  className?: string;
  height?: string;
}

interface UnsplashImageData {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
}

const AnimalImage: React.FC<UnsplashImageProps> = ({
  query,
  className = "w-full h-96",
  height = "h-96",
}) => {
  const [image, setImage] = useState<UnsplashImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your Unsplash access key
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  const fetchUnsplashImage = async () => {
    if (!UNSPLASH_ACCESS_KEY) {
      setError("Unsplash API key is missing");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?query=${encodeURIComponent(
          query
        )}&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const data = await response.json();
      const firstImage = data.results[0]; // Extract the first image

      if (firstImage) {
        setImage(firstImage);
      } else {
        setError("No images found for the given query.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnsplashImage();
  }, [query]);

  return (
    <div className={`relative bg-gray-100 dark:bg-gray-700 md:dark:bg-gray-800 ${className} ${height} ${error && "hidden"}`}>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full md:w-96 md:ml-5 md:mt-5 md:rounded-lg">
          <RefreshCcw className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          <p>{error}</p>
        </div>
      ) : image ? (
        <img
          key={image.id}
          src={image.urls.regular}
          alt={image.alt_description || query}
          className="w-full h-full object-cover md:w-96 md:ml-5 md:mt-5 md:rounded-lg"
        />
      ) : null}
    </div>
  );
};

export default AnimalImage;
