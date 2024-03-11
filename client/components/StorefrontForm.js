// StorefrontForm.js
import React, { useState } from "react";

export default function StorefrontForm({ onStorefrontCreated }) {
	const [storefrontName, setStorefrontName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const merchantId = localStorage.getItem("merchantId");
		if (!merchantId) {
			console.error("No merchant ID found in localStorage");
			return;
		}

		try {
			const response = await fetch("http://localhost:3001/store/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					storefront_name: storefrontName,
					merchant_id: merchantId,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Storefront created successfully:", data);
				setStorefrontName("");
				if (onStorefrontCreated) {
					onStorefrontCreated();
				}
			} else {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Failed to create storefront"
				);
			}
		} catch (error) {
			console.error("Error creating storefront:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='mb-8 bg-gray-100 p-6 flex flex-row gap-4 w-full items-center justify-center my-8'
		>
			<div className='form-group'>
				<input
					type='text'
					id='storefrontName'
					name='storefrontName'
					placeholder='Storefront Name'
					className='px-4 py-2 border rounded-md mr-2'
					value={storefrontName}
					onChange={(e) => setStorefrontName(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-600 text-white rounded-md'
				>
					Create Storefront
				</button>
			</div>
		</form>
	);
}
