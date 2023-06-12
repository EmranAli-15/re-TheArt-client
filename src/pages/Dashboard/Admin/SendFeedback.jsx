import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SendFeedback = () => {
    const id = useLoaderData();
    const [axiosSecure] = useAxiosSecure();
    const [data, setData] = useState([]);

    useEffect(() => {
        axiosSecure(`/getClassForFeedback/${id}`)
            .then(res => {
                setData(res.data);
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const image = data.image;
        const email = data.instructorEmail;
        const details = form.details.value;
        const name = data.name;
        const deniedData = { name, image, email, details };

        axiosSecure.post('/deniedDetails', deniedData)
            .then(res => {
                form.reset();
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Feedback Send',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    return (
        <div>
            <h1 className='text-lg md:text-4xl my-4 font-serif uppercase font-medium text-center'>Send Feedback</h1>
            <form onSubmit={handleSubmit}>
                <textarea name="details" className="textarea text-[16px] textarea-info w-full h-44" placeholder="Details" required></textarea>

                <div className='text-center'>
                    <button className="btn btn-wide">
                        <input className='text-lg' type="submit" value="SEND" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendFeedback;