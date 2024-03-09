import React from "react";
import SellerRegisterForm from "../components/SellerRegisterForm";
import SellerLoginForm from "../components/SellerLoginForm";

const HomePage = () => {
	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-xl font-bold my-4'>Register Merchant</h1>
			<SellerRegisterForm />
			<h1 className='text-xl font-bold my-4'>Login Merchant</h1>
			<SellerLoginForm />
		</div>
	);
};

export default HomePage;