import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SelectLevel from './pages/SelectLevel';
import Play from './pages/Play'
import Result from './pages/Result';

import { DifficultyProvider } from './context/DifficultyContext';
import { ScoreProvider } from './context/ScoreContext';

function App() {
  return (
    <DifficultyProvider>
      <ScoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/play" element={<Play />} />
            <Route path="/result" element={<Result />} />
            <Route path="/*" exact element={<SelectLevel />} />
          </Routes>
        </BrowserRouter>
      </ScoreProvider>
    </DifficultyProvider>

  );
}

export default App;

