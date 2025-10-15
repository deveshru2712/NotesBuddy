"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
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
import { SelectedModel } from "./selected-model";
import type { Model } from "@/types/model";

interface SelectedModelsContextType {
  selectedModelList: Model[];
  addModel: (model: Model) => void;
  removeModel: (model: Model) => void;
  reorderModels: (from: number, to: number) => void;
}

const SelectedModelsContext = createContext<SelectedModelsContextType | null>(
  null,
);

export const useSelectedModels = () => {
  const context = useContext(SelectedModelsContext);
  if (!context) {
    throw new Error(
      "useSelectedModels must be used within a SelectedModelsProvider",
    );
  }
  return context;
};

const SelectedModelsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModelList, setSelectedModelList] = useState<Model[]>([]);

  const addModel = (model: Model) => {
    setSelectedModelList((prev) => {
      if (prev.some((m) => m.id === model.id)) return prev;
      return [...prev, model];
    });
  };

  const removeModel = (model: Model) => {
    setSelectedModelList((prev) => prev.filter((m) => m.id !== model.id));
  };

  const reorderModels = (from: number, to: number) => {
    setSelectedModelList((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  return (
    <SelectedModelsContext.Provider
      value={{ selectedModelList, addModel, removeModel, reorderModels }}
    >
      {children}
    </SelectedModelsContext.Provider>
  );
};

export default function ModelSelector() {
  return (
    <SelectedModelsProvider>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
          >
            <Settings2Icon className="size-4" />
            Pick a model
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[90vh] flex-col sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Pick Any Model To Start The Chat.</DialogTitle>
            <DialogDescription>
              You can choose multiple models at the same time.
            </DialogDescription>
          </DialogHeader>
          <SelectedModel />
          <hr />
          <AvailableModelsList />
        </DialogContent>
      </Dialog>
    </SelectedModelsProvider>
  );
}
