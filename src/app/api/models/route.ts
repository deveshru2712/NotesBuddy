import millify from "millify";
import { VercelModel, Model } from "@/types/model";
import { NextResponse } from "next/server";

const formatPrice = (price: string) => {
  if (price === "-1") return "-";
  const priceInMillion = Number(price) * 1000000;
  const pricePerMillion = priceInMillion.toFixed(2);

  return pricePerMillion;
};

const fetchVercelModels = async (): Promise<Model[]> => {
  try {
    const response = await fetch("https://ai-gateway.vercel.sh/v1/models", {
      next: { revalidate: 3600 },
    });
    const data: VercelModel[] = (await response.json()).data;

    return data.reduce<Model[]>((acc, model) => {
      if (model.type === "language") {
        acc.push({
          id: `vercel:${model.id}`,
          name: model.name,
          provider: model.owned_by,
          gateway: "vercel",
          pricing: {
            input: formatPrice(model.pricing.input || "-1"),
            output: formatPrice(model.pricing.output || "-1"),
          },
          context: millify(model.context_window),
          isFree:
            Number(formatPrice(model.pricing.input)) +
              Number(formatPrice(model.pricing.output)) <=
            1,
        });
      }
      return acc;
    }, []);
  } catch (error) {
    console.error("Failed to fetch Vercel models:", error);
    return [];
  }
};

export const GET = async () => {
  try {
    const [vercelModels] = await Promise.allSettled([fetchVercelModels()]);

    const allModels: Model[] = [
      ...(vercelModels.status === "fulfilled" ? vercelModels.value : []),
    ];

    return NextResponse.json({ models: allModels });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch available models",
      },
      { status: 500 },
    );
  }
};
