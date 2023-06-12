import React from 'react';
import useAdminClasses from '../../../hooks/useAdminClasses';
import ClassCard from './ClassCard';

const ManageClasses = () => {
    const [classes] = useAdminClasses();
    return (
        <div className='grid md:grid-cols-3 gap-4'>
            {
                classes.map(card => <ClassCard card={card} key={card._id}></ClassCard>)
            }
        </div>
    );
};

export default ManageClasses;