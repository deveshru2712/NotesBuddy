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
import type { Model } from "@/types/model";
import { ModelLogo } from "./model-logo";
import { ActionButton } from "./action-button";
import React from "react";
import { useSelectedModels } from "./model-selector";

// todo: check this out complete this funct
export const updateConversationStatus = async (
  _id: string,
  _model: Model,
  _status: boolean,
) => {
  // placeholder for future server call
};

interface SortableModelItemProps {
  model: Model;
}

const SortableModelItem = ({ model }: SortableModelItemProps) => {
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
  const { selectedModelList, reorderModels } = useSelectedModels();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = selectedModelList.findIndex((m) => m.id === active.id);
      const newIndex = selectedModelList.findIndex((m) => m.id === over.id);
      reorderModels(oldIndex, newIndex);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">
        Selected Models ({selectedModelList.length})
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedModelList.map((model) => model.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-2 overflow-x-auto pb-4">
            {selectedModelList.map((model) => (
              <SortableModelItem key={model.id} model={model} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
