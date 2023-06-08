import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { loginUser } = useAuth();

    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then(result => console.log(result.user))
            .catch(error => console.log(error.message))
    };

    const [show, setShow] = useState(false);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full relative max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: true
                                })}
                                placeholder="email"
                                className="input input-bordered"
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email?.type === 'required' && <p className='alert' role="alert">email is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={show ? 'text' : 'password'}
                                {...register("password", {
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                    required: true,
                                    minLength: 6
                                })}
                                placeholder="password"
                                className="input input-bordered"
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password?.type === 'required' && <p className='alert' role="alert">password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='alert'>Password must be 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p className='alert' role="alert">password must be an capital and special letter</p>}
                        </div>
                        <div className="form-control mt-8">
                            <button className="btn btn-primary">
                                <input type="submit" value="Login" />
                            </button>
                        </div>
                        
                    </form>
                    <div className='text-center'><SocialLogin></SocialLogin></div>
                    <button onClick={() => setShow(!show)} className='absolute right-10 top-[175px]'>
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