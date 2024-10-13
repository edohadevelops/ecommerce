import React, {useEffect,useState} from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';
import AfterLogin from './pages/AfterLogin';
import Store from './store/Store';
import CreateAdmin from './pages/CreateAdmin';
import Checkout from './pages/Checkout';
import Success from './Components/payment/PayDetails/success/success';

const App = () => {
    let token = "";
    useEffect(()=>{
        token = localStorage.getItem("token")
    },[])
    return (
        <Store>
            <Router>
                <Routes>
                    <Route path='/' element={token ? <AfterLogin /> : <LoginPage />} />
                    <Route path='/dashboard' element={<AfterLogin />} />
                    <Route path='/shop' element={<AfterLogin />} />
                    <Route path='/create-superadmin' element={<CreateAdmin />}></Route>
                    <Route path='/shop/checkout' element={<Checkout />}></Route>
                    <Route path="/success" element={<Success />}>
                        <Route path=":reference" element={<Success />}>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </Store>
    )
}

export default App;