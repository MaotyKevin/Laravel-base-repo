import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import ProductForm from '@/components/product-form';
import type { Product } from '@/types';

export default function EditProduct({
    product,
}: {
    product: Product;
}) {
    return (
        <>
            <Head title={`Edit ${product.name}`} />

            <h1 className="sr-only">Edit product</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title={`Edit ${product.name}`}
                    description="Update the product details"
                />

                <ProductForm
                    action={`/products/${product.id}`}
                    method="put"
                    submitLabel="Save changes"
                    product={product}
                />
            </div>
        </>
    );
}

EditProduct.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Edit product',
            href: '/products/create',
        },
    ],
};