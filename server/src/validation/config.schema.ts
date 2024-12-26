import { z } from "zod";

export const configSchema = z.object({
    NODE_ENV: z.string().nonempty(),
    PORT: z.string().nonempty().transform(Number).default("3000"),
});
