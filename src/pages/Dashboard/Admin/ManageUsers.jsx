import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { FaChessPawn, FaChessQueen, FaUserAlt } from "react-icons/fa";

const ManageUsers = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const admin = <FaChessQueen size={20} className='text-green-500'></FaChessQueen>
    const instructor = <FaChessPawn size={20} className='text-blue-500'></FaChessPawn>
    const userAlt = <FaUserAlt size={20}></FaUserAlt>

    const { data: users = [], refetch } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/adminCanGetAllUsers?email=${user?.email}`);
            return res.data;
        }
    })

    const handleAuthorization = (data) => {
        axiosSecure.patch('/authorization', data)
            .then(data => {
                console.log(data.data)
                refetch();
            })
    }

    const handleInstructor = (id) => {
        console.log(id);
        const user = { role: 'instructor', id: id };
        handleAuthorization(user)
    }

    const handleAdmin = (id) => {
        const user = { role: 'admin', id: id };
        handleAuthorization(user)
    }


    return (
        <div>
            <div className='flex justify-center items-center gap-x-12 mb-10'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg font-medium'>Admin</h2>
                    <p className='bg-gray-300 p-4 rounded-xl'>{admin}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg font-medium'>Instructor</h2>
                    <p className='bg-gray-300 p-4 rounded-xl'>{instructor}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg font-medium'>User</h2>
                    <p className='bg-transparent p-4 rounded-xl'>{userAlt}</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg'>
                            <th>Photo</th>
                            <th>Name/Email</th>
                            <th>Role</th>
                            <th>Instructor</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((users, index) => 
                            <tr key={users._id}  className={`${user.email === users.email && 'bg-yellow-100 rounded'}`}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={users.photo} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {users.name}
                                    <br />
                                    <p>{users.email}</p>
                                </td>
                                <th>
                                    {users.role === 'admin' && admin || users.role === 'instructor' && instructor || userAlt}
                                </th>
                                <th>
                                    <button onClick={() => handleInstructor(users._id)} disabled={users.role === 'instructor'} className="btn btn-ghost btn-xs">
                                        {users.role === 'instructor' ? instructor : instructor}
                                    </button>
                                </th>
                                <th>
                                    <button onClick={() => handleAdmin(users._id)} disabled={users.role === 'admin'} className="btn btn-ghost btn-xs">
                                        {users.role === 'admin' ? admin : admin}
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;