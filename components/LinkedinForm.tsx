"use client";

import { linkedinFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function LinkedinForm() {
    const form = useForm<z.infer<typeof linkedinFormSchema>>({
        resolver: zodResolver(linkedinFormSchema),
        defaultValues: {
            title: "",
            employmentType: "",
            company: "",
            isCurrent: false,
            startDate: {
                month: "",
                year: "",
            },
            endDate: {
                month: "",
                year: "",
            },
        },
    });

    const onSubmit = (data: z.infer<typeof linkedinFormSchema>) => {
        console.log(data);
    };

    return <form onSubmit={form.handleSubmit(onSubmit)}>LinkedinForm</form>;
}
