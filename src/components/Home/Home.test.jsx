import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Home from '../Home/Home.jsx'

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10' },
          { name: 'water', url: 'https://pokeapi.co/api/v2/type/11' },
          { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12' },
          { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13' },
        ],
      }),
  })
);

describe('Home', () => {

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    test("Renders the Home and checks the title text", async () => {
      expect(await screen.getByText(/Pokemon Types/i)).toBeInTheDocument();
    });


    test("Ensures 'Pokemon' buttons are displayed inside type cards", async () => {
      await waitFor(() => {
        const buttons = screen.getAllByRole('button', { name: /pokemon/i }); // Find buttons labeled 'Pokemon'
        expect(buttons.length).toBe(2); // Expect 2, since we mock 4 Pokemon types and slice 2 in Home.jsx
      });
    });

    test("Ensures 'Details' buttons are displayed inside type cards", async () => {
      await waitFor(() => {
        const buttons = screen.getAllByRole('button', { name: /details/i }); // Find buttons labeled 'Details'
        expect(buttons.length).toBe(2); // Expect 2, since we mock 4 Pokemon types and slice 2 in Home.jsx
      });
    });
 });