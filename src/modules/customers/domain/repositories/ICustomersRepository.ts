import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';
import { IListCustomer } from '../models/IListCustomer';

export interface SearchParams {
  page: number;
  skip: number;
  take: number;
}
export interface ICustomersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IListCustomer>;
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): Promise<void>;
}
