"use client";

import { Key } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Model } from "@/types/model";
import { ModelLogo } from "./model-logo";

type Props = {
  model: Model;
};

export const ModelCard = ({ model }: Props) => {
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTextTruncated(
          textRef.current.scrollWidth > textRef.current.clientWidth,
        );
      }
    };
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  return (
    <div className="w-full rounded-lg border shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-card flex items-center justify-between gap-2 rounded-t-lg border-b px-4 py-3 text-sm">
        <div className="flex min-w-0 flex-1 items-center">
          <ModelLogo provider={model.provider} />
          <div className="ml-2 min-w-0 flex-1">
            {isTextTruncated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    ref={textRef}
                    className="text-foreground block cursor-help truncate font-medium"
                  >
                    {model.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{model.name}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span
                ref={textRef}
                className="text-foreground block truncate font-medium"
              >
                {model.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-none p-0"
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  pointerEvents: "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/api-key");
                }}
              >
                <Key className="size-3" strokeWidth={3.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>BYOK</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="bg-card rounded-b-lg px-4 py-3 text-xs">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="text-foreground font-medium">ID</div>
            <div className="text-muted-foreground text-right">
              {model.id.split(":")[1]}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="text-foreground font-medium">Input Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing.input}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="text-foreground font-medium">Output Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing.output}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="text-foreground font-medium">Context</div>
            <div className="text-muted-foreground text-right">
              {model.context}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
