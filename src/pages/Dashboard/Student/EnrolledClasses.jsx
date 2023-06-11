import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';

const EnrolledClasses = () => {

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [data, setData] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/paidClasses/${user?.email}`)
            .then(data => {
                setData(data.data)
            })
    }, [user])

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item =>
                            <tr key={item._id}>
                                <td>
                                    <p className='text-lg'>{item.price}</p>
                                </td>
                                <td className='text-lg'>{item.date}</td>
                            </tr>)
                        // [item._id, item.price]
                    }
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledClasses;