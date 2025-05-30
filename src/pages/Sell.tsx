import React from 'react';
import Header from '@/components/Header';
import SellHero from '@/components/sell/SellHero';
import SellFeatures from '@/components/sell/SellFeatures';
import ListingForm from '@/components/sell/ListingForm';
import SellerBenefits from '@/components/sell/SellerBenefits';
import Footer from '@/components/Footer';

const Sell = () => {
  return (
    <div className="min-h-screen bg-white font-luxury">
      <Header />
      <main>
        <SellHero />
        <SellFeatures />
        <ListingForm />
        <SellerBenefits />
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
