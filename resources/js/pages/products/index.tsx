import { Form, Head, Link } from '@inertiajs/react';
import { badgeVariants } from '@/components/ui/badge';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

export default function ProductsIndex({
    products,
}: {
    products: Product[];
}) {
    return (
        <>
            <Head title="Products" />

            <h1 className="sr-only">Products</h1>

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <Heading
                        variant="small"
                        title="Products"
                        description="Create, update, and remove products from a single screen"
                    />

                    <Button asChild>
                        <Link href="/products/create">Add product</Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-background shadow-sm dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-sidebar-border/70 bg-muted/30 text-muted-foreground dark:border-sidebar-border">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Stock
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-12 text-center text-muted-foreground"
                                        >
                                            No products yet. Add your first one
                                            to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b border-sidebar-border/60 last:border-b-0"
                                        >
                                            <td className="px-4 py-4 font-medium text-foreground">
                                                {product.name}
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">
                                                ${Number(product.price).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">
                                                <span
                                                    className={cn(
                                                        badgeVariants({
                                                            variant:
                                                                product.stock > 0
                                                                    ? 'default'
                                                                    : 'secondary',
                                                        }),
                                                    )}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">
                                                {product.description || '—'}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <Button
                                                        asChild
                                                        size="sm"
                                                        variant="outline"
                                                    >
                                                        <Link
                                                            href={`/products/${product.id}/edit`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </Button>

                                                    <Form
                                                        action={`/products/${product.id}`}
                                                        method="delete"
                                                    >
                                                        {({ processing }) => (
                                                            <Button
                                                                type="submit"
                                                                size="sm"
                                                                variant="destructive"
                                                                disabled={processing}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </Form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Products',
            href: '/products',
        },
    ],
};