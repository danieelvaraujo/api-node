import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomerRepository';
import CreateCustomerService from '../services/CreateCustomerService';

let fakeCustomerRepository: FakeCustomersRepository;
let createCustomerService: CreateCustomerService;

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomerRepository);
  });

  test('Should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute({
      name: 'Daniel Valente',
      email: 'danieelvaraujo@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  test('Should not be able to create a new customer if email already exists', async () => {
    await createCustomerService.execute({
      name: 'Daniel Valente',
      email: 'danieelvaraujo@gmail.com',
    });

    expect(
      createCustomerService.execute({
        name: 'Daniel Valente',
        email: 'danieelvaraujo@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
