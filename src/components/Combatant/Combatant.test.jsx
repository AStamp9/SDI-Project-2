import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react"
import Combatant from '../Combatant/Combatant.jsx'

describe('Combatant', () => {

    beforeEach(() => {
      render(
        <MemoryRouter>
          <Combatant />
        </MemoryRouter>
      );
    });

    test("Renders the Combatant and checks the title text", () => {
      expect(screen.getByText('Player 2', {exact: false})).toBeInTheDocument();
    });
});