export default function(request, response) {

    const body = request.body;
        
    return response.status(200).json({ body, method: request.method });

}