import { useState, createContext, useEffect } from 'react';

import axios from 'axios';
import { parseJwt } from '../../utils/parseJwt';



export const UserContext = createContext();



export const UserProvider = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {

        const token = localStorage.getItem('token');
        const parseToken = parseJwt(token);
        axios.get(`http://localhost:5000/getprofile/${parseToken?.user._id}`).then(function (result) {
            setUser(result.data)
            console.log(result.data)
        })
    }, [])



    return (

        <UserContext.Provider value={[user, setUser]}>

            {props.children}

        </UserContext.Provider>

    )

}