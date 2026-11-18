"use client";

import { linkedinFormSchema } from "@/lib/validation";
import type { LinkedinExperience } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import type { Dispatch, SetStateAction } from "react";
import DateFields from "./DateFields";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const employmentTypes = [
    "Full-time",
    "Part-time",
    "Self-employed",
    "Freelance",
    "Contract",
    "Internship",
    "Apprenticeship",
    "Seasonal",
];

interface LinkedinFormProps {
    onSaved?: () => void;
    setDataExp: Dispatch<SetStateAction<LinkedinExperience[]>>;
}

export default function LinkedinForm({
    onSaved,
    setDataExp,
}: LinkedinFormProps) {
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
    const isCurrent = useWatch({
        control: form.control,
        name: "isCurrent",
    });

    const onSubmit = (data: z.infer<typeof linkedinFormSchema>) => {
        const experience: LinkedinExperience = {
            ...data,
            endDate: data.isCurrent ? undefined : data.endDate,
        };
        setDataExp((experiences) => [...experiences, experience]);
        onSaved?.();
    };

    return (
        <Card className="w-full max-w-none rounded-md shadow-lg">
            <CardHeader className="border-b px-6 py-5 pr-14">
                <CardTitle className="text-2xl font-bold">
                    Add Experience
                </CardTitle>
            </CardHeader>

            <CardContent className="px-6 py-5">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-5">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-2"
                                >
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Title*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ex: Retail, Sales Manager"
                                        autoComplete="off"
                                        className="h-11 rounded-md border-slate-400"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="employmentType"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-2"
                                >
                                    <FieldLabel htmlFor="employment-type">
                                        Employment type
                                    </FieldLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            id="employment-type"
                                            aria-invalid={fieldState.invalid}
                                            className="h-11 w-full rounded-md border-slate-400"
                                        >
                                            <SelectValue placeholder="Select employment type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {employmentTypes.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="company"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-2"
                                >
                                    <FieldLabel htmlFor="company">
                                        Company or organisation*
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="company"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Ex: Microsoft"
                                        autoComplete="organization"
                                        className="h-11 rounded-md border-slate-400"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="isCurrent"
                            control={form.control}
                            render={({ field }) => (
                                <Field
                                    orientation="horizontal"
                                    className="items-center gap-2"
                                >
                                    <Checkbox
                                        id="currently-working"
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            const currentlyWorking =
                                                checked === true;
                                            field.onChange(currentlyWorking);
                                            if (currentlyWorking) {
                                                form.setValue("endDate", {
                                                    month: "",
                                                    year: "",
                                                });
                                            }
                                        }}
                                    />
                                    <FieldLabel
                                        htmlFor="currently-working"
                                        className="text-sm font-normal text-slate-700"
                                    >
                                        I am currently working in this role
                                    </FieldLabel>
                                </Field>
                            )}
                        />

                        <DateFields
                            control={form.control}
                            name="startDate"
                            label="Start date*"
                            disabled={false}
                        />

                        <DateFields
                            control={form.control}
                            name="endDate"
                            label="End date*"
                            disabled={isCurrent}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="justify-end border-t bg-white px-6 py-5">
                <Button
                    type="submit"
                    form="form-rhf-demo"
                    className="h-10 rounded-full bg-blue-600 px-5 text-base font-semibold hover:bg-blue-700"
                >
                    Save
                </Button>
            </CardFooter>
        </Card>
    );
}
