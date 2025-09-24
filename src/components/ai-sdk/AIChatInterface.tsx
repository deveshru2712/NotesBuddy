"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function AIChatInterface() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="flex h-full w-full" data-lenis-prevent>
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <ChatWindow
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
    </div>
  );
}
