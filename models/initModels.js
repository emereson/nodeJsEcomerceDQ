import { Client } from './clientModels/client.model.js';
import { ClientOrder } from './clientModels/clientOrder.model.js';
import { Order } from './clientModels/order.model.js';
import { CategoryProduct } from './productModels/categoryProduct.model.js';
import { Product } from './productModels/product.model.js';
import { ProductDrink } from './productModels/productDrink.model.js';
import { ProductExtra } from './productModels/productExtra.model.js';
import { ProductOption } from './productModels/productOption.model.js';
import { ProductPizza } from './productModels/productPizza.model.js';
import { SectionProduct } from './productModels/sectionProduct.model.js';

const initModel = () => {
  SectionProduct.hasMany(CategoryProduct, { foreignKey: 'sectionProductId' });
  CategoryProduct.belongsTo(SectionProduct, { foreignKey: 'sectionProductId' });

  CategoryProduct.hasMany(Product, { foreignKey: 'categoryProductId' });
  Product.belongsTo(CategoryProduct, { foreignKey: 'categoryProductId' });

  Product.hasMany(ProductOption, { foreignKey: 'productId' });
  ProductOption.belongsTo(Product, { foreignKey: 'productId' });

  Product.hasMany(ProductExtra, { foreignKey: 'productId' });
  ProductExtra.belongsTo(Product, { foreignKey: 'productId' });

  Product.hasMany(ProductPizza, { foreignKey: 'productId' });
  ProductPizza.belongsTo(Product, { foreignKey: 'productId' });

  Product.hasMany(ProductDrink, { foreignKey: 'productId' });
  ProductDrink.belongsTo(Product, { foreignKey: 'productId' });

  Client.hasMany(ClientOrder, { foreignKey: 'clientId' });
  ClientOrder.belongsTo(Client, { foreignKey: 'clientId' });

  ClientOrder.hasMany(Order, { foreignKey: 'clientOrderId' });
  Order.belongsTo(ClientOrder, { foreignKey: 'clientOrderId' });
};

export { initModel };
