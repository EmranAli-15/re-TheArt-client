import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';
import { FaMoneyCheckAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/deleteClass', data)
                    .then(data => {
                        refetch()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
            }
        })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='text-lg'>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Seats</th>
                            <th>Enroll</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item =>
                                <tr key={item._id}>
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
                                        <p className='text-lg'>$ {item.price}</p>
                                    </td>
                                    <td className='text-lg'>{item.seats}</td>
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