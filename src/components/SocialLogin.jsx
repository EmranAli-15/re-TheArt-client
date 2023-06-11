import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                const name = user.displayName;
                const email = user.email;
                const photo = user.photoURL;
                const role = 'student';
                const savedUser = { name, email, photo, role };
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => { })
                navigate('/')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div>
            <button onClick={handleLogin} className="btn w-full">
                <FcGoogle size={32}></FcGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;