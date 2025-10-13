import { Search } from "lucide-react";

type EmptyStateProps = {
  onClearSearch: () => void;
};

export const EmptyState = ({ onClearSearch }: EmptyStateProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <Search className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">No models found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search terms or{" "}
        <button
          type="button"
          onClick={onClearSearch}
          className="text-primary hover:underline"
        >
          clear the search
        </button>{" "}
        to see all models.
      </p>
    </div>
  );
};
