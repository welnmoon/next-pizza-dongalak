const ProductModalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[95vw] sm:w-[500px] md:w-[800px] h-[70vh] max-h-[90vh] rounded-3xl bg-[#FFFCF7] border border-stone-200 p-6 shadow-xl">
        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-stone-200 animate-pulse" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 rounded bg-stone-200 animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-stone-200 animate-pulse" />
            <div className="h-10 w-full rounded bg-stone-200 animate-pulse" />
            <div className="h-10 w-full rounded bg-stone-200 animate-pulse" />
            <div className="h-16 w-full rounded bg-stone-200 animate-pulse" />
            <div className="h-12 w-1/2 rounded bg-stone-200 ml-auto animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModalLoading;
