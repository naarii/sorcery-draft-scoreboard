import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scoreboard from './Components/Scoreboard';
import draft2_data from './draft2_data.json';
import ChangeLog from './Components/ChangeLog';
import Header from './Components/Header';

function App() {
  const [draftPlayers, setDraftPlayers] = useState(draft2_data.draftPlayers);

  return (
    <BrowserRouter>
      <>
        <Header title={draft2_data.draftTitle} players={draftPlayers} setDraftPlayers={setDraftPlayers}/>
        <Routes>
          <Route exact path="/sorcery-draft-scoreboard" element={<>
            <Scoreboard players={draftPlayers} />
          </>} />
          <Route exact path="/sorcery-draft-scoreboard/changelog" element={<ChangeLog />} />
        </Routes>

      </>
    </BrowserRouter>
  );
}

export default App;
