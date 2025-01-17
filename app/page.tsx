import AnimalList from "./components/AnimalList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Discover the Wild
      </h1>
      <SearchBar />
      <AnimalList />
    </main>
  );
}
