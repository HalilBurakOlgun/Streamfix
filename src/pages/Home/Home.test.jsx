import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Home sayfası render ediliyor", () => {
  render(<Home />);

  expect(screen.getByText(/Popular on Netflix/i)).toBeInTheDocument();
});
