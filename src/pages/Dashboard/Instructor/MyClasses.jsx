import React from 'react';
import useClasses from '../../../hooks/useClasses';

const MyClasses = () => {

    const [classes] = useClasses();

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

export default MyClasses;