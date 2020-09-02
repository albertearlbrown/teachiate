import React, { useEffect } from 'react';
import Banner from '../../components/HomeBanner';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
           <Banner/>
        </>
    );
}

export default Home;