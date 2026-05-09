import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import ProductForm from '@/components/product-form';

export default function CreateProduct() {
    return (
        <>
            <Head title="Create product" />

            <h1 className="sr-only">Create product</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Create product"
                    description="Add a new product to the catalog"
                />

                <ProductForm
                    action="/products"
                    method="post"
                    submitLabel="Create product"
                />
            </div>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Create product',
            href: '/products/create',
        },
    ],
};