import Head from "next/head";

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col'>
			<Head>
				<title>Vict Ecommerce</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* Main Content */}
			<main className='flex-1 p-6'>
				<div className='max-w-6xl mx-auto'>
					<h1 className='text-4xl font-bold mb-6'>
						Welcome to Vict
					</h1>
					<p className='mb-4'>
						Explore our wide range of products and enjoy a seamless
						shopping experience.
					</p>
					{/* Example product grid */}
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						<div className='bg-gray-200 p-4'>Product 1</div>
						<div className='bg-gray-200 p-4'>Product 2</div>
						<div className='bg-gray-200 p-4'>Product 3</div>
						<div className='bg-gray-200 p-4'>Product 4</div>
					</div>
				</div>
			</main>

		</div>
	);
}
