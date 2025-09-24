import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency ='₹';
    const delivery_fee ='10';

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const location = useLocation();

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const [products, setProducts] = useState([]);

    const [token, setToken] = useState(localStorage.getItem('user_token') ? localStorage.getItem('user_token') :'');

    const navigate = useNavigate();

    const addToCart = async(itemId, size)=>{
        if(!size){
            toast.error('Select Product Size');
            return
        }
        // We have to copy the cartItems
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1;
            }else{
                cartData[itemId][size] =1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }

        setCartItems(cartData)

        if(token){
            try {
                const response = await axios.post(`${backendURL}/api/cart/add`, {itemId,size},{headers:{token}});
                if(response.data.success){
                    toast.success(response.data.message);
                }else{
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                return toast.error(error.message);
            }
        }

    }

    const getCartCount = () =>{
        let totalCount =0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount +=cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);

        cartData[itemId][size]=quantity;   

        setCartItems(cartData)

        if(token){
            try {
                const response = await axios.patch(`${backendURL}/api/cart/update`,{itemId,size,quantity},{headers:{token}});
            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
            } catch (error) {
                console.log(error);
                return toast.error(error.message);
            }
        }
    }

    const getCartAmout = ()=>{
        let totalAmout = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmout += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmout;
    }

    const getProdutsData = async()=>{
        try {
            const response = await axios.get(`${backendURL}/api/product/list`,);
            if(response.data.success){
                setProducts(response.data.products)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const getUserCartData = async(token)=>{
        try {
            const response = await axios.get(`${backendURL}/api/cart/getcartdata`,{headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData);
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
             console.log(error);
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        getProdutsData();
    },[])

    // useEffect(()=>{
    //     if(!token && localStorage.getItem('user_token')){
    //         setToken(localStorage.getItem('user_token'))
    //     }
    // },[])

    useEffect(()=>{
        getUserCartData(token)
    },[token])

    const value ={
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmout,
        navigate,
        backendURL,
        setToken,
        token,
        setCartItems,
        location
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
