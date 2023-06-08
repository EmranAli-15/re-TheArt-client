import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useAuth();
    const [error, setError] = useState('');

    const onSubmit = data => {
        setError('');
        loginUser(data.email, data.password)
            .then(result => { })
            .catch(error => {
                setError('email or password not matched')
            })
    };

    const [show, setShow] = useState(false);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:w-2/4">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <p className='text-center text-red-600 text-xl'>{error}</p>
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body relative">

                        <div className="flex items-center">
                            <>Email</>
                            <>{errors.email?.type === 'required' && <p className="register-alert">required</p>}</>
                        </div>
                        <input
                            type="email"
                            {...register("email", {
                                required: true
                            })}
                            placeholder="email"
                            className="input input-bordered"
                            aria-invalid={errors.email ? "true" : "false"}
                        />


                        <div className="flex items-center">
                            <>Password</>
                            <>{errors.password?.type === 'required' && <p className="register-alert">required</p>}</>
                        </div>
                        <input
                            type={show ? 'text' : 'password'}
                            {...register("password", {
                                required: true
                            })}
                            placeholder="password"
                            className="input input-bordered"
                            aria-invalid={errors.password ? "true" : "false"}
                        />

                        <div className="form-control mt-8">
                            <button className="btn btn-primary">
                                <input type="submit" value="Login" />
                            </button>
                        </div>

                    </form>
                    <div className='px-8'><SocialLogin></SocialLogin></div>
                    <button onClick={() => setShow(!show)} className='absolute right-10 top-[165px]'>
                        {
                            show ? <BsEyeFill size={20}></BsEyeFill> :
                                <BsEyeSlashFill size={20}></BsEyeSlashFill>
                        }
                    </button>
                    <p className='text-center'>New Here ? <button className='btn btn-link'><Link to='/register'>Register</Link></button> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;