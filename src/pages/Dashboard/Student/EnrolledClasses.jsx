import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';

const EnrolledClasses = () => {


    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const [data, setData] = useState([])

    const { data: paid = [] } = useQuery({
        queryKey: ['isPaid', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/paidClass/${user?.email}`);
            return res.data;
        }
    })

    const paidClass = {
        paidClasses: paid.map(classes => classes.dbId)
    }

    useEffect(() => {
        axiosSecure.post('/paidClasses', paidClass)
            .then(data => {
                setData(data.data)
            })
    }, [paid])

    return (
        <div>
            {data.length}
        </div>
    );
};

export default EnrolledClasses;