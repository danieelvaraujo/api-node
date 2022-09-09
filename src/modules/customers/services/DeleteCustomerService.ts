import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
