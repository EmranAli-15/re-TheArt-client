import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const EnrolledClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const [paidClasses, setPaidClasses] = useState([]);
    axiosSecure(`/paidClass/${user?.email}`)
        .then(res => {
            setPaidClasses(res.data);
        })
    return (
        <div>
            {
                paidClasses.length
            }
        </div>
    );
};

export default EnrolledClasses;