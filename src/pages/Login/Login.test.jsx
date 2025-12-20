import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

test("Login sayfası render ediliyor", () => {
  render(<Login />);

  expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});

test("Sign Up Now tıklanınca kayıt moduna geçer", async () => {
  const user = userEvent.setup();
  render(<Login />);

  await user.click(screen.getByText(/sign up now/i));

  expect(screen.getByRole("heading")).toHaveTextContent(/sign up/i);
});

test("Email ve Password alanlarına yazı girilebiliyor", async () => {
  const user = userEvent.setup();
  render(<Login />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  await user.type(emailInput, "test@test.com");
  await user.type(passwordInput, "123456");

  expect(emailInput).toHaveValue("test@test.com");
  expect(passwordInput).toHaveValue("123456");
});

test("Sign In butonu tıklanabiliyor", async () => {
  const user = userEvent.setup();
  render(<Login />);

  const button = screen.getByRole("button", { name: /sign in/i });
  await user.click(button);

  expect(button).toBeEnabled();
});

test("Remember Me checkbox ekranda görünüyor", () => {
  render(<Login />);

  const checkbox = screen.getByRole("checkbox");
  const label = screen.getByText(/remember me/i);

  expect(checkbox).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

test("Remember Me checkbox tıklanınca checked oluyor", async () => {
  render(<Login />);

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();

  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("Form submit edildiğinde loading spinner gösteriliyor", async () => {
  render(<Login />);

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  await userEvent.type(emailInput, "test@test.com");
  await userEvent.type(passwordInput, "123456");

  await userEvent.click(submitButton);

  // Spinner img alt text üzerinden yakalanır
  const spinner = screen.getByAltText(/loading/i);

  expect(spinner).toBeInTheDocument();
});

