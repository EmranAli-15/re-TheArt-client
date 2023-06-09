import React from 'react';
import useAuth from '../../hooks/useAuth'
import useStudent from '../../hooks/useStudent'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ClassCard = ({ card }) => {
    const { image, name, instructorName, seats, price, _id } = card;
    const { user } = useAuth();
    const [isStudent] = useStudent()
    const [axiosSecure] = useAxiosSecure();

    const handleSelected = (card) => {
        const dbId = card._id;
        const email = user?.email;
        const selected = { dbId, email };
        axiosSecure.post('/selectedClass', selected)
            .then(data => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class Saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

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
                    <button onClick={() => handleSelected(card)} disabled={!isStudent} className="btn btn-info">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;