import { RobotIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export default function ChatWindow() {
  return (
    <div className="flex flex-1 flex-col">
      {/* header */}
      <div className="flex items-center justify-between border-y px-4 py-2 text-lg font-semibold">
        <div className="flex items-center gap-2.5">
          <RobotIcon className="h-6 w-6" weight="duotone" />
          AI Assistant
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
        >
          Pick a modal
        </Button>
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
