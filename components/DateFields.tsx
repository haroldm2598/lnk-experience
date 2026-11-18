"use client";

import { linkedinFormSchema } from "@/lib/validation";
import { Controller, type Control } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1949 }, (_, index) =>
    String(currentYear - index),
);

type FormValues = z.infer<typeof linkedinFormSchema>;

export default function DateFields({
    control,
    name,
    label,
    disabled,
}: {
    control: Control<FormValues>;
    name: "startDate" | "endDate";
    label: string;
    disabled: boolean;
}) {
    return (
        <FieldGroup className="gap-2">
            <FieldLabel>{label}</FieldLabel>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Controller
                    name={`${name}.month`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={disabled}
                            >
                                <SelectTrigger
                                    aria-label={`${label} month`}
                                    aria-invalid={fieldState.invalid}
                                    className="h-11 w-full rounded-md border-slate-400"
                                >
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {months.map((month) => (
                                        <SelectItem key={month} value={month}>
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name={`${name}.year`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={disabled}
                            >
                                <SelectTrigger
                                    aria-label={`${label} year`}
                                    aria-invalid={fieldState.invalid}
                                    className="h-11 w-full rounded-md border-slate-400"
                                >
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </div>
        </FieldGroup>
    );
}
