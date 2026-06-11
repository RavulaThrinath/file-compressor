import { useState } from "react";
import axios from "axios";
import UploadBox from "../components/UploadBox";
import QualitySlider from "../components/QualitySlider";
import ImagePreview from "../components/ImagePreview";
import { Shield, Zap, Cloud, Download } from "lucide-react";
import bgImage from "../assets/bg-svg.svg";

function Home() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(60);
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [step, setStep] = useState(1);
  const [downloadUrl, setDownloadUrl] = useState(null);
  // const [preset, setPreset] = useState("balanced");

  const compressImage = async () => {
    if (!file) return;

    setOriginalSize(file.size);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("quality", quality);

      const response = await axios.post(
        "https://file-compressor-api-1nlu.onrender.com/compress",
        formData,
        {
          responseType: "blob",
        },
      );

      setCompressedSize(response.data.size);

      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }

      const url = window.URL.createObjectURL(response.data);

      setDownloadUrl(url);
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setCompressedSize(0);
    setDownloadUrl(null);
    setStep(2);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `
    linear-gradient(
      135deg,
      rgba(255,255,255,0.93),
      rgba(255,255,255,0.93)
    ),
    url(${bgImage})
  `,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="mt-6 text-6xl font-bold tracking-tight text-slate-900">
            Compress Files In Seconds
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-12 shadow-lg shadow-slate-100">
          {!file ? (
            <UploadBox onFileSelect={handleFileSelect} />
          ) : (
            <>
              <>
                {file?.type === "application/pdf" ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
                    <div className="text-6xl mb-4">📄</div>

                    <h3 className="text-xl font-semibold text-slate-900">
                      PDF Ready
                    </h3>

                    <p className="text-blue-700 mt-2">
                      Optimize and compress your PDF document.
                    </p>
                  </div>
                ) : (
                  <ImagePreview file={file} />
                )}

                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">
                    File Details
                  </h3>

                  <div className="space-y-2 text-slate-600">
                    <p>
                      <strong>Name:</strong> {file.name}
                    </p>

                    <p>
                      <strong>Size:</strong>{" "}
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <p>
                      <strong>Type:</strong> {file.type}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setFile(null);
                      setStep(1);
                      setCompressedSize(0);
                      setOriginalSize(0);
                      setDownloadUrl(null);
                    }}
                    className="mt-4 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Choose Another File
                  </button>
                </div>

                <div className="mt-6">
                  <p className="font-semibold text-slate-900 mb-3">
                    Compression Preset
                  </p>

                  {/* Your preset buttons */}
                </div>

                <QualitySlider quality={quality} setQuality={setQuality} />

                <button
                  onClick={compressImage}
                  disabled={loading}
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-all cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Compressing...
                    </div>
                  ) : file?.type === "application/pdf" ? (
                    "Compress PDF"
                  ) : (
                    "Compress File"
                  )}
                </button>
              </>
            </>
          )}

          {/* Results */}
          {step === 3 && (
            <div className="mt-8">
              <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-700 font-medium">
                  ✅ Compression completed successfully
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="
bg-white
border
border-slate-200
rounded-3xl
p-8
text-center
shadow-md
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
"
                >
                  <p className="text-sm text-gray-500 mb-2">Original Size</p>

                  <p className="text-2xl font-bold text-slate-900">
                    {(originalSize / 1024).toFixed(2)} KB
                  </p>
                </div>

                <div
                  className="
bg-white
border
border-slate-200
rounded-3xl
p-8
text-center
shadow-md
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
"
                >
                  <p className="text-sm text-gray-500 mb-2">Compressed Size</p>

                  <p className="text-2xl font-bold text-slate-900">
                    {(compressedSize / 1024).toFixed(2)} KB
                  </p>
                </div>

                <div
                  className="
bg-white
border
border-slate-200
rounded-3xl
p-8
text-center
shadow-md
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
"
                >
                  <p className="text-sm text-gray-500 mb-2">Space Saved</p>

                  <p className="text-2xl font-bold text-green-600">
                    {(
                      ((originalSize - compressedSize) / originalSize) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>

              <a
                href={downloadUrl}
                download={`compressed-${file.name}`}
                className="
    block
    text-center
    mt-6
    bg-gradient-to-r
    from-emerald-500
    to-emerald-600
    hover:from-emerald-600
    hover:to-emerald-700
    text-white
    font-semibold
    py-4
    rounded-2xl
    shadow-lg
    transition-all
    cursor-pointer
  "
              >
                Download Compressed File
              </a>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <p className="text-center text-sm text-slate-500 mt-10 mb-4">
          Trusted for secure and fast file compression
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <Shield size={18} />
            <span className="text-sm text-slate-600">Secure Processing</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <Zap size={18} />
            <span className="text-sm text-slate-600">Fast Compression</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <Cloud size={18} />
            <span className="text-sm text-slate-600">No File Storage</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <Download size={18} />
            <span className="text-sm text-slate-600">Free Forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
