import faker from 'faker'

function generateMockProducts(count = 100) {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.random.alphaNumeric(10),
      price: faker.commerce.price(),
      stock: faker.random.number({ min: 0, max: 100 }),
      category: faker.commerce.department(),
      thumbnails: [faker.image.imageUrl()],
    });
  }

  return products;
}

export default generateMockProducts;
