import React from 'react';
import { BsSendCheckFill, BsCheckLg, BsXLg } from "react-icons/bs";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAdminClasses from '../../../hooks/useAdminClasses';
import { Link } from 'react-router-dom';
import { stringify } from 'postcss';

const ClassCard = ({ card }) => {
    const { name, image, price, seats, instructorName, instructorEmail, status, _id } = card;
    const [axiosSecure] = useAxiosSecure()
    const [, refetch] = useAdminClasses();


    const handleStatus = (data) => {
        axiosSecure.patch('/updateClassStatus', data)
            .then(res => {
                refetch();
            });
    }

    const handleApproved = (id) => {
        const status = 'approved';
        const data = { id: id, status: status };
        handleStatus(data);
    }

    const handleDenied = (id) => {
        const status = 'denied';
        const data = { id: id, status: status };
        handleStatus(data);
    }

    return (
        <div>
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
                            <button onClick={() => handleApproved(_id)} className={`${status === 'pending' ? 'text-green-500' : ''} btn btn-sm`} disabled={status !== 'pending'}><BsCheckLg size={30}></BsCheckLg></button>
                            <button onClick={() => handleDenied(_id)} className='btn btn-sm text-red-500' disabled={status !== 'pending'}><BsXLg size={30}></BsXLg></button>
                        </div>
                        <div>
                            <Link to={`/dashboard/sendFeedback/${_id}`}>
                                <button className='btn btn-sm text-blue-500'><BsSendCheckFill size={30}></BsSendCheckFill></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;