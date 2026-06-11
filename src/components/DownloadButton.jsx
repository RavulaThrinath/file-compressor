function DownloadButton({ url, fileName }) {
  return (
    <a
      href={url}
      download={`compressed-${fileName}`}
      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium"
    >
      Download File
    </a>
  );
}

export default DownloadButton;
