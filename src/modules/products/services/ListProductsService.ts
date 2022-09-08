import { getCustomRepository } from 'typeorm';

import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';
import { redisEnv } from '@shared/infra/redis-env';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();
    let products = await redisCache.recover<Product[]>(redisEnv.productListKey);
    if (!products) {
      products = await productsRepository.find();

      await redisCache.save(redisEnv.productListKey, products);
    }

    return products;
  }
}

export default ListProductsService;
