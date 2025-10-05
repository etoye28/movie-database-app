import React from "react";
export default function Pagination({ page, totalPages, onPage }) {
  const prev = () => onPage(Math.max(1, page-1));
  const next = () => onPage(Math.min(totalPages, page+1));
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button onClick={prev} disabled={page<=1} className="px-3 py-1 rounded border">Prev</button>
      <div>Page {page} / {totalPages}</div>
      <button onClick={next} disabled={page>=totalPages} className="px-3 py-1 rounded border">Next</button>
    </div>
  );
}
