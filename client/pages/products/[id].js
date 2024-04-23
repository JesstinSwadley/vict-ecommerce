import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
	const router = useRouter();
	const { id } = router.query;
	const [product, setProduct] = useState(null);

	useEffect(() => {
		if (!id) return;
		fetch(`http://localhost:3001/products/all-products`)
			.then((response) => response.json())
			.then((data) => {
				const singleProduct = data.find((p) => p.id === id);
				setProduct(singleProduct);
			})
			.catch((error) => console.error("Error fetching products:", error));
	}, [id]);

	const handlePurchase = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/transaction/purchase`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						total: product.price,
						product_id: product.id,
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message ||
						`Failed to create transaction: ${response.status}`
				);
			}

			alert("Purchase successful");
		} catch (error) {
			console.error("Purchase error:", error.message);
			alert(`Purchase failed: ${error.message}`);
		}
	};

	if (!product) return <div>Loading...</div>;

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>{product.product_name}</h1>
			<p className='text-xl'>Price: ${product.price}</p>
			<p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
			<p>
				Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
			</p>
			<button
				className='bg-green-500 rounded-md p-2 text-white'
				onClick={handlePurchase}
			>
				Purchase
			</button>
		</div>
	);
}
