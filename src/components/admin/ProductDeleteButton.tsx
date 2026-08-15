"use client";

import { Trash2, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "@/actions/products";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDeleteButton({ productId, productName }: { productId: string, productName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMsg(null);
    try {
      const res = await deleteProduct(productId);
      
      if (res?.error) {
        setErrorMsg(res.error);
        setIsDeleting(false);
      } else {
        // Since deleteProduct uses revalidatePath without redirect, we just close the modal.
        // Next.js will automatically refresh the Server Component data in the background.
        setIsOpen(false);
        setIsDeleting(false);
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        title="Delete product"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 size={15} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => !isDeleting && setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 w-full max-w-md relative z-10"
            >
              {errorMsg ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 shrink-0">
                    <AlertCircle size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cannot Delete Product</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    {errorMsg}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Close & Go Back
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 shrink-0">
                    <AlertTriangle size={32} className="text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Are you sure you want to delete <span className="font-bold text-gray-900">"{productName}"</span>? 
                    <br/><br/>
                    This action is permanent and cannot be undone.
                  </p>
                  
                  <div className="flex items-center gap-3 w-full">
                    <button
                      onClick={() => setIsOpen(false)}
                      disabled={isDeleting}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {isDeleting ? <Loader2 size={20} className="animate-spin" /> : "Yes, Delete"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
