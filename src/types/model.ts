export type Gateway = "openrouter" | "aimlapi" | "vercel";

export interface Model {
  id: string;
  name: string;
  provider: string;
  pricing: {
    input: string;
    output: string;
  };
  context?: string;
  gateway: Gateway;
  isFree: boolean;
}

export interface VercelModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  name: string;
  description: string;
  context_window: number;
  max_tokens: number;
  type: string;
  pricing: VercelPricing;
}

export interface VercelPricing {
  input: string;
  output: string;
}

export const ProvidersOrder = [
  "openai",
  "anthropic",
  "deepseek",
  "deepseekai",
  "google",
  "meta",
  "xai",
  "metallama",
  "moonshot",
  "moonshotai",
  "perplexity",
  "mistral",
  "mistralai",
  "cohere",
  "alibaba",
  "alibabacloud",
  "qwen",
  "amazon",
  "microsoft",
  "nvidia",
  "bytedance",
  "zai",
  "baidu",
  "tencent",
  "ai21",
  "inflection",
  "minimax",
  "minimaxai",
  "liquid",
  "zhipuai",
  "nousresearch",
  "openrouter",
  "vercel",
  "featherless",
  "infermatic",
  "aionlabs",
];
