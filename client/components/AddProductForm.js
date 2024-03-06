import { useState } from "react";

export default function AddProductForm() {
	return (
		<main>
			<form>
				<input type='text' placeholder='Product Name' />
				<input type='text' placeholder='Product Price' />
			</form>
		</main>
	);
};
