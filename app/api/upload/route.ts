import { NextRequest, NextResponse } from 'next/server';
import data from '@/app/lib/appData.json';
import path from 'path';
import fs from 'fs';

export const POST = async (req: NextRequest) => {
  const { imgWineUploadPath } = data;
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
  const UPLOAD_DIR = path.resolve(
    process.env.ROOT_PATH ?? '',
    imgWineUploadPath,
  );

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
