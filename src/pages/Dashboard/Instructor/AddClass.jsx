import React from 'react';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const imageToken = import.meta.env.VITE_IMAGE_TOKEN;

const AddClass = () => {
    const { user } = useAuth();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${imageToken}`
    const [axiosSecure] = useAxiosSecure();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const image = form.photo.files[0];
        const seats = parseInt(form.seats.value);
        const students = 0;
        const price = parseFloat(form.price.value);
        const instructorName = form.instructorName.value;
        const instructorEmail = form.instructorEmail.value;
        const status = 'pending'

        const formData = new FormData();
        formData.append('image', image);

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const newItem = { name, price, seats, image: imgURL, status, students, instructorName, instructorEmail };
                    axiosSecure.post('/classes', newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class Added',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            form.reset();
                        })
                }
            })

    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <div className='md:flex md:space-x-3'>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Class Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Type here" className="input input-bordered input-info w-full md:w-96" required />
                </div>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="file" name="photo" className="file-input file-input-bordered file-input-info w-full md:w-96" required />
                </div>
            </div>

            <div className='md:flex md:space-x-3 my-4'>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Available Seats</span>
                    </label>
                    <input type="number" name="seats" placeholder="Type here" className="input input-bordered input-info w-full md:w-96" required />
                </div>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number" name="price" placeholder="Type here" className="input input-bordered input-info w-full md:w-96" required />
                </div>
            </div>

            <div className='md:flex md:space-x-3'>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Instructor Name</span>
                    </label>
                    <input type="text" name="instructorName" defaultValue={user?.displayName} disabled className="input input-bordered input-info w-full md:w-96" />
                </div>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Instructor Email</span>
                    </label>
                    <input type="text" name="instructorEmail" defaultValue={user?.email} disabled placeholder="Type here" className="input input-bordered input-info w-full md:w-96" />
                </div>
            </div>
            <button className="btn w-full md:w-[780px] mt-8 border-info">
                <input className='cursor-pointer' type="submit" value="Add Class" />
            </button>
        </form>
    );
};

export default AddClass;