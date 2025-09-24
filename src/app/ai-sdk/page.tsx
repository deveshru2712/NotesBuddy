import { getSession } from "@/lib/db/user";
import { redirect } from "next/navigation";
import OnboardingToast from "@/components/auth/OnboardingToast";
import { getUserOnboardingStatus } from "@/dal/user/onboarding/query";
import { Metadata } from "next";
import AIChatInterface from "@/components/ai-sdk/AIChatInterface";

export const metadata: Metadata = {
  title: "AI Study Assistant - Personalized Learning Support",
  description:
    "Get instant help with your studies using our AI-powered chat assistant. Ask questions, get explanations, and receive personalized study guidance to improve your academic performance.",
  keywords: [
    "AI chat",
    "study assistant",
    "AI tutor",
    "educational AI",
    "learning support",
    "academic help",
    "personalized learning",
  ],
  openGraph: {
    title: "AI Study Assistant - Personalized Learning Support | Notes Buddy",
    description:
      "Get instant help with your studies using our AI-powered chat assistant. Ask questions, get explanations, and receive personalized study guidance.",
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL || "http://stag.notesbuddy.in"}/ai`,
    siteName: "Notes Buddy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Study Assistant - Personalized Learning Support",
    description:
      "Get instant help with your studies using our AI-powered chat assistant.",
    site: "@notesbuddy",
    creator: "@notesbuddy",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL || "http://stag.notesbuddy.in"}/ai`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function AIPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const onboardingStatus = await getUserOnboardingStatus(session.user.id);

  return (
    <div className="flex h-screen overflow-hidden" data-lenis-prevent>
      <OnboardingToast
        isAuthenticated={true}
        isOnboarded={onboardingStatus.isOnboarded || false}
      />
      <AIChatInterface />
    </div>
  );
}
