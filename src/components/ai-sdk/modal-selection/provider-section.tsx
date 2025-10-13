import type { Model } from "@/types/model";
import { ModelCard } from "./model-card";

type ProviderSectionProps = {
  providerName: string;
  models: Model[];
};

export const ProviderSection = ({
  providerName,
  models,
}: ProviderSectionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold">
        {providerName.charAt(0).toUpperCase() + providerName.slice(1)} (
        {models.length})
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models.map((model) => (
          <ModelCard key={`${model.id}-${model.gateway}`} model={model} />
        ))}
      </div>
      <hr />
    </div>
  );
};
