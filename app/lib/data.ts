import { sql } from '@vercel/postgres';
import { DataProps } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { camelise, cameliseArr } from './utils';

export async function fetchProducts() {
  // noStore() prevents the response from being cached. (good for dev) TODO
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      `;

    const products = data.rows;
    products.reverse();
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductById(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE id=${query}
      `;

    const product = data.rows[0];
    return product ? camelise(product) : undefined; // convert db column names to camel case (price_normal > priceNormal)
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch product by id.');
  }
}

export async function fetchProductsByCategoryAndVariety(
  category: string,
  variety: string,
) {
  noStore();

  console.log('fetchProductsByCategoryAndVariety');

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE category=${category} AND variety=${variety}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return cameliseArr(products); // convert db column names to camel case (price_normal > priceNormal)
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by category and variety.');
  }
}

export async function fetchProductsByCategory(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE category=${query}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return cameliseArr(products); // convert db column names to camel case (price_normal > priceNormal)
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by category.');
  }
}

export async function fetchProductsPriceTwoFor(price: number) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE priceTwoFor=${price}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products price 2 for.');
  }
}

export async function fetchProductsOnSpecial() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE priceCurrent < priceNormal
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products on special.');
  }
}

export async function fetchProductsBySearchTerm(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
    SELECT *       
    FROM products
    WHERE name ILIKE ${`%${query}%`}
    `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by search term.');
  }
}

export async function fetchProductsPriceTwoForDeals() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE priceTwoFor > 0
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products two for deals.');
  }
}

export async function fetchProductsPriceTenPercentOff() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE pricePercentOff = 10
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products ten percent off.');
  }
}

export async function fetchProductsTenAndLess() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE priceCurrent <= 10 OR priceNormal <= 10
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products ten and less.');
  }
}

export async function fetchProductsPriceTenFor100() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE priceTenFor = 100
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products ten for 100.');
  }
}
export async function fetchProductsPriceDrop() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE priceCurrent < priceNormal
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products price drop.');
  }
}

export async function fetchCarouselProducts() {
  noStore();

  // fetch 12 random products that are on sale
  try {
    const data = await sql<DataProps>`
      SELECT * FROM products 
      WHERE price_current != price_normal 
      LIMIT 12
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch carousel products.');
  }
}

export async function fetchCarouselProductsByVariety(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT * FROM products 
      WHERE variety=${query}
      LIMIT 12
      `;

    const products = data.rows;
    return cameliseArr(products);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch carousel products by variety.');
  }
}
