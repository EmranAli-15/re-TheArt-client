import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageClasses = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const { data: classes = [] } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/adminCanGet?email=${user?.email}`);
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
                        <th>Feedback</th>
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
                            <td>
                                {classes.status}
                            </td>
                            <td>
                                {classes.students}
                            </td>
                            <td>
                                {classes.feedback ? feedback : ''}
                            </td>
                            <th>
                                <button>Edit</button>
                            </th>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageClasses;