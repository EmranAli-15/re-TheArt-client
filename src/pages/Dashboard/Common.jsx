import React from 'react';
import useAuth from '../../hooks/useAuth';

const Common = () => {
    const {user} = useAuth();
    return (
        <div>
            <h2 className='flex flex-col items-center uppercase md:text-5xl'>
                <p>WELCOME <br /> <hr className='my-4'/></p>
                <p className='font-serif'>{user?.displayName}</p>
            </h2>
        </div>
    );
};

export default Common;