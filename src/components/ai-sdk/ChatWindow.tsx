"use client";

import { RobotIcon } from "@phosphor-icons/react";
import ModelSelector from "./modal-selection/modal-selector";

export default function ChatWindow() {
  return (
    <div className="flex flex-1 flex-col">
      {/* header */}
      <div className="flex items-center justify-between border-y px-4 py-2 text-lg font-semibold">
        <div className="flex items-center gap-2.5">
          <RobotIcon className="h-6 w-6" weight="duotone" />
          AI Assistant
        </div>
        <ModelSelector />
      </div>

      {/* main */}
      <div className="flex h-full flex-1 items-center justify-center">
        <span className="flex flex-col items-center text-lg font-medium">
          <RobotIcon className="h-8 w-8" weight="duotone" />
          Pick a modal first
        </span>
      </div>
    </div>
  );
}
