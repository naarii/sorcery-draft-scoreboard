import './App.css';
import Scoreboard from './Components/Scoreboard';
import draft2_data from './draft2_data.json';

function App() {
  return (<>
    <h1>{draft2_data.draftTitle}</h1>
    <Scoreboard players={draft2_data.draftPlayers} />
  </>
  );
}

export default App;
