import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from 'src/tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import Board from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardRepo.create(createBoardDto);
    return this.boardRepo.save(newBoard);
  }

  findAll() {
    return this.boardRepo.find({ relations: ['columns'] });
  }

  findOne(id: string) {
    return this.boardRepo.findOne({ where: { id }, relations: ['columns'] });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const dbBoard = await this.boardRepo.findOne({
      where: { id },
      relations: ['columns'],
    });
    if (dbBoard) {
      this.boardRepo.merge(dbBoard, updateBoardDto);
      return this.boardRepo.save(dbBoard);
    }
    throw new NotFoundException()
  }

  async remove(id: string) {
    await this.taskRepo.delete({ boardId: id });
    await this.boardRepo.delete(id);
  }
}
