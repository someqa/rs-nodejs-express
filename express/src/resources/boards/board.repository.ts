import { getRepository } from 'typeorm';
import IRepository from '../Interfaces/IRepository';
import Board from './board.entity';
import Task from '../tasks/task.entity';

class BoardRepository implements IRepository<Board> {
  getAll = async () => {
    const repo = getRepository(Board);
    return repo.find({ relations: ['columns'] });
  };

  get = async (id: string): Promise<Board | undefined> => {
    const repo = getRepository(Board);
    const board = await repo.findOne({ where: { id }, relations: ['columns'] });
    return board;
  };

  create = async (boardData: Board): Promise<Board | undefined> => {
    const repo = getRepository(Board);
    const newBoard = repo.create(boardData);
    await repo.save(newBoard);
    return repo.findOne({ where: { id: newBoard.id }, relations: ['columns'] });
  };

  remove = async (id: string): Promise<void> => {
    const taskRepo = getRepository(Task);
    await taskRepo.delete({ boardId: id });
    const repo = getRepository(Board);
    await repo.delete(id);
  };

  update = async (board: Board): Promise<Board | undefined> => {
    const repo = getRepository(Board);
    const dbBoard = await repo.findOne({
      where: { id: board.id },
      relations: ['columns'],
    });
    if (dbBoard) {
      await repo.merge(dbBoard, board);
      await repo.save(dbBoard);
    }
    return repo.findOne({ where: { id: board.id }, relations: ['columns'] });
  };
}

export const boardRepo = new BoardRepository();
