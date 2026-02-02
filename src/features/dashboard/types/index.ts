import { z } from "zod";

export const filterDashSchema = z.object({
  hariTerakhir: z.string().transform((val) => Number(val)),
});

export type FilterDash = z.infer<typeof filterDashSchema>;
