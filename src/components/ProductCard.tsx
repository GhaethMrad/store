import { useState } from "react";
import type { Product } from "../types";
import ProductDialog from "./ProductDialog";
import { Card, CardContent } from "../components/ui/card";
import { formatPrice } from "../utils/formatPrice";
import { FaStar, FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { useCartStore } from "../store/cart";


export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  
  const rating = (product as any).rating ?? 4.8;
  const category = (product as any).category ?? "Cars";
  const isNew = true;
  const isDisabled = false;

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-lg transition-all duration-200 bg-white border border-gray-100 hover:shadow-2xl flex flex-col h-full"
        aria-label={`View details for ${product.title}`}
      >
        
        <div className="relative w-full h-48 overflow-hidden flex items-center justify-center bg-gray-50">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
            style={{ maxHeight: 160 }}
          />
          
          {isNew && (
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
              New
            </span>
          )}
          
          <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full capitalize font-medium">
            {category}
          </span>
        </div>
        <CardContent className="flex-1 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 text-gray-900">
              {product.title}
            </h3>
            <span className="flex items-center gap-1 text-blue-500 text-sm font-semibold">
              <FaStar className="inline-block" /> {rating}
            </span>
          </div>
          <p className="text-gray-900 font-bold text-xl mb-4">
            {formatPrice(product.price)}
          </p>
          <div className="flex justify-between items-center">
            
            <Button
              variant={liked ? "primary" : "outline"}
              size="icon"
              aria-label={liked ? "Remove from favorites" : "Add to favorites"}
              onClick={(e) => {
                e.stopPropagation();
                setLiked((l) => !l);
              }}
              tabIndex={0}
              className={cn(
                "w-12 h-12 text-2xl",
                liked ? "text-blue-500 border-blue-400" : "text-gray-400"
              )}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              aria-label="Add to cart"
              onClick={(e) => {
                e.stopPropagation();
                addItem(product, 1);
              }}
              disabled={isDisabled}
              tabIndex={0}
              className={cn(
                "gap-2 font-semibold text-base !text-blue-600",
                isDisabled
                  ? "bg-blue-200 border-blue-200 text-gray-400"
                  : "bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 text-white"
              )}
            >
              <FaCartPlus className="text-xl" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
      <ProductDialog open={open} onOpenChange={setOpen} product={product} />
    </>
  );
}
