import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, BrowserRouter } from "react-router-dom";
import Player from "./Player";

test("Player sayfası render ediliyor", () => {
  render(
    <MemoryRouter initialEntries={["/player/123"]}>
      <Routes>
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </MemoryRouter>
  );

  // Back butonu bir img, text değil → alt text ile yakala
  expect(screen.getByAltText(/back/i)).toBeInTheDocument();

  // Bonus: Trailer yok mesajı da geliyor (istersen bunu da assert edebilirsin)
  expect(screen.getByText(/Trailer bulunamadı/i)).toBeInTheDocument();
});

test("Geri dönüş (back) ikonu ekranda görüntüleniyor", () => {
  render(
    <BrowserRouter>
      <Player />
    </BrowserRouter>
  );

  const backIcon = screen.getByAltText(/back/i);
  expect(backIcon).toBeInTheDocument();
});

test("Trailer bulunamadı mesajı ekranda görüntüleniyor", () => {
  render(
    <BrowserRouter>
      <Player />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/trailer bulunamadı/i)
  ).toBeInTheDocument();
});