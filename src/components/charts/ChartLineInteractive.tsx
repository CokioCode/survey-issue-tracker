"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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

type SurveyChartData = {
  periode: string;
  jumlah_survey: number;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: SurveyChartData[];
};

const chartConfig = {
  surveys: {
    label: "Surveys",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const CHART_HEIGHT = {
  open: "h-[296px]",
  closed: "h-[386px]",
};

interface LineProps {
  hariTerakhir: number;
}

export function ChartLineInteractive(props: LineProps) {
  const stateSidebar = getCookie("sidebar_state");
  const chartHeight =
    stateSidebar === "true" ? CHART_HEIGHT.open : CHART_HEIGHT.closed;

  const { data, isLoading } = useGet<ApiResponse>(
    ["survey-chart", props.hariTerakhir],
    `/survey/chart/survey-count?hariTerakhir=${props.hariTerakhir}`,
    { isAuth: true },
  );

  const chartData =
    data?.data?.map((item) => ({
      date: new Date(item.periode).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      surveys: item.jumlah_survey,
    })) || [];

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>Survey Trends</CardTitle>
          <CardDescription>Survey submissions over time</CardDescription>
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
        <CardTitle>Survey Trends</CardTitle>
        <CardDescription>Survey submissions over time</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className={cn(
            "mx-auto w-full transition-[height] duration-300",
            chartHeight,
          )}
        >
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="surveys"
              type="natural"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "#2563eb" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
