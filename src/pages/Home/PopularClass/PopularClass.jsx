import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const PopularClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axiosSecure('/popularClasses')
            .then(res => {
                setClasses(res.data);
            })
    }, [])

    return (
        <div className='grid md:grid-cols-3 gap-4 my-8'>
            {
                classes.map(item =>
                    <div key={item._id} className="card w-full shadow-xl">
                        <figure><img className='h-56' src={item.image} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name : {item.name}</h2>
                            <div className='flex items-center justify-between'>
                                <h2 className="text-lg font-medium">Price : ${item.price}</h2>
                                <h2 className="text-lg font-medium md:mr-8">Students : {item.students}</h2>
                            </div>
                            <hr />
                            <p>Instructor : {item.instructorName}</p>
                            <p>Email : {item.instructorEmail}</p>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default PopularClass;