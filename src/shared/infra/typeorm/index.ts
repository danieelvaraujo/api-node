import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1662064952906 } from './migrations/1662064952906-CreateProducts';
import { CreateUsers1662076885931 } from './migrations/1662076885931-CreateUsers';
import { CreateUsersToken1662127568906 } from './migrations/1662127568906-CreateUsersToken';
import { CreateCustomers1662385500973 } from './migrations/1662385500973-CreateCustomers';
import { CreateOrders1662402314938 } from './migrations/1662402314938-CreateOrders';
import { AddCustomersIdToOrders1662402429484 } from './migrations/1662402429484-AddCustomersIdToOrders';
import { CreateOrdersProducts1662411921779 } from './migrations/1662411921779-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1662412125446 } from './migrations/1662412125446-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1662412308379 } from './migrations/1662412308379-AddProductIdToOrdersProducts';
import { AddOrderFieldtoOrders1619889809717 } from './migrations/1662733433152-AddOrderFieldToOrders';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1662064952906,
    CreateUsers1662076885931,
    CreateUsersToken1662127568906,
    CreateCustomers1662385500973,
    CreateOrders1662402314938,
    AddCustomersIdToOrders1662402429484,
    CreateOrdersProducts1662411921779,
    AddOrderIdToOrdersProducts1662412125446,
    AddProductIdToOrdersProducts1662412308379,
    AddOrderFieldtoOrders1619889809717,
  ],
});
