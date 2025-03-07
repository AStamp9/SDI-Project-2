import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe('App', () => {

    beforeEach(() => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    test("Renders the App and checks the button and title text", () => {
      expect(screen.getAllByText('Pokemon Types', {exact: false}).length).toBe(2);
    });
});