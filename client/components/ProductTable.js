import React, { useState, useEffect } from "react";

export default function ProductManagement() {
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [storefronts, setStorefronts] = useState([]);
	const [selectedStorefrontId, setSelectedStorefrontId] = useState("");
	const [products, setProducts] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editedProductName, setEditedProductName] = useState("");
	const [editedPrice, setEditedPrice] = useState("");

	useEffect(() => {
		fetchStorefronts();
		fetchProducts();
	}, []);

	const fetchStorefronts = async () => {
		const response = await fetch("http://localhost:3001/store/get-store", {
			credentials: "include",
		});
		if (response.ok) {
			const data = await response.json();
			setStorefronts(data);
			if (data.length > 0) {
				setSelectedStorefrontId(data[0].id);
			}
		}
	};

	const fetchProducts = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/products/all-products",
				{
					credentials: "include",
				}
			);
			const data = await response.json();

			console.log("Fetched products:", data);

			if (Array.isArray(data)) {
				setProducts(data);
			} else {
				console.error("Expected an array for products, but got:", data);
				setProducts([]);
			}
		} catch (error) {
			console.error("Failed to fetch products:", error);
			setProducts([]);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3001/products/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						product_name: productName,
						price,
						storefront_id: selectedStorefrontId,
					}),
				}
			);

			if (response.ok) {
				await fetchProducts();
				setProductName("");
				setPrice("");
			} else {
				console.error("Failed to add product");
			}
		} catch (error) {
			console.error("Failed to add product", error);
		}
	};

	const startEdit = (product) => {
		setEditingId(product.id);
		setEditedProductName(product.product_name);
		setEditedPrice(product.price);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditedProductName("");
		setEditedPrice("");
	};

	const handleUpdate = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3001/products/update`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						product_id: id,
						product_name: editedProductName,
						price: editedPrice,
					}),
				}
			);

			if (response.ok) {
				await fetchProducts();
				cancelEdit();
			} else {
				console.error("Failed to update product");
			}
		} catch (error) {
			console.error("Error updating product", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3001/products/delete?product_id=${id}`,
				{
					method: "DELETE",
					credentials: "include",
				}
			);

			if (response.ok) {
				await fetchProducts();
			} else {
				console.error("Failed to delete product");
			}
		} catch (error) {
			console.error("Error deleting product", error);
		}
	};

	return (
		<div className='bg-white shadow-sm'>
			<form
				onSubmit={handleSubmit}
				className='mb-8 bg-slate-100 p-6 flex flex-row gap-4 w-full items-center justify-center'
			>
				<input
					type='text'
					placeholder='Product Name'
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					className='px-4 py-2 border rounded-md mr-2'
				/>
				<input
					type='text'
					placeholder='Product Price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className='px-4 py-2 border rounded-md mr-2'
				/>
				<select
					value={selectedStorefrontId}
					onChange={(e) => setSelectedStorefrontId(e.target.value)}
					className='px-4 py-2 border rounded-md mr-2'
				>
					{storefronts.map((storefront) => (
						<option key={storefront.id} value={storefront.id}>
							{storefront.storefront_name}
						</option>
					))}
				</select>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-600 text-white rounded-md'
				>
					Add Product
				</button>
			</form>

			<div>
				<table className='min-w-full table-auto'>
					<thead className='bg-slate-100'>
						<tr>
							<th className='px-4 py-2 border'>Product Name</th>
							<th className='px-4 py-2 border'>Price</th>
							<th className='px-4 py-2 border'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product.id}>
								<td className='px-4 py-2 border'>
									{editingId === product.id ? (
										<input
											type='text'
											value={editedProductName}
											onChange={(e) =>
												setEditedProductName(
													e.target.value
												)
											}
											className='px-2 py-1 rounded'
										/>
									) : (
										product.product_name
									)}
								</td>
								<td className='px-4 py-2 border'>
									{editingId === product.id ? (
										<input
											type='text'
											value={editedPrice}
											onChange={(e) =>
												setEditedPrice(e.target.value)
											}
											className='px-2 py-1 rounded'
										/>
									) : (
										`$${product.price}`
									)}
								</td>
								<td className='px-4 py-2 border justify-center flex'>
									{editingId === product.id ? (
										<>
											<button
												onClick={() =>
													handleUpdate(product.id)
												}
												className='px-4 py-1 bg-green-600 text-white rounded-md mr-2'
											>
												Save
											</button>
											<button
												onClick={cancelEdit}
												className='px-4 py-1 bg-gray-500 text-white rounded-md'
											>
												Cancel
											</button>
										</>
									) : (
										<>
											<button
												onClick={() =>
													startEdit(product)
												}
												className='px-4 py-1 bg-blue-600 text-white rounded-md mr-2'
											>
												Edit
											</button>
											<button
												onClick={() =>
													handleDelete(product.id)
												}
												className='px-4 py-1 bg-red-600 text-white rounded-md'
											>
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
