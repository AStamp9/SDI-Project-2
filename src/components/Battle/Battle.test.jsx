import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react"
import Battle from '../Battle/Battle.jsx'

describe('Battle', () => {

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Battle />
        </MemoryRouter>
      );
    });

    test("Renders the Battle and checks the title text", () => {
      expect(screen.getByText('Pokémon Battle', {exact: false})).toBeInTheDocument();
    });
});