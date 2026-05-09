import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Product } from '@/types';

type ProductFormProps = {
    action: string;
    method: 'post' | 'put';
    submitLabel: string;
    product?: Product;
};

export default function ProductForm({
    action,
    method,
    submitLabel,
    product,
}: ProductFormProps) {
    return (
        <Form
            action={action}
            method={method}
            options={{ preserveScroll: true }}
            className="space-y-6 rounded-xl border border-sidebar-border/70 bg-background p-6 shadow-sm dark:border-sidebar-border"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={product?.name ?? ''}
                            placeholder="Product name"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={product?.description ?? ''}
                            placeholder="Short product description"
                            className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={product?.price ?? ''}
                                placeholder="0.00"
                                required
                            />
                            <InputError message={errors.price} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                name="stock"
                                type="number"
                                step="1"
                                min="0"
                                defaultValue={product?.stock ?? 0}
                                placeholder="0"
                                required
                            />
                            <InputError message={errors.stock} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button disabled={processing} type="submit">
                            {submitLabel}
                        </Button>

                        <Button asChild variant="outline">
                            <Link href="/products">Cancel</Link>
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}