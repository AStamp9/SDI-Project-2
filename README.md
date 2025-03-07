# Pokemon Battle Companion

## Purpose
This **React Vite** application fetches and displays **Pokemon types, stats, and damage relations** using the **PokeAPI**. It provides an interactive and responsive UI for Pokemon data exploration.

### Problem Statement
As a Pokemon enthusiast who loves to battle, I want a simple website to compare Pokemon types and receive Pokemon recommendations, so that I can maximize my chances of winning.

Given that type match-ups play a crucial role in battles, when I compare a Pokemon type, then I should receive clear and concise information about its strengths, weaknesses, and effectiveness, as well as a list of recommended Pokemon that have a strong advantage against it.

## Features

- Fetch Pokemon details using **PokeAPI**
- Display **Pokemon and Pokemon Types**
- Show **base stats** (HP, Attack, Defense, etc.)
- View **damage relations** (Strong Against, Weak Against, Neutral) by type

## Planning Process Documents

[Kanban Board](https://trello.com/b/5zlaaPnD/sdi-project-2-team-6)<br>
[Wireframe/Decision Tree](https://miro.com/app/board/uXjVIW0kveI=/)

## Installation & Running the App

**Clone the Repository**
```sh
git clone https://github.com/gigann/SDI-Project-2
cd SDI-Project-2
```
**Install Dependencies**
```sh
npm install
```
**Start the Application**
```sh
npm run dev
```
** *copy and paste url into browser* **
## Using the Application
**1.** Find the Pokemon type you want to learn more about.

**2.** Select Pokemon to see all Pokemon of that type

**3.**  Select a specific Pokemon to view its type, stats, and type comparisons.

or

**1.** Find the Pokemon type you want to learn more about.

**2.** Select Details to see information about that type

**3.** Select Pokemon to view a list of Pokemon of that type.

At any point you can navigate back to the type list page by clicking on the Pokemon Type button or searching a specific Pokemon by name or id.

*This application is designed to seamlessly navigate between Pokemon types, Pokemon of that type, and type comparisons.*


### Screenshots

## Running Test

**All test dependencies should already be in the package.json and install automatically with you ran npm install**

Navigate to your project folder
<!-- ```sh
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
``` -->

**Run Test**
```sh
npm test
```
or
```sh
npm run test
```

This should run all of the test for each component.

## Future Improvements
- Mock Battle between two selected Pokemon
- Show Pokemon moves and abilities
- Implement dark mode

## Authors
Tyson Butler Currier

Gerald Gann (Issac)

Landon Spencer

Andrew Stamps