"use client";
import React, { SetStateAction } from "react";
import { Button } from "../ui/button";
import { PanelLeftClose, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { ChatCircleIcon } from "@phosphor-icons/react";

interface SidebarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  isSideBarOpen,
  setIsSideBarOpen,
}: SidebarProps) {
  if (!isSideBarOpen) {
    return null;
  }

  return (
    <div className="flex h-full w-1/3 flex-col gap-1.5 rounded-md border-t border-b px-4 md:w-1/4">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b py-3">
        {/* add the onclick function and the disable property */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
        >
          <Plus /> New Chat
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        >
          <PanelLeftClose />
        </Button>
      </div>
      {/* recent chat this is a dummy data */}
      <div className="mt-2.5 flex h-full flex-col items-start gap-2.5">
        {/* only take the first 30 char then replace it with the dot notation */}
        {chatCards.length > 0 ? (
          chatCards.map((card) => <ChatCard key={card.title} {...card} />)
        ) : (
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="text-center">
              <ChatCircleIcon
                className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-600"
                weight="duotone"
              />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                No chats yet
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Start a new conversation to get help with your studies
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Todo: change time to datestring
interface ChatCardProps {
  title: string;
  subject: string;
  time: string;
  messageCount: number;
}

// this is a dummy data delete it

const chatCards: ChatCardProps[] = [
  {
    title: "Mathematics Study Group",
    subject: "Algebra & Calculus",
    time: "2:30 PM",
    messageCount: 24,
  },
  {
    title: "Science Project Team",
    subject: "Biology Research",
    time: "10:15 AM",
    messageCount: 12,
  },
  {
    title: "Literature Club",
    subject: "Shakespeare Discussion",
    time: "4:45 PM",
    messageCount: 56,
  },
  {
    title: "History Study Session",
    subject: "World War II",
    time: "1:20 PM",
    messageCount: 8,
  },
  {
    title: "Programming Help",
    subject: "React & TypeScript",
    time: "9:00 AM",
    messageCount: 42,
  },
];

const ChatCard = ({ title, subject, messageCount, time }: ChatCardProps) => {
  // this is by default false
  const isSelected = false;
  return (
    <Button
      variant={isSelected ? "default" : "ghost"}
      className={cn(
        "mb-1 h-auto w-full justify-start rounded-md border-2 p-3 text-left font-bold transition-all duration-200",
        isSelected
          ? "border-black bg-black text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] dark:border-white dark:bg-white dark:text-black dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
          : "dark:bg-background dark:hover:bg-background/80 border-black/20 bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:bg-gray-50 hover:shadow-[4px_4px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[2px_2px_0px_0px_#757373] dark:hover:shadow-[4px_4px_0px_0px_#757373]",
      )}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3
            className={cn(
              "flex-1 truncate text-sm font-medium",
              isSelected ? "text-primary-foreground" : "text-foreground",
            )}
          >
            {title}
          </h3>
          <span
            className={cn(
              "shrink-0 text-xs",
              isSelected
                ? "text-primary-foreground/80"
                : "text-muted-foreground",
            )}
          >
            {time}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={isSelected ? "outline" : "secondary"}
            className={cn(
              "shrink-0 text-xs",
              isSelected &&
                "border-primary-foreground/20 text-primary-foreground",
            )}
          >
            {subject}
          </Badge>
          <span
            className={cn(
              "shrink-0 text-xs",
              isSelected
                ? "text-primary-foreground/80"
                : "text-muted-foreground",
            )}
          >
            {messageCount} message
            {messageCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Button>
  );
};
