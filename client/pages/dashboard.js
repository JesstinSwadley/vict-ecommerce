import React from "react";
import AddProductForm from "../components/AddProductForm";
import ProductTable from "../components/ProductTable";

export default function Dashboard() {
	return (
		<main>
			<div className='container mx-auto px-4'>
				<h1 className='page-title'>
					Dashboard
				</h1>
				<ProductTable />
			</div>
		</main>
	);
}
