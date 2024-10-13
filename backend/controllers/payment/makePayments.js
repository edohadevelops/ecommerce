const {Cart} = require("../../models/cart");
const https = require('https');

module.exports = async(req,res) => {

    const params = JSON.stringify({
    "email": "amenedoha@gmail.com",
    "amount": "5000" * 100,
    "callback_url": "http://localhost:3000/success"
    })

    const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
        'Content-Type': 'application/json'
    }
    }

    const request = https.request(options, response => {
    let data = ''

    response.on('data', (chunk) => {
        data += chunk
    });

    response.on('end', () => {
        const dataFromApi = JSON.parse(data);
        console.log("data gotten from endpoint is: ",JSON.parse(data))
        res.send({dataFromApi: JSON.parse(data),url: dataFromApi.data.authorization_url})
    })
    }).on('error', error => {
    console.error(error)
    })

    request.write(params)
    request.end()

}