export interface IGameState {
    gameboard: [];
    showScores: boolean;
    users: {
        nameX: string,
        nameO: string,
    };
    scores: {
        scoresX: number,
        scoresO: number,
    };
}