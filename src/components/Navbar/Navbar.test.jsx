import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("Navbar logout butonu görünüyor", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/sign out of netflix/i)
  ).toBeInTheDocument();
});
