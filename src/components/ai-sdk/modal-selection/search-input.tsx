import { Search, X } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
}: SearchInputProps) => {
  const isSearching = value.trim().length > 0;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="text-muted-foreground h-4 w-4" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring block w-full rounded-md border py-2 pr-10 pl-10 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
      />
      {isSearching && (
        <button
          type="button"
          onClick={onClear}
          className="hover:text-foreground text-muted-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
