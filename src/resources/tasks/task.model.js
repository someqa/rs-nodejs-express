import {v4 as uuid} from 'uuid';

class Task {
  constructor({
    id = uuid(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
