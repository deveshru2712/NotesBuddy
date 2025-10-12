"use client";
import { SidebarIcon } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { ChatCircleIcon } from "@phosphor-icons/react";
import ChatWindow from "./ChatWindow";

interface AIChatInterfaceProps {
  userChats: string[];
}

interface SidebarProps {
  sideBarCollapsed: boolean;
  setSideBarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  userChats: string[];
}

function Sidebar({
  sideBarCollapsed,
  setSideBarCollapsed,
  userChats,
}: SidebarProps) {
  if (!sideBarCollapsed) {
    return (
      <div className="flex h-full w-xs flex-col border-r px-2.5">
        {/* header */}
        <div className="flex w-full items-center justify-between border-b py-2">
          <h2 className="text-lg font-bold">History</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
            >
              New Chat
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md border-2 border-black px-2 text-xs font-bold text-black shadow-[4px_4px_0px_0px_#000] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[4px_4px_0px_0px_#757373] dark:hover:shadow-[2px_2px_0px_0px_#757373]"
            >
              API Key
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSideBarCollapsed(true)}
              title="Hide sidebar"
              className="h-8 w-8 rounded-md border-2 border-black/20 p-0 font-bold text-black shadow-[2px_2px_0px_0px_#000] transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] dark:border-white/20 dark:text-white dark:shadow-[2px_2px_0px_0px_#757373] dark:hover:shadow-[4px_4px_0px_0px_#757373]"
            >
              <SidebarIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* main  */}
        <div className="flex h-full">
          {userChats.length == 0 ? (
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
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default function AIChatInterface({ userChats }: AIChatInterfaceProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <div className="flex h-full overflow-hidden" data-lenis-prevent>
      {/* sidebar */}
      <Sidebar
        setSideBarCollapsed={setSidebarCollapsed}
        sideBarCollapsed={sidebarCollapsed}
        userChats={userChats}
      />
      {/* chatwindow */}
      <ChatWindow />
    </div>
  );
}
