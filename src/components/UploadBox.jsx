import { useDropzone } from "react-dropzone";

function UploadBox({ onFileSelect }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "application/pdf": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="
    border-2
    border-dashed
    border-slate-300
    rounded-3xl
    p-24
    bg-slate-50
    hover:bg-slate-100
    hover:border-blue-400
    transition-all
    duration-300
    cursor-pointer
  "
    >
      <input {...getInputProps()} />

      <div className="text-center">
        <div className="text-6xl mb-6">📁</div>

        <h2 className="text-2xl font-semibold text-slate-900">
          Upload Your File
        </h2>

        <p className="text-slate-500 mt-3">
          Drag & drop files here or click to browse
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-sm border border-slate-200">
            JPG
          </span>

          <span className="px-3 py-1 bg-white rounded-full text-sm border border-slate-200">
            JPEG
          </span>

          <span className="px-3 py-1 bg-white rounded-full text-sm border border-slate-200">
            PNG
          </span>

          <span className="px-3 py-1 bg-white rounded-full text-sm border border-slate-200">
            WebP
          </span>

          <span className="px-3 py-1 bg-white rounded-full text-sm border border-slate-200">
            PDF
          </span>
        </div>
      </div>
    </div>
  );
}

export default UploadBox;
