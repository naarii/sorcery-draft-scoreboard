import './App.css';
import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scoreboard from './Components/Scoreboard';
import ChangeLog from './Components/ChangeLog';
import Header from './Components/Header';

function App() {
  const [draftPlayers, setDraftPlayers] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftStartDate, setDraftStartDate] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setDraftTitle(data.draftTitle);
        setDraftPlayers(data.draftPlayers);
        setDraftStartDate(data.draftStartDate);
      });

  }, []);

  const saveDraftPlayers = (players) => {
    setDraftPlayers(players);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"draftTitle": draftTitle, "draftStartDate": draftStartDate, "draftPlayers": draftPlayers})
    };
    fetch("/api/put", requestOptions)
        .then(response => console.log(response));

  }

  

  return (
    <BrowserRouter>
      <>
        {!draftPlayers && <p>Loading...</p>}
        {draftPlayers &&
          <><Header title={!draftTitle ? "Loading..." : draftTitle} players={draftPlayers} setDraftPlayers={saveDraftPlayers} />
            <Routes>
              <Route exact path="/" element={<>
                <Scoreboard players={draftPlayers} />
              </>} />
              <Route exact path="/changelog" element={<ChangeLog />} />
            </Routes></>}


      </>
    </BrowserRouter>
  );
}

export default App;
