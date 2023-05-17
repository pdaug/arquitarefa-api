import { MongoClient, ObjectId } from "mongodb";

export default async function(request, response) {

    if (request.method === "GET") {

        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        const database = client.db("arquitarefa")

        const collection = database.collection("test");

        const cursor = collection.find();

        const allValues = await cursor.toArray();

        return response.status(200).json(allValues);

    }

    else if (request.method === "POST") {

        const { category, executor, describe } = request.body;

        if (category && executor && describe) {

            const client = new MongoClient(process.env.MONGODB_URI);

            await client.connect();

            const database = client.db("arquitarefa")

            const collection = database.collection("test");

            const result = await collection.insertOne({
                category,
                executor,
                describe,
                date: new Date()
            });

            return response.status(200).json(result);

        }

        return response.status(400).send("Bad Request");

    }
    
    else if (request.method === "PUT") {

        const { _id, category } = request.body;

        if (_id && category ) {

            const client = new MongoClient(process.env.MONGODB_URI);

            await client.connect();

            const database = client.db("arquitarefa")

            const collection = database.collection("test");

            const filter = { "_id": new ObjectId(_id) };

            const update = {
                $set: {
                    category
                }
            };

            const result = await collection.updateOne(filter, update);

            return response.status(200).json(result);

        }

        return response.status(400).send("Bad Request");

    }

    
    else if (request.method === "DELETE") {

        const { _id } = request.body;

        if (_id ) {

            const client = new MongoClient(process.env.MONGODB_URI);

            await client.connect();

            const database = client.db("arquitarefa")

            const collection = database.collection("test");

            const filter = { "_id": new ObjectId(_id) };

            const result = await collection.deleteOne(filter);

            return response.status(200).json(result);

        }

        return response.status(400).send("Bad Request");

    }

    return response.status(405).send("Method Not Allowed");

}