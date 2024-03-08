import React from "react";
import SellerRegisterForm from "../components/SellerRegisterForm";
import SellerLoginForm from "../components/SellerLoginForm";
import AddProductForm from "../components/AddProductForm";

const HomePage = () => {
	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-xl font-bold my-4'>Register Seller</h1>
			<SellerRegisterForm />
			<h1 className='text-xl font-bold my-4'>Login Seller</h1>
			<SellerLoginForm />
	
		</div>
	);
};

export default HomePage;
