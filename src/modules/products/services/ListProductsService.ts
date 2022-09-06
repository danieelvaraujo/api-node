import { getCustomRepository } from 'typeorm';

import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const redisProductListKey = 'api-vendas-PRODUCT_LIST';
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();
    let products = await redisCache.recover<Product[]>(redisProductListKey);
    if (!products) {
      products = await productsRepository.find();

      await redisCache.save(redisProductListKey, products);
    }

    return products;
  }
}

export default ListProductsService;
