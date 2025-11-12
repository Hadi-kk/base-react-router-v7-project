import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { CharacterCard } from "~/components/CharacterCard";
import { SearchForm } from "~/components/SearchForm";
import { Pagination } from "~/components/Pagination";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { useSearch } from "~/hooks/useSearch";

function SearchPage() {
  const {
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    characters,
    info,
    isLoading,
    isError,
    error,
  } = useSearch();

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    setPage(1);
  };

  const handlePrevPage = () => {
    if (info?.prev) {
      setPage(info.prev);
    }
  };

  const handleNextPage = () => {
    if (info?.next) {
      setPage(info.next);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Rick and Morty Character Search
        </h1>

        <SearchForm
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
        />

        {isLoading && <LoadingSpinner />}

        {isError && (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800 dark:text-red-200 font-semibold">
                Error loading characters
              </p>
              <p className="text-red-600 dark:text-red-300 text-sm mt-2">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong"}
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && searchTerm && characters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No characters found for "{searchTerm}"
            </p>
          </div>
        )}

        {!isLoading && !isError && characters.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {characters.map((character) => (
                <CharacterCard
                  key={character?.id}
                  id={character?.id}
                  name={character?.name}
                  image={character?.image}
                  status={character?.status}
                  species={character?.species}
                />
              ))}
            </div>

            {info && (
              <Pagination
                currentPage={page}
                totalPages={info.pages || 1}
                hasPrev={!!info.prev}
                hasNext={!!info.next}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
              />
            )}
          </>
        )}

        {!searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Enter a character name to start searching
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Search() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  );
}
