import { MongoClient } from "mongodb";

export default async function(request, response) {

    if (request.method === "GET") {

        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        const database = client.db("teste")

        const collection = database.collection("teste2");

        const cursor = collection.find();

        const allValues = await cursor.toArray();

        return response.status(200).json(allValues);

    }

    else if (request.method === "POST") {

        const body = request.body;

        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        const database = client.db("teste")

        const collection = database.collection("teste2");

        const result = await collection.insertOne(body);

        return response.status(200).json(result);

    }

    return response.status(400);

}