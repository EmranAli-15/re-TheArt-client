import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';
import { FaMoneyCheckAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Payment from '../../Payment/Payment';

const SelectedClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const [data, setData] = useState([])

    const { data: selected = [], refetch } = useQuery({
        queryKey: ['isSelected', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/selectedClass/${user?.email}`);
            return res.data;
        }
    })

    const selectedClass = {
        selectedClasses: selected.map(classes => classes.dbId)
    }

    useEffect(() => {
        axiosSecure.post('/selectedClasses', selectedClass)
            .then(data => {
                setData(data.data)
            })
    }, [selected])

    const handleDelete = (id) => {
        const data = { id: id, email: user?.email };
        axiosSecure.post('/deleteClass', data)
            .then(data => {
                refetch()
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item =>
                                <tr key={item._id}>
                                    <th>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.instructorEmail}
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">
                                            <Link to={`/dashboard/payment/${item._id}`}>
                                                <FaMoneyCheckAlt className='text-green-500' size={20}></FaMoneyCheckAlt>
                                            </Link>
                                        </button>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs"><FaTrash className='text-red-500' size={20}></FaTrash></button>
                                    </th>
                                </tr>)
                            // [item._id, item.price]
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;