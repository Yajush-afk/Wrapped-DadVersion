import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App, { EXPERIENCE_STORAGE_KEY } from "../App";
import { SafeImage } from "./shared/SafeImage";

describe("Dad Wrapped", () => {
  beforeEach(() => window.localStorage.clear());

  it("starts at the opening and advances with the next control", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "DAD WRAPPED" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next card" }));
    expect(screen.getByText("ONE DAD. COUNTLESS SAVES.")).toBeInTheDocument();
  });

  it("supports keyboard navigation", () => {
    render(<App />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByLabelText("Card 2 of 10")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByLabelText("Card 1 of 10")).toBeInTheDocument();
  });

  it("renders a graphic fallback after an image fails", () => {
    render(<SafeImage src="/img/not-there.jpg" alt="Missing family photo" label="ADD PHOTO" />);
    fireEvent.error(screen.getByAltText("Missing family photo"));
    expect(screen.getByRole("img", { name: /Missing family photo. Photo placeholder/ })).toHaveTextContent("ADD PHOTO");
  });

  it("restores the current card after a reload", () => {
    window.localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify({
      stage: "wrapped",
      activeCardIndex: 3,
      viewedMemoryIds: [],
    }));

    render(<App />);

    expect(screen.getByLabelText("Card 4 of 10")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "THE LONG WAY, BECAUSE IT HAS LESS TRAFFIC" })).toBeInTheDocument();
  });
});
