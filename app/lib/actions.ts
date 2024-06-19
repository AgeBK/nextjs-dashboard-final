'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const minStr1 = z
  .string()
  .min(1, { message: 'Must be 1 or more characters long' });
const gt0 = z
  .number()
  .gt(0, { message: 'Please enter an amount greater than 0.' });
const nonNeg = z.coerce.number().nonnegative();

const FormSchema = z.object({
  id: z.string().min(5, { message: 'Id Must be 5 or more characters long' }),
  brand: minStr1,
  name: minStr1,
  short_name: minStr1,
  category: minStr1,
  variety: minStr1,
  region: minStr1,
  packaging: minStr1,
  promotion_callout_text: z.string(),
  promotion_discount_code: z.string(),
  price_normal: gt0,
  price_current: gt0,
  volume_ml: gt0,
  price_two_for: nonNeg,
  price_ten_for: nonNeg,
  price_percent_off: nonNeg,
  ratings_total: nonNeg,
  ratings_average: nonNeg,
  unit_of_measure_label: z.string(),
});

const validateFormData = (formData: FormData, isEdit: boolean) => {
  const Schema = isEdit ? UpdateSchema : FormSchema;
  return Schema.safeParse({
    id: formData.get('id'),
    brand: formData.get('brand'),
    name: formData.get('name'),
    short_name: formData.get('short_name'),
    category: formData.get('category'),
    variety: formData.get('variety'),
    region: formData.get('region'),
    packaging: formData.get('packaging'),
    promotion_callout_text: formData.get('promotion_callout_text'),
    promotion_discount_code: formData.get('promotion_discount_code'),
    price_normal: Number(formData.get('price_normal')),
    volume_ml: Number(formData.get('volume_ml')),
    price_current: Number(formData.get('price_current')),
    price_two_for: Number(formData.get('price_two_for')),
    price_ten_for: Number(formData.get('price_ten_for')),
    price_percent_off: Number(formData.get('price_percent_off')),
    ratings_total: Number(formData.get('ratings_total')),
    ratings_average: Number(formData.get('ratings_average')),
    unit_of_measure_label: formData.get('unit_of_measure_label'),
  });
};

const UpdateSchema = FormSchema.omit({ id: true });

export async function addProduct(
  prevState: { message: any; errors: any },
  formData: FormData,
) {
  console.log('add Product');

  const validatedFields = validateFormData(formData, false);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to add new product. Please check the fields above',
    };
  }

  const data = validatedFields.data;
  console.log(data);

  // Insert data into the database
  try {
    await sql`
      INSERT INTO "products" (
        "id",
        "category",
        "variety",
        "name",
        "short_name",
        "brand",       
        "region",     
        "packaging",
        "promotion_callout_text" ,
        "promotion_discount_code",
        "volume_ml" ,
        "price_normal",
        "price_current",
        "price_two_for",
        "price_ten_for",
        "price_percent_off",
        "ratings_total",
        "ratings_average",        
        "unit_of_measure_label" )

        VALUES(
          ${data.id}, 
          ${data.category},
          ${data.variety},
          ${data.name},
          ${data.short_name},
          ${data.brand},         
          ${data.region},
          ${data.packaging},
          ${data.promotion_callout_text},
          ${data.promotion_discount_code} ,
          ${data.volume_ml},
          ${data.price_normal},
          ${data.price_current},
          ${data.price_two_for},
          ${data.price_ten_for},
          ${data.price_percent_off},
          ${data.ratings_total},
          ${data.ratings_average},
          ${data.unit_of_measure_label}
        )
    `;
  } catch (error) {
    console.log('error: ' + error);

    return {
      message: 'Database Error: Failed to update Product Table.' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/manage');
  redirect('/manage');
}

export async function updateProduct(
  id: string,
  prevState: { message: any },
  formData: FormData,
) {
  console.log('updateProduct: ' + id);

  const validatedFields = validateFormData(formData, true);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update product. Please check the fields above',
    };
  }

  const data = validatedFields.data;
  console.log(data); // TODO: destructure
  // Insert data into the database
  try {
    await sql`
      UPDATE products
        SET brand = ${data.brand},
        name = ${data.name},
        short_name = ${data.short_name},
        category = ${data.category},
        variety = ${data.variety},
        region = ${data.region},
        packaging = ${data.packaging},
        volume_ml = ${data.volume_ml},
        promotion_callout_text = ${data.promotion_callout_text},
        promotion_discount_code = ${data.promotion_discount_code} ,
        price_normal = ${data.price_normal},
        price_current = ${data.price_current},
        price_two_for = ${data.price_two_for},
        price_ten_for = ${data.price_ten_for},
        price_percent_off = ${data.price_percent_off},
        ratings_total = ${data.ratings_total},
        ratings_average = ${data.ratings_average},
        unit_of_measure_label = ${data.unit_of_measure_label}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to update Product Table.' + error,
    };
  }

  revalidatePath('/manage');
  redirect('/manage');
}

export async function deleteProduct(id: string, prevState: { message: any }) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
  } catch (error) {
    return {
      message: `Database Error: Failed to delete product ${id} from the Product Table. ${error}`,
    };
  }
  revalidatePath('/manage');
  redirect('/manage');
}
