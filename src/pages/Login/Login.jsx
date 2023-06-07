import React from 'react';
import { useForm } from "react-hook-form";

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email",
                                    { required: true })}
                                placeholder="email"
                                className="input input-bordered"
                                aria-invalid={errors.firstName ? "true" : "false"}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <h2>register todo</h2>
                </div>
            </div>
        </div>
    );
};

export default Login;