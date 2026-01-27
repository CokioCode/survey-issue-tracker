import { ChartAreaInteractive } from "@/components/charts/ChartAreaInteractive";
import { SectionCards } from "@/features/dashboard/components/SectionCards";

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </>
  );
}
