"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGet } from "@/hooks/useApi";
import { cn, getCookie } from "@/lib/utils";

type ProfitLossData = {
  untung: number;
  rugi: number;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: ProfitLossData;
};

const chartConfig = {
  count: { label: "Projects" },
  untung: { label: "Profit", color: "#22c55e" },
  rugi: { label: "Loss", color: "#ef4444" },
} satisfies ChartConfig;

const CHART_HEIGHT = {
  open: "h-[295px]",
  closed: "h-[385px]",
};

interface PieProps {
  hariTerakhir: number;
}

export function ChartPieInteractive(props: PieProps) {
  const stateSidebar = getCookie("sidebar_state");
  const chartHeight =
    stateSidebar === "true" ? CHART_HEIGHT.open : CHART_HEIGHT.closed;

  const { data, isLoading } = useGet<ApiResponse>(
    ["profit-loss-chart", props.hariTerakhir],
    `/survey/chart/profit-loss-pie?hariTerakhir=${props.hariTerakhir}`,
    { isAuth: true },
  );

  const chartData = data?.data
    ? [
        { status: "untung", count: data.data.untung, fill: "#22c55e" },
        { status: "rugi", count: data.data.rugi, fill: "#ef4444" },
      ]
    : [];

  const totalProjects = chartData.reduce((acc, curr) => acc + curr.count, 0);

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Profit & Loss</CardTitle>
          <CardDescription>
            Project profit and loss distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Profit & Loss</CardTitle>
        <CardDescription>Project profit and loss distribution</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 relative -mt-8">
        <ChartContainer
          config={chartConfig}
          className={cn(
            "mx-auto w-full transition-[height] duration-300",
            chartHeight,
          )}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalProjects}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* LEGEND ABSOLUTE */}
        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm capitalize">
                {item.status === "untung" ? "Profit" : "Loss"}: {item.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
