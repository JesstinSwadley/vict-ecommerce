export default function NavBar() {
	return (
		<div className='h-20 bg-gray-100 border-b flex items-center justify-between font-sembold text-xl'>
			<ul className='flex ml-8'>
				<li>
					<a className='text-3xl'>Vict</a>
				</li>
			</ul>
			<ul className='flex mr-8 gap-8'>
				<li className=''>
					<a className='text-indigo-700 hover:text-blue-800' href='/'>
						Home
					</a>
				</li>
				<li className=''>
					<a
						className='text-blue-500 hover:text-blue-800'
						href='/dashboard'
					>
						Dashboard
					</a>
				</li>
			</ul>
		</div>
	);
}
