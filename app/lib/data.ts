import { sql } from '@vercel/postgres';
import { DataProps } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProducts() {
  // Add noStore() here to prevent the response from being cached. (I think caching is good for AK Wines)
  // If you add new product and want it to show straight away, use noStore()
  noStore();
  console.log(fetch);

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      `;

    const products = data.rows;
    products.reverse();
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by category.');
  }
}

export async function fetchProductsByCat(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE category=${query}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by category.');
  }
}

export async function fetchProductsByCatAndPrice(query: string, price: number) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE category=${query}
      AND price_current<=${price}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by category.');
  }
}

export async function fetchProductById(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT 
        id,
        name,
        brand,
        short_name,
        promotion_callout_text,
        promotion_discount_code,        
        unit_of_measure_label,
        price_normal,
        price_current,
        price_ten_for,
        price_two_for,
        price_percent_off,
        volume_ml,
        ratings_total,
        ratings_average, 
        category,     
        variety,
        region,
        packaging     
      FROM products
      WHERE id=${query}
      `;

    const product = data.rows[0];
    return product;
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
      WHERE price_two_for=${price}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products by deal and price.');
  }
}

export async function fetchProductsOnSpecial() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE price_current < price_normal
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return products;
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
    console.log(products);

    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products on special.');
  }
}

export async function fetchProductsByVariety(
  category: string,
  variety: string,
) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE category=${category} AND variety=${variety}
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch products on special.');
  }
}

export async function fetchProductsPriceTwoForDeals() {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM products
      WHERE price_two_for > 0
      ORDER BY ratings_average DESC
      `;

    const products = data.rows;
    return products;
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
      WHERE price_percent_off = 10
      `;

    const products = data.rows;
    return products;
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
      WHERE price_current <= 10 OR price_normal <= 10
      `;

    const products = data.rows;
    return products;
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
      WHERE price_ten_for = 100
      `;

    const products = data.rows;
    return products;
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
      WHERE price_current < price_normal
      `;

    const products = data.rows;
    return products;
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
    return products;
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

    const carouselProducts = data.rows;
    return carouselProducts;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch carousel products by variety.');
  }
}
