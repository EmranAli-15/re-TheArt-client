import React from 'react';
import useAuth from '../../../hooks/useAuth'

const AddClass = () => {
    const { user } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        const from = event.target;

        const name = from.name.value;
        const photo = from.photo.value;
        const seats = parseInt(from.seats.value);
        const price = parseFloat(from.price.value);
        const userName = from.userName.value;
        const userEmail = from.userEmail.value;

        const classData = { name, photo, seats, price, userName, userEmail };
        console.log(classData);
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <div className='md:flex md:space-x-3'>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Class Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Type here" className="input input-bordered input-info w-full md:w-96" />
                </div>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="file" name="photo" className="file-input file-input-bordered file-input-info w-full md:w-96" />
                </div>
            </div>

            <div className='md:flex md:space-x-3 my-4'>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Available Seats</span>
                    </label>
                    <input type="number" name="seats" placeholder="Type here" className="input input-bordered input-info w-full md:w-96" />
                </div>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Price</span>
                    </label>
                    <input type="number" name="price" placeholder="Type here" className="input input-bordered input-info w-full md:w-96" />
                </div>
            </div>

            <div className='md:flex md:space-x-3'>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Instructor Name</span>
                    </label>
                    <input type="text" name="userName" defaultValue={user?.displayName} disabled className="input input-bordered input-info w-full md:w-96" />
                </div>
                <div className='form-control'>
                    <label>
                        <span className="label-text">Instructor Email</span>
                    </label>
                    <input type="text" name="userEmail" defaultValue={user?.email} disabled placeholder="Type here" className="input input-bordered input-info w-full md:w-96" />
                </div>
            </div>
            <button className="btn w-full md:w-[780px] mt-8 border-info">
                <input type="submit" value="Add Class" />
            </button>
        </form>
    );
};

export default AddClass;