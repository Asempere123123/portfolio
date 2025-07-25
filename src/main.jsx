import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css'
import App from './app.jsx'
import Projects from './projects.jsx';
import Nav from './nav.jsx';
import SpaceGame from "./projects/space_game.jsx"
import TechnicalSpaceGame from './projects/technical/space_game.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/space-game" element={<SpaceGame />} />
        <Route path="/space-game/technical" element={<TechnicalSpaceGame />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
