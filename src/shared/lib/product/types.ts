import { MenuStatus } from "@/src/features/menu/lib/types";
import { z } from "zod";

const menuStatusSchema = z.enum(["ENOUGH", "UNDER_50", "UNDER_10"]);

export const ProductSchema = z.object({
  menuStatus: menuStatusSchema,
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imgUrl: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
