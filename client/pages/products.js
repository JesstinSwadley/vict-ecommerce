// pages/products.js
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/products/all-products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold text-center mb-6'>Products</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map(product => (
                    <Link key={product.id} href={`/products/${product.id}`} passHref>
                        <div className='border p-4 rounded-lg cursor-pointer'>
                            <h2 className='text-xl font-semibold'>{product.product_name}</h2>
                            <p className='text-lg'>${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
