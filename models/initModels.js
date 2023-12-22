import { CategoryProduct } from './productModels/categoryProduct.model.js';
import { Product } from './productModels/product.model.js';
import { ProductExtra } from './productModels/productExtra.model.js';
import { ProductOption } from './productModels/productOption.model.js';
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
};

export { initModel };
