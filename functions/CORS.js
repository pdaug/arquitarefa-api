export default function CORS(route) {

    return async function(request, response) {

        response.setHeader("Access-Control-Allow-Credentials", true);

        response.setHeader("Access-Control-Allow-Origin", "*");

        response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    
        response.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

        if (request.method === "OPTIONS") { 
            
            res.status(200).end();
            
            return;
        
        }

        return await route(request, response);

    }

}