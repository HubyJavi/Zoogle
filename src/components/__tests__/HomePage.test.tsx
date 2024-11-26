import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("HomePage", () => {
  it("renders the Zoogle logo", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const logoText = screen.getByRole("heading", { name: /Zoogle/i });
    expect(logoText).toBeInTheDocument();
  });

  it("allows entering a search term and navigates to results page on form submission", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search Zoogle...");
    fireEvent.change(searchInput, { target: { value: "cats" } });
    expect(searchInput).toHaveValue("cats");

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/results?q=cats");
  });
});
