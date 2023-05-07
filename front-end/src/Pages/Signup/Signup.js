import { useState } from "react";
import { useNavigate } from "react-router-dom";

const bcrypt = require('bcryptjs');


export const Signup = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }


    async function Inscription(e) {
        e.preventDefault();

        const hashedPassword = await bcrypt.hash(password, 13);

        const data = { username: username, email: email, password: hashedPassword };

        var url = "http://localhost:5000/users/register";

        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            credentials: 'include',
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(response => {              // On rentre ici si la requete a fonctionné quelque soit le status
            response.json().then(data => {
                if (response.status === 200) {

                    console.log(data.response.message)
                    var userNot = document.getElementById("userNot")
                    userNot.classList.add("hidden");
                    userNot = document.getElementById("user");
                    userNot.classList.remove("hidden")
                    navigate('/Profile')

                } else if (response.status === 400) {
                    console.log(data.response)
                }

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    return(
        <main className='App w-screen h-screen mt-24 flex justify-center items-center w-1/2'>
            <form onSubmit={Inscription} className="flex flex-col h-fit w-2/5 space-y-3 p-8">
                <h2 className="text-2xl text-center	">Sign in</h2>
                <div className="flex flex-col">
                    <label>Username</label>
                    <input id='input' className="text-black" type="text" onChange={handleUsernameChange} />
                </div>
                <div className="flex flex-col">
                    <label>Email Address</label>
                    <input id='input' className="text-black" type="email" onChange={handleEmailChange} />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input id='input' className="text-black" type="password" onChange={handlePasswordChange} />
                </div>
                <button className="bg-black text-white" type="submit" id="submit">Sign in</button>
            </form>

        </main>
    )
}