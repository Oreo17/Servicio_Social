const customHeaders = (req, res, next) =>{
    try{
        const apiKey = req.headers.apiKey;
        if(apiKey == "hola"){
            next();
        }else{
            res.status(403);
            res.send({message: "API_KEY is required"})
        }
    }catch(err){
        res.status(403);
        res.send({message: "ERROR_CUSTOM_HEADERS"})
    }
}

module.exports = customHeaders;