import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ClassCard from './ClassCard';
import useTitle from '../../hooks/useTitle';

const Classes = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://server-code-emranali-15.vercel.app/allClasses')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            })
    }, [])
    useTitle('Classes')
    return (
        <div className='grid md:grid-cols-4 gap-4 my-10'>
            {
                classes.map(classes =>
                    <ClassCard
                        card={classes}
                        key={classes._id}
                    ></ClassCard>)
            }
        </div>
    );
};

export default Classes;