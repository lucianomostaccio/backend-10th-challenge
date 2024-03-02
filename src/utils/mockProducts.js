import { faker } from "@faker-js/faker";

function generateMockProducts(count = 100) {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric(6),
      price: faker.commerce.price({
        min: 1000,
        max: 2000,
        dec: 2,
        symbol: "$",
      }),
      stock: faker.number.int({ min: 10, max: 100 }),
      category: faker.commerce.department(),
      thumbnails: [faker.image.url({ height: 640, width: 480 })],
    });
  }

  return products;
}

export default generateMockProducts;
