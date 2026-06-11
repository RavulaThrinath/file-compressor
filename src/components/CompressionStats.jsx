function CompressionStats({ originalSize, compressedSize }) {
  if (!compressedSize) return null;

  const savings = (
    ((originalSize - compressedSize) / originalSize) *
    100
  ).toFixed(1);

  return (
    <div className="mt-6 bg-slate-800 p-4 rounded-lg text-white">
      <p>Original: {(originalSize / 1024).toFixed(2)} KB</p>
      <p>Compressed: {(compressedSize / 1024).toFixed(2)} KB</p>
      <p>Saved: {savings}%</p>
    </div>
  );
}

export default CompressionStats;
