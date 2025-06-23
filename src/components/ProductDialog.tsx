import { useState } from 'react';
import type { Product } from '../types';
import { useCartStore } from '../store/cart';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { formatPrice } from '../utils/formatPrice';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}


export default function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const handleAdd = () => {
    addItem(product, qty);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
        </DialogHeader>
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded mb-4" />
        <div className="mb-2 text-lg font-bold text-primary">{formatPrice(product.price)}</div>
        <div className="mb-2 text-sm text-muted-foreground">{product.description}</div>
        <div className="mb-2 text-xs text-gray-500">Category: {product.category} | Stock: {product.stock}</div>
        <div className="flex items-center gap-2 mt-4">
          <label htmlFor="qty" className="text-sm">Qty:</label>
          <Input
            id="qty"
            type="number"
            min={1}
            max={product.stock}
            value={qty}
            onChange={e => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
            className="w-20"
          />
          <Button onClick={handleAdd} disabled={qty < 1 || qty > product.stock}>
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
