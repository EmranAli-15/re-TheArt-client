import React from 'react';
import useAuth from '../../hooks/useAuth'
import useStudent from '../../hooks/useStudent'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const ClassCard = ({ card }) => {
    const { image, name, instructorName, seats, price, _id } = card;
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [axiosSecure] = useAxiosSecure();

    const handleSelected = (card) => {
        const dbId = card._id;
        const price = card.price;
        const status = 'selected';
        const email = user?.email;
        const selected = { dbId, email, price, status };

        if (!user) {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Please Login',
                showConfirmButton: false,
                timer: 1500
            })
        }

        else {
            axiosSecure.post('/selectedClass', selected)
                .then(data => {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Class Saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    }

    return (
        <div className={`${seats === 0 && 'bg-red-500'} card card-compact w-full shadow-xl`}>
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
                    <button onClick={() => handleSelected(card)} disabled={isAdmin || isInstructor || seats === 0} className="btn btn-info">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;