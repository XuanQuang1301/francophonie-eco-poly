import { BoardSpace, Player } from '../../types';
import { BOARD_SPACES } from '../../data/board-spaces';
import BoardTile from './BoardTile';

interface GameBoardProps {
  players: Player[];
  currentPlayerIndex: number;
  onTileClick: (space: BoardSpace) => void;
  children?: React.ReactNode; // Center overlay (dice, modals)
}

export default function GameBoard({ players, currentPlayerIndex, onTileClick, children }: GameBoardProps) {
  const activePos = players[currentPlayerIndex]?.position ?? -1;

  return (
    <div className="board-grid select-none">
      {BOARD_SPACES.map(space => (
        <BoardTile
          key={space.id}
          space={space}
          players={players}
          isActive={space.id === activePos}
          onClick={() => onTileClick(space)}
        />
      ))}

      {/* Hollow center — columns 2-8, rows 2-8 */}
      <div className="hollow-center">
        {children}
      </div>
    </div>
  );
}
