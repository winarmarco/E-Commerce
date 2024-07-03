import { type Product } from "@prisma/client";
import {
  createProduct,
  deleteProductById,
  getLatestProduct,
  getProductById,
  getProductByProductCode,
  getProductWithQuery,
  getProducts,
  updateProductById,
} from "./product.repository";
import { generateProductCode } from "./utils";

/**
 * Handles the creation of a new product by generating a unique product code and ensuring it is not already taken.
 * @param {Omit<Product, "id" | "productCode">} product - Details of the product to create, excluding ID and product code.
 * @returns {Promise<Product>} A promise that resolves to the newly created product.
 */
export const createNewProduct = async (
  product: Omit<Product, "id" | "productCode" | "dateAdded">,
) => {
  const { name, description, price, categoryId, imageURL } = product;
  let productCode = generateProductCode();
  let isTaken = true;

  // Loop to ensure the generated product code is unique
  while (isTaken) {
    const productWithProductCode = await getProductByProductCode({
      productCode,
    });
    if (!productWithProductCode) {
      isTaken = false;
    } else {
      productCode = generateProductCode(); // Generate a new code if taken
    }
  }

  // Create the product with all finalized details
  const newProduct = await createProduct({
    name,
    description,
    price,
    categoryId,
    imageURL,
    productCode,
  });

  return newProduct;
};

/**
 * Retrieves a specific product by its ID.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<Product>} A promise that resolves to the fetched product.
 */
export const fetchProductById = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = await getProductById({ productId });
  return product;
};

/**
 * Retrieves all products.
 * @returns {Promise<Product[]>} A promise that resolves to an array of all products.
 */
export const fetchAllProduct = async () => {
  const products = await getProducts();
  return products;
};

/**
 * Retrieves newest products.
 * @returns {Promise<Product[]>} A promise that resolves to an array of all products.
 */
export const fetchNewestProduct = async ({ limit }: { limit: number }) => {
  const products = await getLatestProduct({ limit });
  return products;
};

/**
 * Queries products based on a search term and optional category filters.
 * @param {string} query - Search query to filter products.
 * @param {string[]} categoryFilter - Optional category filters to apply.
 * @returns {Promise<Product[]>} A promise that resolves to an array of filtered products.
 */
export const queryProduct = async ({
  query,
  categoryFilter,
}: {
  query: string;
  categoryFilter?: string[];
}) => {
  const products = await getProductWithQuery({ query, categoryFilter });
  return products;
};

/**
 * Updates a product by its ID with new details.
 * @param {Omit<Product, "productCode">} product - New product details to update, excluding product code.
 * @returns {Promise<Product>} A promise that resolves to the updated product.
 */
export const updateProduct = async (
  product: Omit<Product, "productCode" | "dateAdded">,
) => {
  const { id: productId, ...data } = product;

  // Ensure product exists before attempting update
  await getProductById({ productId });

  const updatedProduct = await updateProductById({ id: productId, ...data });
  return updatedProduct;
};

/**
 * Deletes a product by its ID.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<Product>} A promise that resolves to the confirmation of deletion.
 */
export const deleteProduct = async ({ productId }: { productId: string }) => {
  // Ensure the product exists before attempting to delete
  await getProductById({ productId });

  const deletedProduct = await deleteProductById({ productId });
  return deletedProduct;
};
