import React from 'react';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Common = () => {
    useTitle('Dashboard')
    const { user } = useAuth();
    return (
        <div>
            <h2 className='flex flex-col items-center uppercase md:text-5xl'>
                <p>WELCOME</p>
                <hr className='my-4 w-full' />
                <p className='font-serif'>{user?.displayName}</p>
            </h2>
        </div>
    );
};

export default Common;