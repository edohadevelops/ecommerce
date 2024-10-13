const https = require("https");

module.exports = async(req,res) => {
    const https = require('https');

    const reference = req.params.reference;

    const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`
    }
    }

    const request = https.request(options, response => {
    let data = ''

    response.on('data', (chunk) => {
        data += chunk
    });

    response.on('end', () => {

        console.log(JSON.parse(data))
        res.status(200).send(JSON.parse(data))
    })
    }).on('error', error => {
    console.error(error);
    })
    request.end()
}