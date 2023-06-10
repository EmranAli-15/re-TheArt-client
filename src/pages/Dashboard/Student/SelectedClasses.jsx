import React, { useEffect, useState } from 'react';
import useSelected from '../../../hooks/useSelected';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';

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
                console.log(data.data);
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
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
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
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SelectedClasses;