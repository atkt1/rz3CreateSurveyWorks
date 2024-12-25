import { useTheme } from '@/lib/context/ThemeContext';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types/product';

interface ProductGridProps {
  products: Product[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  error?: string;
}

export function ProductGrid({ products, selectedIds, onSelectionChange, error }: ProductGridProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleToggle = (productId: string) => {
    const newSelection = selectedIds.includes(productId)
      ? selectedIds.filter(id => id !== productId)
      : [...selectedIds, productId];
    onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className={cn(
          "block text-sm font-medium",
          isDark ? "text-gray-200" : "text-gray-700"
        )}>
          Link Products to Survey
        </label>
        <span className={cn(
          "text-sm",
          isDark ? "text-gray-400" : "text-gray-500"
        )}>
          Selected: {selectedIds.length}
        </span>
      </div>

      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg border",
        error
          ? isDark 
            ? "border-red-500/50 bg-red-500/10"
            : "border-red-300 bg-red-50"
          : isDark
            ? "border-gray-700 bg-gray-800/50"
            : "border-gray-200 bg-white"
      )}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleToggle(product.id)}
            className={cn(
              "relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer",
              "transition-all duration-200 hover:scale-[1.02]",
              selectedIds.includes(product.id)
                ? isDark
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-blue-200 bg-blue-50"
                : isDark
                  ? "border-gray-700 bg-gray-800/50"
                  : "border-gray-200 bg-white"
            )}
          >
            <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={product.thumbnail_path}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className={cn(
                "font-medium truncate",
                isDark ? "text-white" : "text-gray-900"
              )}>
                {product.name}
              </h4>
              <p className={cn(
                "text-sm truncate",
                isDark ? "text-gray-400" : "text-gray-500"
              )}>
                ID: {product.marketplace_product_id}
              </p>
            </div>
            <input
              type="checkbox"
              checked={selectedIds.includes(product.id)}
              onChange={() => {}}
              className="absolute top-2 right-2"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className={cn(
          "text-sm",
          isDark ? "text-red-400" : "text-red-600"
        )}>{error}</p>
      )}
    </div>
  );
}