import { Routes, Route } from 'react-router-dom'
import Pedidos from './pages/Pedidos/Pedidos'
import Home from './pages/Home/Home'
import Carrinho from './pages/Carrinho/Carrinho'
import ProductPage from './components/ProductPage'
import Login from './pages/Login'
import Cadaster from './pages/Cadaster'


export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadaster' element={<Cadaster />} />
            <Route path='/pedidos' element={<Pedidos />} />
            <Route path='/carrinho' element={<Carrinho />} />
            <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
    )
}