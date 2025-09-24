"use client";
import { BotMessageSquare, KeyRound, PanelRightClose } from "lucide-react";
import React, { SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import EmbeddedAcademicFilter from "./EmbeddedAcademicFilter";

interface ChatWindowProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ChatWindow({
  isSideBarOpen,
  setIsSideBarOpen,
}: ChatWindowProps) {
  //  a default value is passed
  const isSelected = false;
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-2.5">
      {!isSideBarOpen && (
        <div className="px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSideBarOpen((prev) => !prev)}
            className="rounded-md border-2 border-black font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
          >
            <PanelRightClose />
            Open Sidebar
          </Button>
        </div>
      )}

      <div className="flex h-full w-full flex-1 flex-col justify-between rounded-md border px-8 py-4">
        {/* topbar */}
        <div className="flex items-center justify-end gap-2 border-b py-2">
          <Button
            variant={isSelected ? "default" : "ghost"}
            className={cn(
              "mb-1 h-auto w-fit justify-start rounded-md border-2 px-2.5 py-2 text-left font-bold transition-all duration-200",
              isSelected
                ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] dark:border-white dark:bg-white dark:text-black dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
                : "dark:bg-background dark:hover:bg-background/80 border-black/20 bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-gray-50 hover:shadow-[4px_4px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[2px_2px_0px_0px_#757373] dark:hover:shadow-[4px_4px_0px_0px_#757373]",
            )}
          >
            <BotMessageSquare />
            Pick a model
          </Button>
          <Button
            variant={isSelected ? "default" : "ghost"}
            className={cn(
              "mb-1 h-auto w-fit justify-start rounded-md border-2 px-2.5 py-2 text-left font-bold transition-all duration-200",
              isSelected
                ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] dark:border-white dark:bg-white dark:text-black dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
                : "dark:bg-background dark:hover:bg-background/80 border-black/20 bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-gray-50 hover:shadow-[4px_4px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[2px_2px_0px_0px_#757373] dark:hover:shadow-[4px_4px_0px_0px_#757373]",
            )}
          >
            <KeyRound />
            Configure Key
          </Button>
        </div>

        <EmbeddedAcademicFilter />
      </div>
    </div>
  );
}
