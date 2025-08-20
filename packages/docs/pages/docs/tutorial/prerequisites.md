# Prerequistes

In these tutorials, we'll be integrating Composify into your stack. Before we start, Composify needs a place to save and load page content. The quickest way to set up a mock API for this is with [json-server](https://github.com/typicode/json-server).

## Seed some data

**json-server** creates a REST API from a single JSON file. Let's create a `database.json` file to get started. You can name it anything you like.

```json [database.json]
{
  "documents": [
    {
      "id": "foo",
      "content": "<VStack size={{ height: 100 }} backgroundColor=\"#f8fafc\" />"
    }
  ]
}
```

- `id`: The unique identifier for your page.
- `content`: The JSX string that Composify will render.

## Run the Mock API

Now, run this command in your terminal:

```bash
npx json-server --watch database.json --port 9000
```

This spins up a REST API at `http://localhost:9000` with CORS enabled out of the box.

## Try It Out

You can now interact with your mock API.

To create a new document, run a POST request:

```bash
curl -X POST http://localhost:9000/documents \
  --data '{"id":"bar","content":"<VStack size={{ height: 200 }} backgroundColor=\"#f8fafc\" />"}'
```

To fetch it by ID:

```bash
curl http://localhost:9000/documents/bar
# [
#   {
#     "id": "bar",
#     "content": "<VStack size={{ height: 200 }} backgroundColor=\"#f8fafc\" />"
#   }
# ]
```

That's it! Now you have a working mock API, and Composify can use the `/documents` endpoint to read and write pages. You can build out the real backend later.
