function ImagePreview({ file }) {
  if (!file) return null;

  return (
    <div className="mt-6">
      <img
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="w-full max-h-80 object-contain rounded-lg"
      />
    </div>
  );
}

export default ImagePreview;
