/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { createContext, useContext, useState } from "react";
import type { Model } from "@/types/model";
import { ModelLogo } from "./model-logo";
import { ActionButton } from "./action-button";

const updateConversationStatus = async (
  _id: string,
  _model: Model,
  _status: boolean,
) => {
  // Do nothing for now
};

type SelectedModelContextType = {
  selectedModels: Model[];
  addModel: (model: Model) => void;
  removeModel: (model: Model) => void;
  reorderModels: (from: number, to: number) => void;
};

const SelectedModelContext = createContext<SelectedModelContextType | null>(
  null,
);

export const useSelectedModels = () => {
  const ctx = useContext(SelectedModelContext);
  if (!ctx) throw new Error("useSelectedModels must be used within Provider");
  return ctx;
};

export const SelectedModelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedModels, setSelectedModels] = useState<Model[]>([]);

  const addModel = (model: Model) =>
    setSelectedModels((prev) => [...prev, model]);

  const removeModel = (model: Model) =>
    setSelectedModels((prev) => prev.filter((m) => m.id !== model.id));

  const reorderModels = (from: number, to: number) => {
    setSelectedModels((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  return (
    <SelectedModelContext.Provider
      value={{ selectedModels, addModel, removeModel, reorderModels }}
    >
      {children}
    </SelectedModelContext.Provider>
  );
};

const SortableModelItem = ({ model }: { model: Model }) => {
  const { id } = useParams();
  const router = useRouter();
  const { addModel, removeModel } = useSelectedModels();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: model.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemoveModel = async () => {
    removeModel(model);
    try {
      if (id) {
        await updateConversationStatus(id as string, model, false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to remove model");
      addModel(model); // revert if failed
      console.error(error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-background flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-nowrap ${
        isDragging ? "z-50 opacity-50 shadow-lg" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="hover:text-muted-foreground cursor-grab transition-colors active:cursor-grabbing"
        aria-label="Drag to reorder model"
      >
        <GripHorizontal size={16} />
      </button>
      <ModelLogo provider={model.provider} />
      <p>{model.name}</p>
      <ActionButton
        type="remove"
        size="sm"
        onClick={handleRemoveModel}
        tooltipText="Remove Model"
      />
    </div>
  );
};

export const SelectedModel = () => {
  const { selectedModels, reorderModels } = useSelectedModels();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = selectedModels.findIndex((m) => m.id === active.id);
      const newIndex = selectedModels.findIndex((m) => m.id === over.id);
      reorderModels(oldIndex, newIndex);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">
        Selected Models ({selectedModels.length})
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedModels.map((model) => model.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-2 overflow-x-auto pb-4">
            {selectedModels.map((model) => (
              <SortableModelItem key={model.id} model={model} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
