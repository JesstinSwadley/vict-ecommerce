import { useState } from "react";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [role, setRole] = useState("merchant"); // New state variable for role

	const handleSubmit = async (e) => {
		e.preventDefault();

		const url =
			role === "merchant"
				? "http://localhost:3001/merchants/register"
				: "http://localhost:3001/customer/register";

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					firstName,
					lastName,
				}),
			});

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
			<div className='flex-1 bg-slate-300 justify-center items-center flex'>
				<span className="text-3xl font-bold">Register</span>
			</div>
			<div className='flex-1 flex justify-center items-center'>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 w-full max-w-md'
				>
					<div className='flex justify-center flex-col items-center'>
						<span className='text-center'>Select Account Type</span>
						<div className='flex flex-row justify-center items-center w-full gap-4'>
							<label>
								<input
									type='radio'
									name='role'
									value='merchant'
									checked={role === "merchant"}
									onChange={() => setRole("merchant")}
									className='mr-2'
								/>
								Merchant
							</label>
							<label className=''>
								<input
									type='radio'
									name='role'
									value='customer'
									checked={role === "customer"}
									onChange={() => setRole("customer")}
									className='mr-2'
								/>
								Customer
							</label>
						</div>
					</div>
					<div>
						<label
							htmlFor='firstName'
							className='block text-sm font-medium text-gray-700'
						>
							First Name
						</label>
						<input
							type='text'
							name='firstName'
							id='firstName'
							required
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div>
						<label
							htmlFor='lastName'
							className='block text-sm font-medium text-gray-700'
						>
							Last Name
						</label>
						<input
							type='text'
							name='lastName'
							id='lastName'
							required
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
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
