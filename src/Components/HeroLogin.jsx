import React from 'react';

import { Typography } from '@mui/material'
import HeroBackground from '../assets/heroLogin.png'


const HeroLogin = () => {
  return (
    <>
      <div className="image-container" style={{marginBottom: '30px'}}>
        <img src={HeroBackground} alt='Login svg' />
      </div>
      <Typography variant='h3' align='center' fontSize='35px' fontWeight='900' mb='20px'>Shop With BOLA</Typography>
      <Typography align='center' fontSize='16px' fontWeight='100' color='gray' lineHeight='20px' mb='20px'>Unleash your desired steeze goals by <br />shopping with BOLAPSD's amazing desings</Typography>
    </>
  )
}

export default HeroLogin;
