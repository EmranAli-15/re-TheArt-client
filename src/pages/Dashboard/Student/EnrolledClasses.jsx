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
        <div>
            <h1 className='text-lg md:text-4xl mt-10 mb-8 font-serif uppercase font-medium text-center'>Payment History</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th>User Email</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item =>
                                <tr key={item._id}>
                                    <td>
                                        <p className='text-lg'>{item.email}</p>
                                    </td>
                                    <td>
                                        <p className='text-lg'>{item.transactionId}</p>
                                    </td>
                                    <td className='text-lg'>{item.date}</td>
                                </tr>)
                            // [item._id, item.price]
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;