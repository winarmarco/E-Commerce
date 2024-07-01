import { db } from "@/server/db";
import { Product } from "@prisma/client";

/**
 * Creates a new product entry in the database.
 * @param {Omit<Product, "id">} product - Product details excluding the ID.
 * @returns {Promise<Product>} A promise that resolves to the created product.
 */
export const createProduct = async (
  product: Omit<Product, "id" | "dateAdded">,
) => {
  const newProduct = await db.product.create({
    data: { ...product, dateAdded: new Date() },
  });
  return newProduct;
};

/**
 * Retrieves all products from the database.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
export const getProducts = async () => {
  const products = await db.product.findMany({});
  return products;
};

/**
 * Retrieves 2 newest products from the database.
 * @returns {Promise<Product[]>} A promise that resolves to an array of products.
 */
export const getLatestProduct = async ({ limit }: { limit: number }) => {
  const products = await db.product.findMany({
    take: limit,
    orderBy: {
      dateAdded: "desc",
    },
  });

  return products;
};

/**
 * Retrieves a single product by its ID, including category details.
 * @param {string} productId - The unique identifier of the product.
 * @returns {Promise<Product>} A promise that resolves to the product if found, otherwise throws an error.
 */
export const getProductById = async ({ productId }: { productId: string }) => {
  const product = await db.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      category: true,
    },
  });
  if (!product) throw new Error(`Product with id ${productId} not found`);
  return product;
};

/**
 * Retrieves a product by its unique product code, including category details.
 * @param {string} productCode - The product code to search for.
 * @returns {Promise<Product>} A promise that resolves to the product, if found.
 */
export const getProductByProductCode = async ({
  productCode,
}: {
  productCode: string;
}) => {
  const product = await db.product.findFirst({
    where: {
      productCode,
    },
    include: {
      category: true,
    },
  });
  return product;
};

/**
 * Retrieves products based on a search query and optional category filters.
 * @param {string} query - The search term used to filter products.
 * @param {string[]} categoryFilter - Optional array of category names to further filter the products.
 * @returns {Promise<Product[]>} A promise that resolves to an array of filtered products.
 */
export const getProductWithQuery = async ({
  query,
  categoryFilter,
}: {
  query: string;
  categoryFilter?: string[];
}) => {
  let filteredProducts;
  // Conditional logic to apply category filters and search query.
  if (categoryFilter && categoryFilter.length > 0) {
    let filter;
    if (query.length > 0) {
      filter = {
        AND: [
          {
            OR: [
              {
                name: {
                  contains: query,
                },
              },
              {
                description: {
                  contains: query,
                },
              },
            ],
          },
          {
            category: {
              categoryName: {
                in: categoryFilter,
              },
            },
          },
        ],
      };
    } else {
      filter = {
        category: {
          categoryName: {
            in: categoryFilter,
          },
        },
      };
    }

    filteredProducts = await db.product.findMany({
      where: filter,
      include: {
        category: true,
      },
    });
  } else {
    // Return all products if no specific filters are applied.
    filteredProducts = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        category: true,
      },
    });
  }
  return filteredProducts;
};

/**
 * Updates a product by its ID.
 * @param {Omit<Product, "productCode">} product - Product data to update, excluding the product code.
 * @returns {Promise<Product>} A promise that resolves to the updated product.
 */
export const updateProductById = async (
  product: Omit<Product, "productCode" | "dateAdded">,
) => {
  const { id, ...data } = product;
  const updatedProduct = await db.product.update({
    where: {
      id: product.id,
    },
    data,
  });
  return updatedProduct;
};

/**
 * Deletes a product by its ID from the database.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<Product>} A promise that resolves to the deleted product.
 */
export const deleteProductById = async ({
  productId,
}: {
  productId: string;
}) => {
  const deletedProduct = await db.product.delete({
    where: {
      id: productId,
    },
  });
  return deletedProduct;
};
