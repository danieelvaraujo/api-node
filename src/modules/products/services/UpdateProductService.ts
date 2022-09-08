import { getCustomRepository } from 'typeorm';

import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { redisEnv } from '@shared/infra/redis-env';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    const productExists = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product now found.');
    }

    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidade(redisEnv.productListKey);
    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
