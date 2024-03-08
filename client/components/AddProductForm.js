import { useState } from "react";

export default function AddProductForm() {
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior

		try {
			// API call to your Next.js API route
			const response = await fetch(
				"http://localhost:3001/products/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						product_name: productName,
						price,
					}),
				}
			);

			if (response.ok) {
				const result = await response.json();
				console.log(result); // Handle success response
				// Reset form or provide user feedback
			} else {
				// Handle server errors or invalid responses
				console.error("Failed to add product");
			}
		} catch (error) {
			console.error("Failed to add product", error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='w-1/2'>
			<div>
				<input
					type='text'
					placeholder='Product Name'
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					className='input-class-if-needed'
				/>
				<input
					type='text'
					placeholder='Product Price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className='input-class-if-needed'
				/>
				<div>
					<button
						type='submit'
						className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
}
