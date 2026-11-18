import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileExperience from "@/components/ProfileExperience";
import { describe, expect, it } from "vitest";

async function openExperienceForm(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole("button", { name: "Add" }));
    return screen.findByRole("dialog");
}

async function chooseOption(
    user: ReturnType<typeof userEvent.setup>,
    name: string,
    option: string,
) {
    await user.click(screen.getByRole("combobox", { name }));
    await user.click(await screen.findByRole("option", { name: option }));
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText("Title*"), "Software Engineer");
    await chooseOption(user, "Employment type", "Full-time");
    await user.type(screen.getByLabelText("Company or organisation*"), "TechCorp");
    await chooseOption(user, "Start date* month", "January");
    await chooseOption(user, "Start date* year", "2021");
}

describe("Profile experience form", () => {
    it("opens the add-experience dialog from the Add button", async () => {
        const user = userEvent.setup();
        render(<ProfileExperience />);

        const dialog = await openExperienceForm(user);

        expect(within(dialog).getByText("Add Experience")).toBeInTheDocument();
    });

    it("shows required-field validation when submitted empty", async () => {
        const user = userEvent.setup();
        render(<ProfileExperience />);
        await openExperienceForm(user);

        await user.click(screen.getByRole("button", { name: "Save" }));

        expect(await screen.findByText("Title is required")).toBeInTheDocument();
        expect(screen.getByText("Employment type is required")).toBeInTheDocument();
        expect(screen.getByText("Company is required")).toBeInTheDocument();
        expect(screen.getByText("Start month is required")).toBeInTheDocument();
        expect(screen.getByText("Start year is required")).toBeInTheDocument();
    });

    it("requires an end month and year for a completed role", async () => {
        const user = userEvent.setup();
        render(<ProfileExperience />);
        await openExperienceForm(user);
        await fillRequiredFields(user);

        await user.click(screen.getByRole("button", { name: "Save" }));

        expect(await screen.findByText("End month is required")).toBeInTheDocument();
        expect(screen.getByText("End year is required")).toBeInTheDocument();
    });

    it("saves a completed role and displays it on the profile", async () => {
        const user = userEvent.setup();
        render(<ProfileExperience />);
        await openExperienceForm(user);
        await fillRequiredFields(user);
        await chooseOption(user, "End date* month", "December");
        await chooseOption(user, "End date* year", "2023");

        await user.click(screen.getByRole("button", { name: "Save" }));

        expect(
            await screen.findByRole("heading", { name: "Software Engineer" }),
        ).toBeInTheDocument();
        expect(screen.getByText("TechCorp · Full-time")).toBeInTheDocument();
        expect(screen.getByText(/January\s+2021\s+-\s+December 2023/)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });
    });

    it("disables end-date fields and saves Present for a current role", async () => {
        const user = userEvent.setup();
        render(<ProfileExperience />);
        await openExperienceForm(user);
        await fillRequiredFields(user);
        await user.click(
            screen.getByRole("checkbox", {
                name: "I am currently working in this role",
            }),
        );

        expect(
            screen.getByRole("combobox", { name: "End date* month" }),
        ).toBeDisabled();
        expect(
            screen.getByRole("combobox", { name: "End date* year" }),
        ).toBeDisabled();

        await user.click(screen.getByRole("button", { name: "Save" }));

        expect(await screen.findByText(/January\s+2021\s+-\s+Present/)).toBeInTheDocument();
    });
});
