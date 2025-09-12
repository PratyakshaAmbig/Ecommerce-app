import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency ='₹';
    const delivery_fee ='10';

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const [products, setProducts] = useState([]);

    const [token, setToken] = useState('');

    const navigate = useNavigate();

    const addToCart = (itemId, size)=>{
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
             console.log("Backend URL:", backendURL);
            const response = await axios.get(`${backendURL}/api/product/list`);
            if(response.data.success){
                setProducts(response.data.products)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        getProdutsData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])

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
        setCartItems
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
