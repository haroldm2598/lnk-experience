import * as z from "zod";

export const linkedinFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    employmentType: z.string().min(1, "Employment type is required"),
    company: z.string().min(1, "Company is required"),
    isCurrent: z.boolean(),
    startDate: z.object({
        month: z.string().min(1, "Start month is required"),
        year: z.string().min(1, "Start year is required"),
    }),
    endDate: z
        .object({
            month: z.string().min(1, "End month is required"),
            year: z.string().min(1, "End year is required"),
        })
        .optional(),
});
