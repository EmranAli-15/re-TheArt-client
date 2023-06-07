import React from 'react';

const Banner = () => {
    return (
        <div className="carousel w-full md:h-[600px]">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/QFwHGFc/banner-1.webp" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle left-btn">❮</a>
                    <a href="#slide2" className="btn btn-circle right-btn">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/cD8dKhD/banner-2.webp" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle left-btn">❮</a>
                    <a href="#slide3" className="btn btn-circle right-btn">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/2PnCb5D/banner-3.webp" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle left-btn">❮</a>
                    <a href="#slide1" className="btn btn-circle right-btn">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;