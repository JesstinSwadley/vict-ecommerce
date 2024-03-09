export default function NavBar() {
	return (
		<ul className='flex bg-blue-100 p-4'>
			<li className='mr-6'>
				<a className='text-blue-500 hover:text-blue-800' href='/'>
					Home
				</a>
			</li>
			<li className='mr-6'>
				<a
					className='text-blue-500 hover:text-blue-800'
					href='/dashboard'
				>
					Dashboard
				</a>
			</li>
		</ul>
	);
}
