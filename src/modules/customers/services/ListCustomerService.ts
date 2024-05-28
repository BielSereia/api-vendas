import { getCustomRepository } from 'typeorm';
import { Costumer } from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

export class ListCustomerService {
  public async execute(): Promise<Costumer[]> {
    const costumersRepository = getCustomRepository(CustomersRepository);

    const customers = await costumersRepository.find();

    return customers;
  }
}
