import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { Stack, Typography, } from '@mui/material';

const Success = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const [status,setStatus] = useState("")

    useEffect(()=>{
        if(searchParams.has("reference")){
            const reference = searchParams.get("reference");
            const verifyPayment = async (reference) => {
                try{
                    const {data} = await axios.post(`http://localhost:5000/api/pay/verify/${reference}`);
                    console.log(data);
                    setStatus(data.data.message)
                }catch(error){
                    console.log(error)
                }
            }
            verifyPayment(reference)
        }
    },[])

    return (
        <Stack sx={{height: "100vh",width: "100vw",display: "flex",flexDirection: "column",alignItems: "center", justifyContent: "center"}} bgcolor="#eceeee">
            {/* success */}
            <Stack sx={{bgcolor: "#fff",width: "700px",boxShadow: "0px 0px 10px gray",position: "relative"}}>
                <Stack sx={{bgcolor: "#187070",color: "white",paddingY: "20px",paddingX:"30px"}}>
                    <Typography fontSize="25px">Your payment was successful!</Typography>
                </Stack>
                <Stack sx={{padding: "30px",display: "flex",flexDirection: "column",gap: "20px",alignItems: "center"}}>
                    <Typography sx={{width: "100%"}}>Thank you for shopping with BOLAPSD. Here is a brief overview of your payment</Typography>
                    <Stack sx={{fontSize: "14px",width: "60%"}}>
                        <Typography textAlign="center" marginBottom="20px" sx={{fontWeight: "600"}}>Order Summary</Typography>
                        <Stack sx={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
                            <Typography sx={{fontSize: "14px"}}>Purchase Date:</Typography>
                            <Typography sx={{fontSize: "14px"}}>4th May, 2024</Typography>
                        </Stack>
                        <Stack sx={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
                            <Typography sx={{fontSize: "14px"}}>Amount paid:</Typography>
                            <Typography sx={{fontSize: "14px"}}>N 450,000.00</Typography>
                        </Stack>
                        <Stack sx={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
                            <Typography sx={{fontSize: "14px"}}>Referenc No: </Typography>
                            <Typography sx={{fontSize: "14px"}}>dear238yk</Typography>
                        </Stack>
                        <Stack sx={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
                            <Typography sx={{fontSize: "14px"}}>Email Address: </Typography>
                            <Typography sx={{fontSize: "14px"}}>amenedoha@gmail.com</Typography>
                        </Stack>
                    </Stack>
                    <Typography sx={{width: "100%"}}>An automated payment reciept would be sent to your mail shortly</Typography>
                    <Link to="#" style={{textDecoration: "none",color: "#187070",padding: "10px",border: "2px solid #187070",width: "fit-content",boxShadow: "0px 0px 1px #189090"}}>Back to home</Link>
                </Stack>
                <Stack sx={{height: "25px",width: "25px",bgcolor: "white",position: "absolute",top: "10px",right: "10px",borderRadius: "50%",display: "flex",justifyContent: "center",alignItems: "center"}}>
                    <Stack sx={{height: "60%",width: "60%",bgcolor: "#187070",borderRadius: "50%"}}></Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Success;