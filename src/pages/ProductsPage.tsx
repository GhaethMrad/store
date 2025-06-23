import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import {
  FaSearch,
  FaSort,
  FaTimes,
  FaMobileAlt,
  FaLaptop,
  FaFlask,
  FaSpa,
  FaShoppingBasket,
  FaCouch,
  FaFilter,
  FaStar,
} from "react-icons/fa";
import { Button } from "../components/ui/button";

const categories = [
  { key: "", label: "All", icon: null },
  { key: "smartphones", label: "Smartphones", icon: <FaMobileAlt /> },
  { key: "laptops", label: "Laptops", icon: <FaLaptop /> },
  { key: "fragrances", label: "Fragrances", icon: <FaFlask /> },
  { key: "skincare", label: "Skincare", icon: <FaSpa /> },
  { key: "groceries", label: "Groceries", icon: <FaShoppingBasket /> },
  { key: "home-decoration", label: "Home", icon: <FaCouch /> },
];

const sortOptions = [
  { value: "", label: "Default", icon: null },
  { value: "price-asc", label: "Price: Low to High", icon: <FaSort /> },
  {
    value: "price-desc",
    label: "Price: High to Low",
    icon: <FaSort style={{ transform: "scaleY(-1)" }} />,
  },
  {
    value: "rating-desc",
    label: "Rating: High to Low",
    icon: <FaStar className="text-yellow-400" />,
  },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { data, isLoading, error } = useProducts({
    search: debouncedSearch,
    category,
  });
  const { toast } = useToast();

  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  if (error)
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });

  
  const skeletons = Array.from({ length: 8 });

  
  let sortedData = data;
  if (data && sort) {
    sortedData = [...data];
    if (sort === "price-asc") sortedData.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sortedData.sort((a, b) => b.price - a.price);
    if (sort === "rating-desc")
      sortedData.sort(
        (a, b) => ((b as any).rating ?? 0) - ((a as any).rating ?? 0)
      );
  }

  
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  
  const activeFilters = [
    ...(category && category !== ""
      ? [categories.find((c) => c.key === category)?.label]
      : []),
    ...(search ? [search] : []),
    ...(sort ? [sortOptions.find((s) => s.value === sort)?.label] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      
      <div className="sticky top-2 z-30 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg px-3 py-3 mb-8 flex flex-col gap-3 md:flex-row md:items-center md:gap-3 md:justify-between border border-gray-100">
        
        <div className="relative w-full md:w-1/3 min-w-[220px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white text-base h-11"
            aria-label="Search products"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <FaTimes />
            </Button>
          )}
        </div>
        
        <div className="w-full md:w-auto flex gap-1 py-1 overflow-x-auto scrollbar-hide min-h-[44px]">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={category === cat.key ? "primary" : "outline"}
              size="sm"
              className="flex items-center gap-2 !text-white px-4 h-10 rounded-full font-medium whitespace-nowrap border text-sm transition-all duration-200 relative"
              onClick={() => setCategory(cat.key)}
              aria-pressed={category === cat.key}
            >
              {cat.icon && <span className="text-base">{cat.icon}</span>}
              {cat.label}
              
              {category === cat.key && (
                <span className="absolute left-3 right-3 bottom-1 h-0.5 bg-blue-300 rounded-full animate-pulse" />
              )}
            </Button>
          ))}
        </div>
        
        <div className="relative w-full md:w-44 min-w-[140px]">
          <FaSort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none" />
          <select
            className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white text-base h-11 appearance-none cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span
            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-transform duration-200 ${
              sort ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
        

        
        <Button
          variant="primary"
          size="sm"
          className="w-full md:w-auto min-w-[120px] !text-white whitespace-nowrap h-11 px-5 rounded-lg font-semibold border-blue-500 hover:bg-blue-50 transition-all text-base flex items-center justify-center"
          onClick={clearFilters}
          style={{ boxSizing: "border-box" }}
        >
          Clear Filters
        </Button>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter, i) => (
            <span
              key={i}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
            >
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 text-blue-400 hover:text-blue-700"
                onClick={() => {
                  if (filter === search) setSearch("");
                  else if (
                    filter === categories.find((c) => c.key === category)?.label
                  )
                    setCategory("");
                  else if (
                    filter === sortOptions.find((s) => s.value === sort)?.label
                  )
                    setSort("");
                }}
                aria-label={`Remove filter ${filter}`}
              >
                <FaTimes />
              </Button>
            </span>
          ))}
        </div>
      )}
      
      {showFilters && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-500"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
            >
              <FaTimes size={20} />
            </Button>
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center gap-2">
              <FaFilter /> More Filters
            </h3>
            <div className="text-gray-500">
              (Advanced filters coming soon...)
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {skeletons.map((_, i) => (
            <div key={i} className="bg-white/60 rounded-2xl h-72 shadow-xl" />
          ))}
        </div>
      ) : sortedData && sortedData.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedData?.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


