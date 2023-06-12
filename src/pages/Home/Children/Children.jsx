import React from 'react';

const Children = () => {
    return (
        <div className='mt-24'>
            <h1 className='text-lg md:text-4xl my-4 font-serif uppercase font-medium text-center'>Education For <br /> Children</h1>

            <div className='md:flex justify-center gap-4 my-10'>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img className='h-[400px]' src="https://img.freepik.com/free-photo/close-up-hands-making-words_23-2148551589.jpg?w=740&t=st=1686578968~exp=1686579568~hmac=d2f88959202253214d9f935b76f0e560505518ef60d88fdbbbb56c8e8d8454bd" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-xl md:text-3xl text-blue-900 font-bold">Letter Match</h2>
                        <h2 className="text-xl md:text-2xl text-red-400 font-bold">$800</h2>
                        <p className='text-lg md:xl'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aspernatur accusamus, suscipit mollitia ut debitis iure ipsum maxime quam quis.
                        </p>
                        <div className='mt-8 text-center bg-blue-900 mx-10 rounded-lg'>
                            <p className='text-xl md:text-2xl text-white p-8'>AGE : <span className='text-red-500'>2-4 year</span></p>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img className='h-[400px] w-96' src="https://img.freepik.com/free-photo/little-girl-carpet-with-pencils_23-2147797854.jpg?w=740&t=st=1686579111~exp=1686579711~hmac=c3057668740f4386ce794282d3133ac80320fceae50313485a45992e1cbc2186" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-xl md:text-3xl text-blue-900 font-bold">Drawing & Painting</h2>
                        <h2 className="text-xl md:text-2xl text-red-400 font-bold">$800</h2>
                        <p className='text-lg md:xl'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aspernatur accusamus, suscipit mollitia ut debitis iure ipsum maxime quam quis.
                        </p>
                        <div className='mt-8 text-center bg-blue-900 mx-10 rounded-lg'>
                            <p className='text-xl md:text-2xl text-white p-8'>AGE : <span className='text-red-500'>2-4 year</span></p>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img className='h-[400px] w-96' src="https://img.freepik.com/free-photo/colorful-pop-it-toy-background-close-up_58702-5435.jpg?w=740&t=st=1686579398~exp=1686579998~hmac=9e0c66935e65e85376e65653aed1b4d69c7ed739d3a677b3bef95af32989b28b" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-xl md:text-3xl text-blue-900 font-bold">Color Matching</h2>
                        <h2 className="text-xl md:text-2xl text-red-400 font-bold">$800</h2>
                        <p className='text-lg md:xl'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aspernatur accusamus, suscipit mollitia ut debitis iure ipsum maxime quam quis.
                        </p>
                        <div className='mt-8 text-center bg-blue-900 mx-10 rounded-lg'>
                            <p className='text-xl md:text-2xl text-white p-8'>AGE : <span className='text-red-500'>2-4 year</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Children;