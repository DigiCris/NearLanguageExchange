import { Product, listedProducts } from './model';
import { ContractPromiseBatch, context, u128 } from 'near-sdk-as';

export function setProduct(product: Product): void {
    let storedProduct = listedProducts.get(product.id);
    if (storedProduct !== null) {
        throw new Error(`a product with ${product.id} already exists`);
    }
    listedProducts.set(product.id, Product.fromPayload(product));
}

export function getProduct(id: string): Product | null {
    return listedProducts.get(id);
}

export function getProducts(): Product[] {
    return listedProducts.values();
}

export function buyProduct(id: string):void
{
    const BuyingProduct : Product | null= getProduct(id);
    if (BuyingProduct == null) 
    {
        throw new Error("product not found");
    }
    const RECEIVING_ACCOUNT:string = BuyingProduct.owner!;
    const DEPOSIT: u128 = BuyingProduct.price!;
    if (DEPOSIT.toString() != context.attachedDeposit.toString()) 
    {
        throw new Error("attached deposit should equal to the product's price");
    }

    ContractPromiseBatch.create(RECEIVING_ACCOUNT).transfer(DEPOSIT);
    BuyingProduct.incrementSoldAmount();
    listedProducts.set(BuyingProduct.id, BuyingProduct);
}