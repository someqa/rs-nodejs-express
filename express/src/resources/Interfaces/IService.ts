export interface IServiceBasic<T> {
  getAll: (id?: string) => Promise<T[]>;
  get: (id: string) => Promise<T | undefined>;
  remove: (id: string) => Promise<void>;
}

interface IService<T> {
  getAll: (id?: string) => Promise<T[]>;
  get: (id: string) => Promise<T | undefined>;
  create: (model: T) => Promise<T | undefined>;
  remove: (id: string) => Promise<void>;
  update: (model: T) => Promise<T | undefined>;
}

export default IService;
