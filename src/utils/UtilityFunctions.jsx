export function GetOpponentScore (currentPlayerId, vsPlayerMatchId, players){
    const opponent = players.find(x => x.player.id === vsPlayerMatchId);
    const opponentWinMatch = opponent?.player?.wins?.find(x => x.player.id === currentPlayerId);
    if (opponentWinMatch) {
        return (opponentWinMatch.player.score);
    }
    return 0;
}