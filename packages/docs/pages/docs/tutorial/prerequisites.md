# Prerequistes

In this guide, we'll integrate Composify into your stack. Before Composify can render anything, it needs endpoints to save and load page documents. The quickest way to mock those is with [json-server](https://github.com/typicode/json-server).

## Seed some data

**json-server** infers its schema from an initial JSON file. Create a `database.json` (name can be anything) with a documents collection:

```json [database.json]
{
  "documents": [
    {
      "id": "1",
      "slug": "/foo",
      "content": "<VStack size={{ height: 100 }} backgroundColor=\"#f8fafc\" />"
    }
  ]
}
```

- `id`: json-server will auto-generate one if you omit it.
- `slug`: your page identifier (e.g. route path).
- `content`: a JSX string Composify will render.

## Run the mock API

```bash
npx json-server --watch database.json --port 9000
```

This gives you a REST API at `http://localhost:9000` with CORS enabled out of the box.

## Try it out

Create a new document:

```bash
curl -X POST http://localhost:9000/documents \
  --data '{"id":"/bar","content":"<VStack size={{ height: 200 }} backgroundColor=\"#f8fafc\" />"}'
```

Fetch by slug:

```bash
curl http://localhost:9000/documents/%20bar
# [
#   {
#     "id": "/bar",
#     "content": "<VStack size={{ height: 200 }} backgroundColor=\"#f8fafc\" />"
#   }
# ]
```

That's it. Composify can now hit `/documents` to read and write pages while you build the real backend later.
