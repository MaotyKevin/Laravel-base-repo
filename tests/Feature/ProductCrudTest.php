<?php

use App\Models\Product;
use App\Models\User;

test('guests are redirected away from products', function () {
    $response = $this->get(route('products.index'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can manage products', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $createResponse = $this->post(route('products.store'), [
        'name' => 'Desk lamp',
        'description' => 'A compact lamp for a workspace.',
        'price' => 39.99,
        'stock' => 12,
    ]);

    $createResponse->assertRedirect(route('products.index'));
    $createResponse->assertSessionHasNoErrors();

    $product = Product::query()->where('name', 'Desk lamp')->firstOrFail();

    $updateResponse = $this->put(route('products.update', $product), [
        'name' => 'Desk lamp pro',
        'description' => 'An upgraded lamp with brighter light.',
        'price' => 49.5,
        'stock' => 8,
    ]);

    $updateResponse->assertRedirect(route('products.index'));
    $updateResponse->assertSessionHasNoErrors();

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Desk lamp pro',
        'description' => 'An upgraded lamp with brighter light.',
        'price' => '49.50',
        'stock' => 8,
    ]);

    $deleteResponse = $this->delete(route('products.destroy', $product));

    $deleteResponse->assertRedirect(route('products.index'));
    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
    ]);
});