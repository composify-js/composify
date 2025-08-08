import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import fs from 'fs';

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const slug = searchParams.get('slug') ?? '';
  const database = JSON.parse(fs.existsSync('database.json') ? fs.readFileSync('database.json', 'utf-8') : '{}');

  return new Response(database[slug], { status: 200 });
}

export async function action({ request }: ActionFunctionArgs) {
  const { slug, content } = await request.json();

  const database = JSON.parse(fs.existsSync('database.json') ? fs.readFileSync('database.json', 'utf-8') : '{}');

  const updatedData = {
    ...database,
    [decodeURIComponent(slug)]: content,
  };

  fs.writeFileSync('database.json', JSON.stringify(updatedData));

  return new Response('', { status: 200 });
}
