import React from "react";
import SellerForm from "../components/SellerForm";

const HomePage = () => {
	return (
		<div className='container mx-auto px-4'>
			<h1 className='text-xl font-bold my-4'>Register Seller</h1>
			<p>This is the default homepage of your website.</p>
			<SellerForm />
		</div>
	);
};

export default HomePage;
