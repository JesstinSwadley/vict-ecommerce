import React, { useState, useEffect } from "react";

export default function StoreManagement() {
	const [storefronts, setStorefronts] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editedStorefrontName, setEditedStorefrontName] = useState("");

	const fetchStorefronts = async () => {
		const merchantId = localStorage.getItem("merchantId");
		if (!merchantId) {
			console.error("No merchant ID found in localStorage");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:3001/store/get-store?merchant_id=${merchantId}`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const data = await response.json();
			setStorefronts(Array.isArray(data) ? data : [data]);
		} catch (error) {
			console.error("Failed to fetch storefronts:", error.message);
		}
	};

	const startEdit = (storefront) => {
		setEditingId(storefront.id);
		setEditedStorefrontName(storefront.storefront_name);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditedStorefrontName("");
	};

	const handleUpdate = async (id) => {
		try {
			const response = await fetch(`http://localhost:3001/store/update`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					storefront_id: id,
					storefront_name: editedStorefrontName,
				}),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			await fetchStorefronts();
			cancelEdit();
		} catch (error) {
			console.error("Failed to update storefront:", error.message);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3001/store/delete?storefront_id=${id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			await fetchStorefronts();
		} catch (error) {
			console.error("Failed to delete storefront:", error.message);
		}
	};

	useEffect(() => {
		fetchStorefronts();
	}, []);

	return (
		<div>
			<div>
				<h2 className='text-xl font-semibold my-4'>My Storefronts</h2>
				<table className='min-w-full table-auto'>
					<thead className='bg-gray-200'>
						<tr>
							<th className='px-4 py-2 border'>
								Storefront Name
							</th>
							<th className='px-4 py-2 border'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{storefronts.map((storefront) => (
							<tr key={storefront.id}>
								<td className='px-4 py-2 border'>
									{editingId === storefront.id ? (
										<input
											type='text'
											value={editedStorefrontName}
											onChange={(e) =>
												setEditedStorefrontName(
													e.target.value
												)
											}
											className='px-2 py-1 rounded'
										/>
									) : (
										storefront.storefront_name
									)}
								</td>
								<td className='px-4 py-2 border justify-center flex'>
									{editingId === storefront.id ? (
										<>
											<button
												onClick={() =>
													handleUpdate(storefront.id)
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
													startEdit(storefront)
												}
												className='px-4 py-1 bg-blue-600 text-white rounded-md mr-2'
											>
												Edit
											</button>
											<button
												onClick={() =>
													handleDelete(storefront.id)
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
