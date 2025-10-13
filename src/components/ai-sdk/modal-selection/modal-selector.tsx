"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2Icon } from "lucide-react";
import AvailableModelsList from "./available-model-list";
import { SelectedModel, SelectedModelProvider } from "./selected-model";

export default function ModelSelector() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
        >
          <Settings2Icon className="size-4" />
          Pick a modal
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] flex-col sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Pick Any Model To Start The Chat.</DialogTitle>
          <DialogDescription>
            You can choose multi model at the same time.
          </DialogDescription>
        </DialogHeader>
        <SelectedModelProvider>
          <SelectedModel />
        </SelectedModelProvider>

        {/* <SelectedModel /> */}
        <hr />
        <AvailableModelsList />
      </DialogContent>
    </Dialog>
  );
}
