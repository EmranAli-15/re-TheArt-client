import React from 'react';
import useAuth from '../../hooks/useAuth'
import useStudent from '../../hooks/useStudent'

const ClassCard = ({ card }) => {
    const { image, name, instructorName, seats, price, _id } = card;
    const { user } = useAuth();
    const [isStudent] = useStudent()
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img className='h-52' src={image} /></figure>
            <div className="card-body">
                <div className='flex items-center justify-between'>
                    <h2 className="card-title">{name}</h2>
                    <h3 className='text-lg md:pr-4'>Price : $ {price}</h3>
                </div>
                <p className='text-lg'>Instructor : {instructorName}</p>
                <p className='text-lg'>Available Seats : <span className='font-semibold'>{seats}</span></p>
                <hr />
                <div className="card-actions justify-end">
                    <button disabled={!isStudent} className="btn btn-info">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;