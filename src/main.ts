import { Game } from './Game.js';
import { Player } from './Player.js';
import { UI } from './UI.js';
import { Player as PlayerSymbol, PlayerInfo } from './types.js';

// Configuration object - easy to modify
const PLAYER_CONFIG: readonly [PlayerInfo, PlayerInfo] = [
  {
    name: 'MESSI',
    symbol: PlayerSymbol.X,
    imagePath: 'assets/cross_391116.png'
  },
  {
    name: 'RONALDO',
    symbol: PlayerSymbol.O,
    imagePath: 'assets/letter-o_9150573.png'
  }
] as const;

function initGame(): void {
  const [p1Info, p2Info] = PLAYER_CONFIG;
  
  const player1 = new Player(p1Info.symbol, p1Info.name);
  const player2 = new Player(p2Info.symbol, p2Info.name);
  
  const game = new Game(player1, player2);
  
  // Map for quick player info lookup
  const playerInfoMap = new Map<Player, PlayerInfo>([
    [player1, p1Info],
    [player2, p2Info]
  ]);
  
  new UI(game, playerInfoMap);
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}