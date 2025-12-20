import { render, screen } from "@testing-library/react";
import TitleCards from "./TitleCards";

test("TitleCards bileşeni hata vermeden render ediliyor", () => {
  render(<TitleCards category="popular" />);
});

test("TitleCards bileşeni başlık ile render ediliyor", () => {
  render(<TitleCards title="Popular Movies" />);

  expect(
    screen.getByText(/popular movies/i)
  ).toBeInTheDocument();
});
