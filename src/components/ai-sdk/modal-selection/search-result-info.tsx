type SearchResultsInfoProps = {
  searchQuery: string;
  totalResults: number;
  hasResults: boolean;
};

export const SearchResultsInfo = ({
  searchQuery,
  totalResults,
  hasResults,
}: SearchResultsInfoProps) => {
  if (!searchQuery.trim()) return null;

  return (
    <div className="text-muted-foreground text-sm">
      {hasResults
        ? `Found ${totalResults} model${totalResults === 1 ? "" : "s"} matching "${searchQuery}"`
        : `No models found matching "${searchQuery}"`}
    </div>
  );
};
