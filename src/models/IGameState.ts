export interface IGameState {
    gameboard: string[];
    showScores: boolean;
    users: {
        nameX: string,
        nameO: string,
    };
    scores: {
        scoresX: number,
        scoresO: number,
    };
    isXturn: boolean;
    gameOver: boolean;
}