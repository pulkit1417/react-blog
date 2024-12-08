//protected container for the routes that are visible only to authenticated users
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() =>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
            //TRUE && TRUE
        } else if (!authentication && authStatus !== authentication){
            navigate('/')
            //FALSE && FALSE
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return loader ? <h1>Loading...</h1> : children;
}
