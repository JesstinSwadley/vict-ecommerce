// pages/register.js
import { useState } from "react";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"http://localhost:3001/merchants/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `Error: ${response.status}`
				);
			}

			const data = await response.json();
			console.log("Registration successful:", data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className='min-h-screen flex'>
			<div className='flex-1 bg-slate-300'></div> {/* Left half blank */}
			<div className='flex-1 flex justify-center items-center'>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 w-full max-w-md'
				>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'
						>
							Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							required
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700'
						>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							required
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
