import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "AI in Education", count: 12 },
  { name: "Primary Learning", count: 8 },
  { name: "Technology", count: 15 },
  { name: "Teaching Tips", count: 6 },
  { name: "Parent Resources", count: 9 },
  { name: "Research", count: 4 },
];

export function BlogCategories() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
              {category.name}
            </Badge>
            <span className="text-sm text-gray-500">({category.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}