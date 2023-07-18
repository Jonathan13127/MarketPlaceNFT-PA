import './Login.css'
import { useState } from 'react';
import { urlBase } from "../../Informations"

import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';


export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState('')


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    async function Connexion(e) {
        e.preventDefault();

        const data = { email: email, password: password };

        var url = urlBase+"users/login";

        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header

        }).then(response => {               // On rentre ici si la requete a fonctionné quelque soit le status
            response.json().then(data => {
                if (response.status === 200) {

                    console.log(data.response.message)
                    setMessage(data.response.message)
                    var userNot = document.getElementById("userNot");
                    console.log(userNot)
                    userNot.classList.add("hidden");
                    userNot = document.getElementById("user");
                    userNot.classList.remove("hidden")
                    navigate('/Profile')

                } else if (response.status === 400) {
                    console.log(data.response)
                    setMessage(data.response.message)
                }

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    return (
        <main className='App w-screen h-screen mt-24 flex justify-center items-center w-1/2'>
            <form onSubmit={Connexion} className="flex flex-col h-fit w-2/5 space-y-3 p-8">
                <h2 className="text-2xl text-center	">Log in</h2>
                <div className="flex flex-col">
                    <TextField sx={{ input: { color: 'white' }, label : {color:'white'} }} id="standard-basic" label="Email Address" variant="standard" onChange={handleEmailChange} type='email' />
                </div>
                <div className="flex flex-col">
                    <TextField sx={{ input: { color: 'white' }, label : {color:'white'} }} id="standard-basic" label="Password" variant="standard" onChange={handlePasswordChange} type='password' />
                </div>
                <button className="bg-black text-white" type="submit" id="submit">Log in</button>
            </form>
            {message &&
            <div>
                {message}
            </div>
            }
        </main>
    )
}