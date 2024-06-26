'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
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
  id: z.string().min(5, { message: 'Id must be 5 or more characters long' }),
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

const UpdateSchema = FormSchema.omit({ id: true });

const validateFormData = (Schema: any, formData: FormData) => {
  // const Schema = isEdit ? UpdateSchema : FormSchema;
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

export async function addProduct(
  prevState: { message: any; errors: any },
  formData: FormData,
) {
  const validatedFields = validateFormData(FormSchema, formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to add new product. Please check the fields above',
    };
  }

  const {
    id,
    brand,
    name,
    short_name,
    category,
    variety,
    region,
    packaging,
    volume_ml,
    promotion_callout_text,
    promotion_discount_code,
    price_normal,
    price_current,
    price_two_for,
    price_ten_for,
    price_percent_off,
    ratings_total,
    ratings_average,
    unit_of_measure_label,
  } = validatedFields.data;

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
          ${id}, 
          ${category},
          ${variety},
          ${name},
          ${short_name},
          ${brand},         
          ${region},
          ${packaging},
          ${promotion_callout_text},
          ${promotion_discount_code} ,
          ${volume_ml},
          ${price_normal},
          ${price_current},
          ${price_two_for},
          ${price_ten_for},
          ${price_percent_off},
          ${ratings_total},
          ${ratings_average},
          ${unit_of_measure_label}
        )
    `;
  } catch (error) {
    console.log('Failed to add new product: ' + error);
    return {
      message: 'Database Error - Failed to add new product:' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }

  revalidatePath('/manage');
  redirect('/manage');
}

export async function updateProduct(
  id: string,
  prevState: { message: any },
  formData: FormData,
) {
  const validatedFields = validateFormData(UpdateSchema, formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update product. Please check the fields above',
    };
  }

  const {
    brand,
    name,
    short_name,
    category,
    variety,
    region,
    packaging,
    volume_ml,
    promotion_callout_text,
    promotion_discount_code,
    price_normal,
    price_current,
    price_two_for,
    price_ten_for,
    price_percent_off,
    ratings_total,
    ratings_average,
    unit_of_measure_label,
  } = validatedFields.data;
  // Insert data into the database
  try {
    await sql`
      UPDATE products
        SET brand = ${brand},
        name = ${name},
        short_name = ${short_name},
        category = ${category},
        variety = ${variety},
        region = ${region},
        packaging = ${packaging},
        volume_ml = ${volume_ml},
        promotion_callout_text = ${promotion_callout_text},
        promotion_discount_code = ${promotion_discount_code} ,
        price_normal = ${price_normal},
        price_current = ${price_current},
        price_two_for = ${price_two_for},
        price_ten_for = ${price_ten_for},
        price_percent_off = ${price_percent_off},
        ratings_total = ${ratings_total},
        ratings_average = ${ratings_average},
        unit_of_measure_label = ${unit_of_measure_label}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log('Failed to update product: ' + error);
    return {
      message: 'Database Error - Failed to update product:' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }

  revalidatePath('/manage');
  redirect('/manage');
}

export async function deleteProduct(id: string, prevState: { message: any }) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
  } catch (error) {
    console.log('Failed to delete product: ' + error);
    return {
      message: 'Database Error - Failed to delete product:' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }
  revalidatePath('/manage');
  redirect('/manage');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('authenticate');
    console.log(formData);

    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
