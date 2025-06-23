import { useCartStore } from "../store/cart";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { formatPrice } from "../utils/formatPrice";


export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <div className="text-muted-foreground">Your cart is empty.</div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 border-b pb-3 last:border-none w-full"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded mb-2 sm:mb-0"
                  />
                  <div className="flex-1 w-full">
                    <div className="font-medium text-base line-clamp-1">
                      {product.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {product.category}
                    </div>
                    <div className="text-sm font-semibold">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto items-center">
                    <Input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) =>
                        updateItem(
                          product.id,
                          Math.max(
                            1,
                            Math.min(product.stock, Number(e.target.value))
                          )
                        )
                      }
                      className="w-full sm:w-20 text-center"
                      aria-label="Quantity"
                    />
                    <Button
                      size="icon"
                      onClick={() => removeItem(product.id)}
                      aria-label="Remove"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 font-bold text-lg gap-2">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-white"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button variant="primary" className="w-full sm:w-auto" disabled>
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
