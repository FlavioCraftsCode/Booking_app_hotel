import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";


const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <Navbar />
            <Header />


            <main className="flex-1 mt-10 md:mt-20 flex flex-col gap-12 md:gap-16">


                <Featured />


                <PropertyList />


                <FeaturedProperties />


                <Footer />
            </main>
        </div>
    );
};

export default Home;