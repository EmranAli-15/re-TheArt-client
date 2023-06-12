import React from 'react';
import Banner from './Banner/Banner';
import PopularClass from './PopularClass/PopularClass';
import PopularInstructor from './PopularInstructor/PopularInstructor';
import useTitle from '../../hooks/useTitle';
import Children from './Children/Children';

const Home = () => {
    useTitle('Home')
    return (
        <div>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructor></PopularInstructor>
            <Children></Children>
        </div>
    );
};

export default Home;