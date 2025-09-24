import React from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { Input } from "../ui/input";

export default function EmbeddedAcademicFilter() {
  return (
    <div className="w-full rounded-md border px-2.5 py-2 text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]">
      <div className="flex items-center gap-2">
        <Input
          className="focus-visible:ring-0"
          placeholder="start a new meesage"
        />
        <Button
          type="submit"
          size="icon"
          className="h-8 w-8 transition-opacity"
        >
          <ArrowUp />
        </Button>
      </div>
    </div>
  );
}
