import { Request, Response, Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { boardService } from './board.service';

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/').post(async (req: Request, res: Response) => {
  const boardData = req.body;
  const newBoard = await boardService.create(boardData);
  res.status(201).json(newBoard);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    res.status(StatusCodes.NOT_FOUND).send({ Error: ReasonPhrases.NOT_FOUND });
  else {
    const board = await boardService.get(id);
    if (board) res.json(board);
    else
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ Error: ReasonPhrases.NOT_FOUND });
  }
});

router.route('/:boardId').put(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const boardData = { ...req.body, id: boardId };
  const updatedBoard = await boardService.update(boardData);
  res.json(updatedBoard);
});

router.route('/:boardId').delete(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  if (!boardId)
    res.status(StatusCodes.NOT_FOUND).send({ Error: ReasonPhrases.NOT_FOUND });
  else {
    await boardService.remove(boardId);
    res
      .status(StatusCodes.NO_CONTENT)
      .send({ Error: ReasonPhrases.NO_CONTENT });
  }
});

export default router;
