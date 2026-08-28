export default function ProjectLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <div className="mb-8 h-4 w-32 animate-pulse rounded bg-gray-200" />

      <div className="mb-6 h-10 w-3/4 animate-pulse rounded bg-gray-200" />

      <div className="mb-6 flex gap-4">
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mb-8 h-12 w-40 animate-pulse rounded bg-gray-200" />

      <hr className="my-8 border-gray-200" />

      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="mt-10">
        <div className="mb-4 h-8 w-40 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-7 w-20 animate-pulse rounded border border-gray-200 bg-gray-100" />
          <div className="h-7 w-24 animate-pulse rounded border border-gray-200 bg-gray-100" />
          <div className="h-7 w-16 animate-pulse rounded border border-gray-200 bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
