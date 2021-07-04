import { Request, Response, Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { userService } from './user.service';

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
});

router.route('/').post(async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await userService.create(userData);
  if (newUser) res.status(201).json(newUser);
  res
    .status(400)
    .send('Error when creating user, user with such login may already exist');
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    res.status(StatusCodes.NOT_FOUND).send({ Error: ReasonPhrases.NOT_FOUND });
  else {
    const user = await userService.get(id);
    if (user) res.json(user);
    else
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ Error: ReasonPhrases.NOT_FOUND });
  }
});

router.route('/:userId').put(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userData = { ...req.body, id: userId };
  const updatedUser = await userService.update(userData);
  res.json(updatedUser);
});

router.route('/:userId').delete(async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId)
    res.status(StatusCodes.NOT_FOUND).send({ Error: ReasonPhrases.NOT_FOUND });
  else {
    await userService.remove(userId);
    res
      .status(StatusCodes.NO_CONTENT)
      .send({ Error: ReasonPhrases.NO_CONTENT });
  }
});

export default router;
