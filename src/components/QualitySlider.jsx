function QualitySlider({ quality, setQuality }) {
  return (
    <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Compression Quality</h3>

        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
          {quality}%
        </span>
      </div>

      <input
        type="range"
        min="10"
        max="100"
        value={quality}
        onChange={(e) => setQuality(Number(e.target.value))}
        className="w-full cursor-pointer"
      />

      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>Smaller File</span>
        <span>Better Quality</span>
      </div>
    </div>
  );
}

export default QualitySlider;
