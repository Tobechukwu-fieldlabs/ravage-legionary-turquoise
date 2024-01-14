import { render, screen } from "@testing-library/react";
import { getSingleApplicationFixture } from "./__fixtures__/applications.fixture.js";
import App from "./App";
import { Application } from "./Applications.js";
import SingleApplication from "./SingleApplication.js";

const mockApplicationFixture = getSingleApplicationFixture[0] as Application;

test('renders "Application Portal" title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Application portal/i);
  expect(linkElement).toBeInTheDocument();
});

test("SingleApplication component renders correctly", () => {
  render(<SingleApplication application={mockApplicationFixture} />);
  const emailElement = screen.getByText(/milesespinoza@qnekt.com/i);
  const nameElement = screen.getByText(/miles espinoza/i);
  expect(emailElement).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
});
