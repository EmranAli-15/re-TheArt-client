import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin';
import useTitle from '../../hooks/useTitle';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { createUer, updateUserProfile, logOut } = useAuth();

    const onSubmit = data => {
        setError('');
        const password = data.password;
        const confirm = data.confirmPass;
        const name = data.name;
        const email = data.email;
        const photo = data.photo;
        const role = 'student';
        const savedUser = { name, email, photo, role }

        if (password !== confirm) {
            return setError('password not matched');
        }

        createUer(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photo)
                    .then(result => {
                        fetch('https://server-code-emranali-15.vercel.app/createUser', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                logOut()
                                    .then(result => {
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Account Created',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    })
                                    .catch(error => { })
                            })
                    })
                navigate('/login')
            })
            .catch(error => {
                setError('something wrong, try again')
            })

    };

    const [show, setShow] = useState(false);
    useTitle('Register')
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:w-2/4">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <p className='text-red-600 text-center text-xl'>{error}</p>
                <div className="card flex-shrink-0 w-full relative shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        <div className="flex items-center">
                            <>Name</>
                            <> {errors.name?.type === 'required' && <p className="register-alert">required</p>}</>
                        </div>
                        <input
                            type="text"
                            {...register("name", {
                                required: true
                            })}
                            placeholder="email"
                            className="input input-bordered"
                            aria-invalid={errors.name ? "true" : "false"}
                        />


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
                            <>
                                {errors.password?.type === 'required' && <p className="register-alert">required</p>}
                                {errors.password?.type === 'minLength' && <p className="register-alert">at least 6 digit</p>}
                                {errors.password?.type === 'pattern' && <p className="register-alert">need a special & capital character</p>}
                            </>
                        </div>
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


                        <div>
                            <>Confirm Password</>
                        </div>
                        <input
                            type={show ? 'text' : 'password'}
                            {...register("confirmPass")}
                            placeholder="confirm password"
                            className="input input-bordered"
                        />


                        <div className="flex items-center">
                            <>Photo URL</>
                            <>{errors.photo?.type === 'required' && <p className="register-alert">required</p>}</>
                        </div>
                        <input
                            type="text"
                            {...register("photo", {
                                required: true
                            })}
                            placeholder="photo URL"
                            className="input input-bordered"
                            aria-invalid={errors.photo ? "true" : "false"}
                        />


                        <div className='form-control'>
                            <button className="btn btn-primary">
                                <input type="submit" value="Register" />
                            </button>
                        </div>
                    </form>
                    <div className='px-8'><SocialLogin></SocialLogin></div>
                    <button onClick={() => setShow(!show)} className='absolute right-10 top-[253px]'>
                        {
                            show ? <BsEyeFill size={20}></BsEyeFill> :
                                <BsEyeSlashFill size={20}></BsEyeSlashFill>
                        }
                    </button>
                    <p className='text-center'>Have a account ? <button className='btn btn-link'><Link to='/login'>login</Link></button> </p>
                </div>
            </div>
        </div>
    );
};

export default Register;