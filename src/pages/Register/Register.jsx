import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { createUer, updateUserProfile, logOut } = useAuth();

    const onSubmit = data => {
        console.log(data)
        setError('');
        const password = data.password;
        const confirm = data.confirmPass;
        const name = data.name;
        const email = data.email;
        const photo = data.photo;
        const role = 'student';
        const savedUser = { name, email, photo, role }

        if (password !== confirm) {
            return setError('password does not matched');
        }

        createUer(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photo)
                    .then(result => {
                        fetch('http://localhost:5000/users', {
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
                                            title: 'Your work has been saved',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    })
                                    .catch(error => { })
                            })

                    })
                navigate('/login')
            })
            .catch(error => console.log(error.message))

    };

    const [show, setShow] = useState(false);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full relative max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: true
                                })}
                                placeholder="email"
                                className="input input-bordered"
                                aria-invalid={errors.name ? "true" : "false"}
                            />
                            {errors.name?.type === 'required' && <p className='alert' role="alert">email is required</p>}
                        </div>
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type={show ? 'text' : 'password'}
                                {...register("confirmPass")}
                                placeholder="confirm password"
                                className="input input-bordered"
                            />
                            <p>{
                                error
                            }</p>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                {...register("photo", {
                                    required: true
                                })}
                                placeholder="photo URL"
                                className="input input-bordered"
                                aria-invalid={errors.photo ? "true" : "false"}
                            />
                            {errors.photo?.type === 'required' && <p className='alert' role="alert">email is required</p>}
                        </div>
                        <div className='form-control'>
                            <button className="btn btn-primary">
                                <input type="submit" value="Register" />
                            </button>
                        </div>
                    </form>
                    <button onClick={() => setShow(!show)} className='absolute right-10 top-[267px]'>
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