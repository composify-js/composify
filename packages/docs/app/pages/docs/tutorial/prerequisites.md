# Prerequisites

In these tutorials, we will simulate a real-world integration. First, we need a place to store your page layouts.

We use [json-server](https://github.com/typicode/json-server) in this guide for a quick, zero-config setup. In a production environment, you can use PostgreSQL, MySQL, MongoDB, or any persistent storage you prefer. The only requirement is the ability to store and retrieve simple text strings.

## 1. Setup Mock DB

Create a `database.json` file. This acts as your database. Note that the content field stores raw JSX strings, exactly as a developer would write them.

```json
{
  "documents": [
    {
      "id": "foo",
      "content": "<VStack backgroundColor=\"#f8fafc\" />"
    }
  ]
}
```

## 2. Run the Mock API

Run the following command to start the API server:

```bash
npx json-server --watch database.json --port 9000
```

Your database is now accessible at `http://localhost:9000/documents`.

## 3. Verify & Test

You can check if it's working by querying the data:

```bash
curl http://localhost:9000/documents/foo
```

or adding new data:

```bash
curl -X POST http://localhost:9000/documents \
  -H "Content-Type: application/json" \
  -d '{
    "id": "bar",
    "content": "<VStack><Heading level={2}>About Us</Heading></VStack>"
  }'
```

Now you have a backend ready to store your server-driven UI layouts.
