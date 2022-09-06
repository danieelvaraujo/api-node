import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';
import { redisEnv } from '@shared/redis-env';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidade(redisEnv.productListKey);
    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
