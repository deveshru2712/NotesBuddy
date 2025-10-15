"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchModels } from "../action";
import { Model } from "@/types/model";
import { ModelListSkeleton } from "./model-list-skeleton";
import { ModelsTab } from "./model-tab";
import { useModelSearch } from "@/hooks/models/use-model-search";
import { EmptyState } from "./empty-state";
import { LoadingModelHeader } from "./loading-modal-header";
import { AvailableModelHeader } from "./available-model-header";

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
        setModels(fetchedModels);
      }

      setIsLoading(false);
    };

    loadModels();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <ModelListSkeleton />;
    }

    if (models.length === 0 && error) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <p>Failed to load models. Please try again later.</p>
          </div>
        </div>
      );
    }

    if (hasResults) {
      return <ModelsTab sortedProviders={sortedProviders} />;
    }

    if (isSearching) {
      return <EmptyState onClearSearch={handleClearSearch} />;
    }

    return null;
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {isLoading || (models.length === 0 && error) ? (
        <LoadingModelHeader />
      ) : (
        <AvailableModelHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClearSearch={handleClearSearch}
          totalResults={totalResults}
          hasResults={hasResults}
          isSearching={isSearching}
        />
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
