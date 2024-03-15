import React from "react";
import ProductTable from "../components/ProductTable";
import StorefrontTable from "../components/StorefrontTable";

export default function Dashboard() {
	return (
		<main>
			<div className='container mx-auto px-4'>
				<h1 className='page-title'>
					Dashboard
				</h1>
				<ProductTable />
				<StorefrontTable />
			</div>
		</main>
	);
}
