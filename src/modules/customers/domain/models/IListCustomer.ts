import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export interface IListCustomer {
  per_page: number;
  total: number;
  current_page: number;
  data: Customer[];
}
