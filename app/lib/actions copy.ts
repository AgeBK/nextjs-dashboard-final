'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { FormStateProps, SchemaProps } from './definitions';

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
  shortName: minStr1,
  category: minStr1,
  variety: minStr1,
  region: minStr1,
  packaging: minStr1,
  promotionCalloutText: z.string(),
  promotionDiscountCode: z.string(),
  priceNormal: gt0,
  priceCurrent: gt0,
  volumeMl: gt0,
  priceTwoFor: nonNeg,
  priceTenFor: nonNeg,
  pricePercentOff: nonNeg,
  ratingsTotal: nonNeg,
  ratingsAverage: nonNeg,
  unitOfMeasureLabel: z.string(),
});

const UpdateSchema = FormSchema.omit({ id: true });

const validateFormData = (Schema: SchemaProps, formData: FormData) => {
  return Schema.safeParse({
    id: formData.get('id'),
    brand: formData.get('brand'),
    name: formData.get('name'),
    shortName: formData.get('shortName'),
    category: formData.get('category'),
    variety: formData.get('variety'),
    region: formData.get('region'),
    packaging: formData.get('packaging'),
    promotionCalloutText: formData.get('promotionCalloutText'),
    promotionDiscountCode: formData.get('promotionDiscountCode'),
    volumeMl: Number(formData.get('volumeMl')),
    priceCurrent: Number(formData.get('priceCurrent')),
    priceTwoFor: Number(formData.get('priceTwoFor')),
    priceTenFor: Number(formData.get('priceTenFor')),
    pricePercentOff: Number(formData.get('pricePercentOff')),
    ratingsTotal: Number(formData.get('ratingsTotal')),
    ratingsAverage: Number(formData.get('ratingsAverage')),
    unitOfMeasureLabel: formData.get('unitOfMeasureLabel'),
  });
};

export async function addProduct(
  prevState: FormStateProps,
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
    shortName,
    category,
    variety,
    region,
    packaging,
    volumeMl,
    promotionCalloutText,
    promotionDiscountCode,
    priceNormal,
    priceCurrent,
    priceTwoFor,
    priceTenFor,
    pricePercentOff,
    ratingsTotal,
    ratingsAverage,
    unitOfMeasureLabel,
  } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO "products" (
        "id",
        "category",
        "variety",
        "name",
        "shortName",
        "brand",       
        "region",     
        "packaging",
        "promotionCalloutText" ,
        "promotionDiscountCode",
        "volumeMl" ,
        "priceNormal",
        "priceCurrent",
        "priceTwoFor",
        "priceTenFor",
        "pricePercentOff",
        "ratingsTotal",
        "ratingsAverage",        
        "unitOfMeasureLabel" )

        VALUES(
          ${id}, 
          ${category},
          ${variety},
          ${name},
          ${shortName},
          ${brand},         
          ${region},
          ${packaging},
          ${promotionCalloutText},
          ${promotionDiscountCode} ,
          ${volumeMl},
          ${priceNormal},
          ${priceCurrent},
          ${priceTwoFor},
          ${priceTenFor},
          ${pricePercentOff},
          ${ratingsTotal},
          ${ratingsAverage},
          ${unitOfMeasureLabel}
        )
    `;
  } catch (error) {
    console.log('Failed to add new product: ' + error);
    return {
      message: 'Database Error - Failed to add new product:' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }
  return {
    success: true,
  };
}

export async function updateProduct(
  id: string,
  prevState: { message: unknown },
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
    shortName,
    category,
    variety,
    region,
    packaging,
    volumeMl,
    promotionCalloutText,
    promotionDiscountCode,
    priceNormal,
    priceCurrent,
    priceTwoFor,
    priceTenFor,
    pricePercentOff,
    ratingsTotal,
    ratingsAverage,
    unitOfMeasureLabel,
  } = validatedFields.data;
  // Insert data into the database
  try {
    await sql`
      UPDATE products
        SET brand = ${brand},
        name = ${name},
        shortName = ${shortName},
        category = ${category},
        variety = ${variety},
        region = ${region},
        packaging = ${packaging},
        volumeMl = ${volumeMl},
        promotionCalloutText = ${promotionCalloutText},
        promotionDiscountCode = ${promotionDiscountCode} ,
        priceNormal = ${priceNormal},
        priceCurrent = ${priceCurrent},
        priceTwoFor = ${priceTwoFor},
        priceTenFor = ${priceTenFor},
        pricePercentOff = ${pricePercentOff},
        ratingsTotal = ${ratingsTotal},
        ratingsAverage = ${ratingsAverage},
        unitOfMeasureLabel = ${unitOfMeasureLabel}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.log('Failed to update product: ' + error);
    return {
      message: 'Database Error - Failed to update product:' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }
  return {
    success: true,
  };
}

export async function deleteProduct(id: string) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return {
      success: true,
    };
  } catch (error) {
    console.log('Failed to delete product: ' + error);
    return {
      message: 'Database Error - Failed to delete product:' + error,
      errors: JSON.parse(JSON.stringify(error)),
    };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    return 'success';
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
