import React from "react";
import hatchImg from '../images/hatch.png'
import { GetOpponentScore } from "../utils/UtilityFunctions";

const Scoreboard = ({ players }) => {
    const playerColours = [
        { id: "COLOUR01", hash: "#885A89" },
        { id: "COLOUR02", hash: "#F02D3A" },
        { id: "COLOUR03", hash: "#F87575" },
        { id: "COLOUR04", hash: "#CC3F0C" },
        { id: "COLOUR05", hash: "#EE7B30" },
        { id: "COLOUR06", hash: "#8AA8A1" },
        { id: "COLOUR07", hash: "#45899A" },
        { id: "COLOUR08", hash: "#006992" },
        { id: "COLOUR09", hash: "#7BAE7F" },
        { id: "COLOUR10", hash: "#2A8040" }];

    const getBackgroundColor = (colourId) => {
        return playerColours.find(x => x.id === colourId).hash;
    }

    const playerTh = players.map(currentPlayer => {
        return (
            <th style={{ background: getBackgroundColor(currentPlayer.player.colour) }} key={currentPlayer.player.id}>{currentPlayer.player.name}</th>
        );
    });

    const playerTbody = players.map(currentPlayer => {
        return (
            <tr key={currentPlayer.player.id}>
                <th style={{ background: getBackgroundColor(currentPlayer.player.colour) }}>{currentPlayer.player.name}</th>
                {players.map(currentVsPlayer => {
                    const vsPlayerMatch = currentPlayer.player.wins?.find(x => x.player.id === currentVsPlayer.player.id);
                    const vsPlayerMatchCurrent = currentVsPlayer.player.wins?.find(x => x.player.id === currentPlayer.player.id);
                    return (
                        <td style={{
                            background: vsPlayerMatch && vsPlayerMatchCurrent && vsPlayerMatch.player.score > vsPlayerMatchCurrent.player.score && vsPlayerMatch.player.score > 1
                            ? getBackgroundColor(currentPlayer.player.colour) : "transparent",
                            backgroundImage: currentPlayer.player.id === currentVsPlayer.player.id ? `url(${hatchImg})` : "none"
                        }} key={currentVsPlayer.player.id}>
                            {currentPlayer.player.id === currentVsPlayer.player.id ? ""
                                : vsPlayerMatch ? vsPlayerMatch.player.score + ":"
                                    + GetOpponentScore(currentPlayer.player.id, vsPlayerMatch.player.id, players)
                                    : vsPlayerMatchCurrent ? "0:" + vsPlayerMatchCurrent.player.score : ""}</td>
                    );
                })}
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