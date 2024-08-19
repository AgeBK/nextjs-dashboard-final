import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
//   'public/assets/img/wine', TODO:

const UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? '',
  'public/assets/img/wine',
);

console.log('UPLOAD_DIR');
console.log(process.env.ROOT_PATH);
console.log(UPLOAD_DIR);

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(
      path.resolve(UPLOAD_DIR, (body.file as File).name),
      buffer,
    );
  } else {
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
    name: (body.file as File).name,
  });
};