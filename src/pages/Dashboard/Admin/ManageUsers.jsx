import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const ManageUsers = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()

    const { data: users = [] } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/adminCanGetAllUsers?email=${user?.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <h3>
                {
                    users.length
                }
            </h3>
        </div>
    );
};

export default ManageUsers;