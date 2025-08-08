import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get('slug') ?? '';
  const database = JSON.parse(fs.existsSync('database.json') ? fs.readFileSync('database.json', 'utf-8') : '{}');

  return new NextResponse(database[slug], {
    status: 200,
  });
}

export async function POST(request: Request) {
  const { slug, content } = await request.json();

  const database = JSON.parse(fs.existsSync('database.json') ? fs.readFileSync('database.json', 'utf-8') : '{}');

  const updatedData = {
    ...database,
    [decodeURIComponent(slug)]: content,
  };

  fs.writeFileSync('database.json', JSON.stringify(updatedData));

  revalidatePath(slug);

  return new NextResponse('', {
    status: 200,
  });
}
