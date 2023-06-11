import React from 'react';
import { BsSendCheckFill, BsCheckLg, BsXLg } from "react-icons/bs";
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAdminClasses from '../../../hooks/useAdminClasses';

const ClassCard = ({ card }) => {
    const { name, image, price, seats, instructorName, instructorEmail, status, _id } = card;
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const [, refetch] = useAdminClasses();

    const handleApproved = (id) => {
        axiosSecure.patch(`/updateClasses/${id}`)
            .then(res => {
                console.log(res.data);
                refetch();
            });
    }

    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img className='h-44' src={image} /></figure>
            <div className="card-body">
                <div className='flex items-center justify-between'>
                    <h2 className="card-title">{name}</h2>
                    <h3 className='md:pr-4 text-lg'>Price: $ {price}</h3>
                </div>
                <p>Instructor Name : {instructorName}</p>
                <p>Instructor Email : {instructorEmail}</p>
                <h3>Available Seats : {seats}</h3>
                <h3>{status}</h3>
                <hr />
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-x-4'>
                        <button onClick={() => handleApproved(_id)} className={`${status === 'pending' ? 'text-green-500' : ''} btn btn-sm`} disabled={status === 'approved'}><BsCheckLg size={30}></BsCheckLg></button>
                        <button className='btn btn-sm text-red-500' disabled={status === 'approved'}><BsXLg size={30}></BsXLg></button>
                    </div>
                    <div>
                        <button className='btn btn-sm text-blue-500'><BsSendCheckFill size={30}></BsSendCheckFill></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;