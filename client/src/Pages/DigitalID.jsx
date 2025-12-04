import React from 'react'

const DigitalID = () => {

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">Digital ID — Photo Upload</h2>
      <p className="text-sm text-gray-500 mb-4">
        Take a clear photo of your ID. Camera-only upload.
      </p>

      <div className="relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center">

        {/* Preview box (no JS yet) */}
        <div className="w-full h-56 rounded-md overflow-hidden bg-black hidden">
          <img className="object-contain w-full h-full" />
        </div>

        {/* Camera frame placeholder */}
        <div className="w-full h-56 rounded-md overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11/12 h-3/5 border-2 border-white/80 rounded-md shadow-inner backdrop-blur-sm"></div>
          </div>
          <p className="text-gray-400 text-sm text-center px-4">
            Align your ID inside the rectangle and take a photo.
          </p>
        </div>

        {/* Inputs */}
        <input type="file" accept="image/*" capture="environment" className="hidden" />
        <input type="file" accept="image/*" capture="environment" className="hidden" />

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer shadow-sm text-sm">
            <span>Open Camera</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </label>

          <button className="px-4 py-2 bg-white border rounded-lg shadow-sm text-sm">
            Choose Photo
          </button>
        </div>

        {/* Second buttons (inactive, shown for UI only) */}
        <div className="hidden mt-4 flex gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm text-sm">
            Upload Photo
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg shadow-sm text-sm">
            Retake
          </button>
        </div>

        {/* Messages */}
        <p className="text-sm text-red-500 mt-3 hidden">Error message</p>
        <p className="text-sm text-green-600 mt-3 hidden">Success</p>

        <div className="w-full mt-4 text-xs text-gray-400">
          <p>Camera photos only. Max file size: 5 MB.</p>
        </div>
      </div>

      <ul className="mt-4 text-sm text-gray-500 space-y-1">
        <li>• Use a plain background.</li>
        <li>• Avoid glare and shadows.</li>
        <li>• Keep the entire ID visible.</li>
      </ul>
    </div>
  );
}

export default DigitalID
