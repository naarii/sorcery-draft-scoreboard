import React, { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const Header = (props) => {
    const {title, players, setDraftPlayers} = props;
    const [showAddResult, setShowAddResult] = useState(false);
    const [winnerId, setWinnerId] = useState("");
    const [loserId, setLoserId] = useState("");
    const [winnerScore, setWinnerScore] = useState(0);
    const [loserScore, setLoserScore] = useState(0);

    const resetScores = () => {
        setWinnerScore(0);
        setLoserScore(0);
    }

    const handleCloseAddResult = () => {
        setShowAddResult(false);
        setWinnerId("");
        setLoserId("");
        resetScores();
    } 
    const handleShowAddResult = () => setShowAddResult(true);

    const updatePlayerScore = (player, vsId, score) => {
        if (!player) {
            return;
        }
        if (!player.wins) {
            player.wins = [];
        }
        const vsWin = player.wins.find(x => x.player.id === vsId);
        if (!vsWin){
            player.wins = [...player.wins, {player: {
                id: vsId,
                score: score
            }}];
        }
        else {
            vsWin.player.score = score;
        }
    }
    
    const handleSaveAddResult = () => {
        const winnerPlayer = players.find(x => x.player.id === winnerId).player;
        updatePlayerScore(winnerPlayer, loserId, winnerScore);
        const loserPlayer = players.find(x => x.player.id === loserId).player;
        updatePlayerScore(loserPlayer, winnerId, loserScore);
        setDraftPlayers([...players]);
        handleCloseAddResult();
    };

    const playerSelectOptions = players.map(currentPlayer => {
        return (
            <option value={currentPlayer.player.id} key={currentPlayer.player.id}>{currentPlayer.player.name}</option>
        );
    });

    const onIdChange = (newWinnerId, newLoserId) => {
        setWinnerId(newWinnerId);
        setLoserId(newLoserId);
        setCurrentVsScores(newWinnerId, newLoserId);
    }

    const getScore = (playerId, vsPlayerId) => {
        const player = players.find(x => x.player.id === playerId);
        return player?.player?.wins?.find(x => x.player.id === vsPlayerId)?.player?.score;
    }

    const setCurrentVsScores = (newWinnerId, newLoserId) => {
        const scoreVsLoser = getScore(newWinnerId, newLoserId);
        if (scoreVsLoser){
            setWinnerScore(scoreVsLoser);
        }
        else {
            setWinnerScore(0);
        }
        const scoreVsWinner = getScore(newLoserId, newWinnerId);
        if (scoreVsWinner){
            setLoserScore(scoreVsWinner);
        }
        else {
            setLoserScore(0);
        }
    }

    return (<div className="top-screen">
        <h1>{title}</h1>
        <Button onClick={handleShowAddResult} variant="light">UPDATE SCORE</Button>
        <Modal className="add-result-modal" show={showAddResult} onHide={handleCloseAddResult}>
            <Modal.Header closeButton />
            <Modal.Body>
                <div style={{display: "inline-block"}}>
                    <InputGroup className="mb-3">
                    <Form.Select className="w-50" aria-label="Winner Select" onChange={event => onIdChange(event.target.value, loserId)} >
                        <option></option>
                        {playerSelectOptions}
                    </Form.Select>
                    <Form.Control type="number" 
                    value={winnerId===loserId || winnerId === "" || loserId === "" ? "" : winnerScore} 
                    disabled={winnerId===loserId || winnerId === "" || loserId === ""} 
                    onChange={event => setWinnerScore(event.target.value)}/>
                    </InputGroup>
                    VS
                    <InputGroup className="mt-3">
                    <Form.Select className="w-50" aria-label="Loser Select" onChange={event => onIdChange(winnerId, event.target.value)}>
                        <option></option>
                        {playerSelectOptions}
                    </Form.Select>
                    <Form.Control type="number" 
                    value={winnerId===loserId || winnerId === "" || loserId === "" ? "" : loserScore} 
                    disabled={winnerId===loserId || winnerId === "" || loserId === ""} 
                    onChange={event => setLoserScore(event.target.value)}/>
                    </InputGroup>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleSaveAddResult} disabled={winnerId===loserId || winnerId === "" || loserId === ""}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
    );
}

export default Header;