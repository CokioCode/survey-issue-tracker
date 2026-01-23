import type { LucideIcon } from "lucide-react";

export interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const FeatureItem = (props: FeatureItemProps) => {
  const { icon, title, desc } = props;
  const IconComponent = icon;

  return (
    <div className="space-y-2">
      <div className="mx-auto w-12 h-12 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
        <IconComponent />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm opacity-80">{desc}</p>
    </div>
  );
};
