"use client";

import { Clipboard, FileWarning, SignalIcon } from "lucide-react";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import type { FeatureItem } from "@/types";

const data: FeatureItem[] = [
  {
    icon: Clipboard,
    title: "Easy Surveys",
    desc: "Create and distribute surveys with ease",
  },
  {
    icon: FileWarning,
    title: "Track Issues",
    desc: "Monitor and manage issues in real-time",
  },
  {
    icon: SignalIcon,
    title: "Analytics",
    desc: "Get insights from comprehensive reports",
  },
];

const page = () => {
  return <LoginPage data={data} />;
};

export default page;
