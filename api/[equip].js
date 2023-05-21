import { MongoClient, ObjectId } from "mongodb";
import CORS from "../functions/CORS";

async function equipe(request, response) {

    const { equip } = request.query;

    if (equip) {

        if (request.method === "GET") {
        
            const client = new MongoClient(process.env.MONGODB_URI);

            await client.connect();

            const database = client.db("arquitarefa")

            const collection = database.collection(equip);

            const cursor = collection.find();

            const allValues = await cursor.toArray();
            
            await client.close();

            return response.status(200).json(allValues); 
        
        }

        else if (request.method === "POST") {

            const { category, executor, describe } = request.body;

            if (category && executor && describe) {

                const client = new MongoClient(process.env.MONGODB_URI);

                await client.connect();

                const database = client.db("arquitarefa")

                const collection = database.collection(equip);

                const result = await collection.insertOne({

                    category,

                    executor,

                    describe,

                    date: new Date()
                    
                });

                await client.close();

                if (result.insertedId)

                    return response.status(201).send("Created");

                else 

                    return response.status(500).send("Internal Server Error");

            }

            return response.status(400).send("Bad Request");

        }

        else if (request.method === "PATCH") {

            const { _id, describe } = request.body;

            if (_id && describe ) {

                const client = new MongoClient(process.env.MONGODB_URI);

                await client.connect();

                const database = client.db("arquitarefa")

                const collection = database.collection(equip);

                const filter = { "_id": new ObjectId(_id) };

                const update = {

                    $set: {

                        describe

                    }

                };

                const result = await collection.updateOne(filter, update);

                await client.close();

                if (result.modifiedCount || result.matchedCount)

                    return response.status(200).send("Ok");

                else 

                    return response.status(400).send("Bad Request");

            }

            return response.status(400).send("Bad Request");

        }
        
        else if (request.method === "PUT") {

            const { _id, category } = request.body;

            if (_id && category ) {

                const client = new MongoClient(process.env.MONGODB_URI);

                await client.connect();

                const database = client.db("arquitarefa")

                const collection = database.collection(equip);

                const filter = { "_id": new ObjectId(_id) };

                const update = {

                    $set: {

                        category

                    }

                };

                const result = await collection.updateOne(filter, update);

                await client.close();

                if (result.modifiedCount || result.matchedCount)

                    return response.status(200).send("Ok");

                else 

                    return response.status(400).send("Bad Request");

            }

            return response.status(400).send("Bad Request");

        }

        
        else if (request.method === "DELETE") {

            const { _id } = request.body;

            if (_id) {

                const client = new MongoClient(process.env.MONGODB_URI);

                await client.connect();

                const database = client.db("arquitarefa")

                const collection = database.collection(equip);

                const filter = { "_id": new ObjectId(_id) };

                const result = await collection.deleteOne(filter);
                
                await client.close();

                if (result.deletedCount)

                    return response.status(200).send("Ok");

            }

            return response.status(400).send("Bad Request");

        }

        return response.status(405).send("Method Not Allowed");

    }

    return response.status(400).send("Bad Request");

}

export default CORS(equipe);