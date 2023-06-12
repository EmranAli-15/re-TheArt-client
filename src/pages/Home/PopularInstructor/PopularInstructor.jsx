import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PopularInstructor = () => {
    const [axiosSecure] = useAxiosSecure();
    const [instructor, setInstructor] = useState([]);

    useEffect(() => {
        axiosSecure('/popularInstructors')
            .then(res => {
                setInstructor(res.data);
            })
    }, [])
    return (
        <div>
            <h1 className='text-lg md:text-4xl mt-20 mb-8 font-serif uppercase font-medium text-center'>Popular Instructor</h1>
            <div className='my-8 grid md:grid-cols-3 gap-4'>
                {
                    instructor.map(man =>
                        <div key={man._id} className="card w-full bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={man.photo} alt="Shoes" className="rounded-xl h-40 w-56" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{man.name}</h2>
                                <p>{man.email}</p>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructor;