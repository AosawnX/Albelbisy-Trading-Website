import NewCategoryForm from "@/components/admin/NewCategoryForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/categories"
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Category</h1>
          <p className="text-sm text-gray-400">Create a new product category</p>
        </div>
      </div>

      {/* Form */}
      <NewCategoryForm />
    </div>
  );
}
