/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchModels } from "../action";
import { Model } from "@/types/model";
import { ModelListSkeleton } from "./model-list-skeleton";
import { ModelsTab } from "./model-tab";
import { useModelSearch } from "@/hooks/models/use-model-search";

export default function AvailableModelsList() {
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    sortedProviders,
    totalResults,
    hasResults,
    isSearching,
  } = useModelSearch(models);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      setError(null);

      const { models: fetchedModels, error: fetchError } = await fetchModels();

      if (fetchError) {
        setError(fetchError);
        toast.error(fetchError);
      } else {
        console.log(
          "Here is the list of all available models for Vercel:",
          fetchedModels,
        );
        setModels(fetchedModels);
      }

      setIsLoading(false);
    };

    loadModels();
  }, []);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <ModelListSkeleton />
      </div>
    );

  if (error)
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-lg font-semibold">Error: {error}</span>
      </div>
    );

  return (
    <div className="flex-1 overflow-hidden">
      <ModelsTab sortedProviders={sortedProviders} />
    </div>
  );
}
