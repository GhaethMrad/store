import { useCartStore } from '../store/cart';
import { formatPrice } from '../utils/formatPrice';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent } from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';


export default function CartDropdown() {
  const items = useCartStore(state => state.items);
  const updateItem = useCartStore(state => state.updateItem);
  const removeItem = useCartStore(state => state.removeItem);
  const totalPrice = useCartStore(state => state.totalPrice());

  return (
    <DropdownMenu>
      <DropdownMenuContent align="end" className="fixed sm:absolute top-[0px] w-full right-[-50px] sm:left-auto sm:right-0 max-w-xs sm:w-80 p-4 bg-white border border-gray-200 rounded shadow-lg animate-fade-in-up z-50" style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}>
        <h4 className="font-semibold mb-2 text-primary">Cart</h4>
        {items.length === 0 ? (
          <div className="text-gray-500 text-center py-8">Your cart is empty</div>
        ) : (
          <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-2 border-b pb-2 last:border-none">
                <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover rounded border" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.title}</div>
                  <div className="text-xs text-gray-500">{formatPrice(product.price)} x {quantity}</div>
                </div>
                <Input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={e => updateItem(product.id, Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                  className="w-16 mt-1 text-center"
                />
                <Button size="icon" variant="ghost" onClick={() => removeItem(product.id)} aria-label="Remove">
                  <span className="text-white">✕</span>
                </Button>
              </div>
            ))}
            <div className="flex justify-between font-semibold mt-2">
              <span>Subtotal:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <Link to="/cart" className="flex-1">
            <Button className="w-full text-white border-gray-300" variant="outline">View Cart</Button>
          </Link>
          <Button className="flex-1 w-full text-white" variant="primary" disabled>Checkout</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
