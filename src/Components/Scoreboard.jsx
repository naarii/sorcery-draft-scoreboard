import React from "react";

const Scoreboard = ({ players }) => {
    const playerColours = [{ id: "COLOUR01", hash: "#c97064" },
    { id: "COLOUR02", hash: "#693e36" },
    { id: "COLOUR03", hash: "#8e657f" },
    { id: "COLOUR04", hash: "#53599a" },
    { id: "COLOUR05", hash: "#37455e" },
    { id: "COLOUR06", hash: "#6e9075" },
    { id: "COLOUR07", hash: "#1b3022" },
    { id: "COLOUR08", hash: "#090c08" }];

    const getBackgroundColor = (colourId) => {
        return playerColours.find(x => x.id === colourId).hash;
    }

    const playerTh = players.map(currentPlayer => {
        return (
            <th style={{ background: getBackgroundColor(currentPlayer.player.colour) }} key={currentPlayer.player.id}>{currentPlayer.player.name}</th>
        );
    });
    const getOpponentScore = (currentPlayer, vsPlayerMatch) => {
        const oppopnent = players.find(x => x.player.id === vsPlayerMatch.player.id);
        const opponentWinMatch = oppopnent.player.wins?.find(x => x.player.id === currentPlayer.player.id);
        if (opponentWinMatch){
            return(opponentWinMatch.player.score);
        }
        return 0;
    }
    const playerTbody = players.map(currentPlayer => {
        return (
            <tr key={currentPlayer.player.id}>
                <th style={{ background: getBackgroundColor(currentPlayer.player.colour) }}>{currentPlayer.player.name}</th>
                {players.map(currentVsPlayer => {
                    const vsPlayerMatch = currentPlayer.player.wins?.find(x => x.player.id === currentVsPlayer.player.id);
                    return(
                    <td style={{ background: vsPlayerMatch && vsPlayerMatch.player.score > 1 ? getBackgroundColor(currentPlayer.player.colour) : "transparent" }}key={currentVsPlayer.player.id}>
                        {currentPlayer.player.id === currentVsPlayer.player.id ? "x" 
                        : vsPlayerMatch ? vsPlayerMatch.player.score + ":" 
                        + getOpponentScore(currentPlayer, vsPlayerMatch)
                        : ""}</td>
                );})}
            </tr>
        );
    })
    return (<div className="center-screen">
        <table className="score-board">
            <thead>
                <tr>
                    <th></th>
                    {playerTh}
                </tr>
            </thead>
            <tbody>
                {playerTbody}
            </tbody>
        </table>
    </div>
    );
}

export default Scoreboard