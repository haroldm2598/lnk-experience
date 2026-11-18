"use client";

import { useState } from "react";
import LinkedinForm from "@/components/LinkedinForm";
import type { LinkedinExperience } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ProfileExperience() {
    const [open, setOpen] = useState(false);
    const [dataExp, setDataExp] = useState<LinkedinExperience[]>([]);

    return (
        <main className="min-h-screen bg-slate-300 px-4 py-6 sm:px-8 sm:py-10">
            <div className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-400 bg-white p-5 shadow-lg sm:p-6">
                <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
                    My LinkedIn Profile
                </h1>

                <section aria-labelledby="experience-heading">
                    <div className="flex items-center justify-between bg-slate-200 px-5 py-4">
                        <h2
                            id="experience-heading"
                            className="text-2xl font-bold"
                        >
                            Experience
                        </h2>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-base font-normal cursor-pointer"
                                >
                                    Add
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-4xl overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden border-0 bg-transparent p-0 shadow-none sm:w-[calc(100%-3rem)]">
                                <LinkedinForm
                                    onSaved={() => setOpen(false)}
                                    setDataExp={setDataExp}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="space-y-8 px-5 py-6">
                        {dataExp.map((experience, index) => (
                            <article
                                key={`${experience.company}-${experience.title}-${index}`}
                            >
                                <h3 className="text-xl font-semibold">
                                    {experience.title}
                                </h3>
                                <p>
                                    {experience.company}
                                    {experience.employmentType
                                        ? ` · ${experience.employmentType}`
                                        : ""}
                                </p>
                                <p className="text-slate-500">
                                    {experience.startDate.month}{" "}
                                    {experience.startDate.year} -{" "}
                                    {experience.isCurrent
                                        ? "Present"
                                        : `${experience.endDate?.month} ${experience.endDate?.year}`}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
