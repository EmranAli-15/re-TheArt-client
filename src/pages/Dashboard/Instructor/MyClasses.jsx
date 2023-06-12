import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import { FaEdit } from "react-icons/fa";

const MyClasses = () => {

    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const { data: classes = [] } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/instructorClasses?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="overflow-x-auto md:p-2">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Students</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map(classes => <tr key={classes._id}>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={classes.image} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={`${classes.status === 'denied' ? 'text-red-500' : ''} text-[16px]`}>
                                {classes.status}
                            </td>
                            <td>
                                {classes.students}
                            </td>
                            <th>
                                <button>
                                    <FaEdit className='text-info' size={30}></FaEdit>
                                </button>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyClasses;