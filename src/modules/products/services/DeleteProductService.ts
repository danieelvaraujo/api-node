import { getCustomRepository } from 'typeorm';

import ProductRepository from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { redisEnv } from '@shared/redis-env';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product now found.');
    }

    await redisCache.invalidade(redisEnv.productListKey);
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
