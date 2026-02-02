"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

type ProfitLossAreaData = {
  bulan: string;
  untung: number;
  rugi: number;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: ProfitLossAreaData[];
};

const chartConfig = {
  untung: {
    label: "Profit",
    color: "#22c55e",
  },
  rugi: {
    label: "Loss",
    color: "#ef4444",
  },
} satisfies ChartConfig;

interface AreaProps {
  hariTerakhir: number;
}

export function ChartAreaInteractive(props: AreaProps) {
  const { data, isLoading } = useGet<ApiResponse>(
    ["profit-loss-area-chart", props.hariTerakhir],
    `/survey/chart/profit-loss-area?hariTerakhir=${props.hariTerakhir}`,
    { isAuth: true },
  );

  const chartData =
    data?.data?.map((item) => ({
      date: new Date(item.bulan).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      untung: item.untung,
      rugi: item.rugi,
    })) || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss Trends</CardTitle>
          <CardDescription>
            Monthly profit and loss comparison over time
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit & Loss Trends</CardTitle>
        <CardDescription>
          Monthly profit and loss comparison over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillUntung" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRugi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="rugi"
              type="natural"
              fill="url(#fillRugi)"
              fillOpacity={0.4}
              stroke="#ef4444"
              stackId="a"
            />
            <Area
              dataKey="untung"
              type="natural"
              fill="url(#fillUntung)"
              fillOpacity={0.4}
              stroke="#22c55e"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
