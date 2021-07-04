import IService from '../Interfaces/IService';
import { boardRepo } from './board.repository';
import Board from './board.entity';

class BoardService implements IService<Board> {
  getAll = async (): Promise<Board[]> => boardRepo.getAll();

  get = async (id: string): Promise<Board | undefined> => boardRepo.get(id);

  create = async (boardData: Board): Promise<Board | undefined> => boardRepo.create(boardData);

  update = async (boardData: Board): Promise<Board | undefined> => boardRepo.update(boardData);

  remove = async (id: string): Promise<void> => boardRepo.remove(id);
}

export const boardService = new BoardService();
