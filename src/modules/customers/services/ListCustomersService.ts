import { inject, injectable } from 'tsyringe';

import { IListCustomer } from '../domain/models/IListCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface SearchParams {
  page: number;
  limit: number;
}
@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({ page, limit }: SearchParams): Promise<IListCustomer> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomersService;
