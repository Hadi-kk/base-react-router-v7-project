import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Client } from "~/lib/client";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery({
    ...Client.search({ name: searchTerm, page }),
    enabled: searchTerm.length > 0,
  });

  return {
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    characters: data?.characters?.results ?? [],
    info: data?.characters?.info,
    isLoading,
    error,
    isError,
  };
}
