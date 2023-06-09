import React, { useState } from 'react';
import useSelected from '../../../hooks/useSelected';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SelectedClasses = () => {
    const [selected] = useSelected();
    const [axiosSecure] = useAxiosSecure();
    const [data, setData] = useState([])

    const selectedClass = {
        selectedClasses: selected.map(classes => classes.dbId)
    }

    axiosSecure.post('/selectedClasses', selectedClass)
        .then(data => {
            setData(data.data)
        })

    return (
        <div>
            {
                data.map(item => <img key={item._id} src={item.image} alt="" />)
            }
        </div>
    );
};

export default SelectedClasses;