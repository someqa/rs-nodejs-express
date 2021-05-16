const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

// initial state
let boards = [
  new Board({
    id: 'board1',
    columns: [{ id: 'col1', title: 'real olumn', order: 2 }],
  }),
  new Board({ id: 'board2' }),
];
let users = [new User({ id: 'user1' }), new User({ id: 'user2' }), new User()];
let tasks = [
  new Task({
    id: 'task1',
    title: 'my 1st task',
    order: 1,
    description: 'go to bed',
    userId: 'user1',
    boardId: 'board1',
    columnId: 'col1',
  }),
];

// Users

const getAllUsers = async () => users;
const getUser = async (id) => users.find((user) => user.id === id);
const createUser = async (user) => {
  users.push(user);
  return getUser(user.id);
};
const removeUser = async (id) => {
  users = users.filter((user) => user.id !== id);
};
const updateUser = async (user) => {
  removeUser(user.id);
  createUser(user);
  return getUser(user.id);
};

// Boards
const getAllBoards = async () => boards;
const getBoard = async (id) => boards.find((board) => board.id === id);
const createBoard = async (board) => {
  boards.push(board);
  return getBoard(board.id);
};

const removeBoard = async (id) => {
  boards = boards.filter((board) => board.id !== id);
};

const updateBoard = async (board) => {
  removeBoard(board.id);
  createBoard(board);
  return getBoard(board.id);
};

// Tasks
const getAllTasks = async (boardId) => tasks.filter(it=>it.boardId===boardId);
const getTask = async (id) => tasks.find((task) => task.id === id);
const createTask = async (task) => {
  tasks.push(task);
  return getTask(task.id);
};

const removeTask = async (id) => {
  tasks = tasks.filter((user) => user.id !== id);
};

const updateTask = async (task) => {
  removeTask(task.id);
  createTask(task);
  return getTask(task.id);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
  getAllBoards,
  getBoard,
  createBoard,
  removeBoard,
  updateBoard,
  getAllTasks,
  getTask,
  createTask,
  removeTask,
  updateTask,
};