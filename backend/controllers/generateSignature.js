const {v2} = require("cloudinary");

v2.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
})

module.exports = async(req,res,next) =>{
    const {folder} = req.body;
    if(!folder){
        res.status(400);
        return next(new Error("Folder name is required"))
    }

    try{
        const timestamp = Math.round((new Date).getTime() / 1000);

        const signature = v2.utils.api_sign_request(
            {
                timestamp,
                folder
            }, process.env.CLOUD_API_SECRET
        )
        res.status(200).send({timestamp,signature})

    }catch(error){
        console.log(error)
        res.status(500);
        next(error);
    }

}