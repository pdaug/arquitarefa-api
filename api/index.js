import CORS from "../functions/CORS";

async function index(request, response) {

    if (request.method === "GET") {

        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();

        const database = client.db("arquitarefa")

        const collection = database.collection("test");

        const cursor = collection.find();

        const allValues = await cursor.toArray();
        
        await client.close();

        return response.status(200).json(allValues); 

    }

    return response.status(405).send("Method Not Allowed");

}

export default CORS(index);