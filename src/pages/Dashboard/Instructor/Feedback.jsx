import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Feedback = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axiosSecure(`/deniedClasses/${user?.email}`)
            .then(res => {
                setClasses(res.data)
            })
    }, [user])

    return (
        <div>
            <h1 className='text-lg md:text-4xl my-4 font-serif uppercase font-medium text-center'>Feedback</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            classes.map(item =>
                                <tr key={item._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-[16px]'>
                                        {item.name}
                                    </td>
                                    <td className='text-[16px]'>
                                        {item.details}
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Feedback;