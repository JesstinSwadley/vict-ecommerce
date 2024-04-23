export default function NavBar() {
	return (
		<div className='h-16 bg-gray-100 border-b flex items-center justify-between'>
			<ul className='flex ml-8'>
				<li>
					<a className='text-3xl font-black text-indigo-600'>VICT</a>
				</li>
			</ul>
			<ul className='flex mr-8 gap-8'>
				<li className=''>
					<a className='navlinks' href='/'>
						Home
					</a>
				</li>
				<li className=''>
					<a className='navlinks' href='/products'>
						Products
					</a>
				</li>
				<li className=''>
					<a className='navlinks' href='/register'>
						Register
					</a>
				</li>
				<li className=''>
					<a className='navlinks' href='/login'>
						Login
					</a>
				</li>
				<li className=''>
					<a
						className='navlinks'
						href='/merchant/dashboard'
					>
						Dashboard
					</a>
				</li>
				<li className=''>
					<a
						className='navlinks'
						href='/customer/profile'
					>
						Profile
					</a>
				</li>
			</ul>
		</div>
	);
}
