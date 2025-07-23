import { AppDataSource } from "../config/typeorm.config.js";
import { Product } from "../module/product/entity/product.entity.js";
import { Category } from "../module/category/entity/category.entity.js";

export const seedProducts = async () => {
  const productRepo = AppDataSource.getRepository(Product);
  const categoryRepo = AppDataSource.getRepository(Category);

  const electronicsCategory = await categoryRepo.findOne({ where: { slug: "electronics" } });
  if (!electronicsCategory) throw new Error("Category 'electronics' not found. Seed categories first!");

  const products = [
    {
      name: "iPhone 14",
      slug: "iphone-14",
      description: "Latest Apple iPhone 14",
      price: 999.99,
      category_id: electronicsCategory.id,
      is_active: true,
    },
    {
      name: "MacBook Air M2",
      slug: "macbook-air-m2",
      description: "Apple MacBook Air with M2 chip",
      price: 1299.00,
      category_id: electronicsCategory.id,
      is_active: true,
    },
  ];

  for (const p of products) {
    const exists = await productRepo.findOne({ where: { slug: p.slug } });
    if (!exists) {
      await productRepo.save(productRepo.create(p));
    }
  }

  console.log("Seeded products successfully");
};

AppDataSource.initialize()
  .then(() => seedProducts())
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding products failed", err);
    process.exit(1);
  });