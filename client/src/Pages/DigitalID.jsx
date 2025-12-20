import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DigitalID = () => {
  const { id } = useParams();
  const navigate = useNavigate()
   const [previews, setPreviews] = useState({
    digital_id: null,
  });
 const [form, setForm] = useState({
    digital_id: null,
  });

useEffect(()=>{
  const fetchData = async ()=>{
  const check =  await fetch(`http://localhost:3000/api/user/document/check/${id}`)
  const checkComplete = await check.json()
  if(checkComplete.doc === true){
    navigate(`/myreservation/${id}`)
  }
  }
  fetchData()
},[])

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log(name)
    if (files && files[0]) {
      setPreviews((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));

      setForm((prev)=>({
        ...prev,
        [name] : files[0]
      }))

    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("reservation_id", id);
    formData.append("digital_id", form.digital_id)

    console.log("Submitting documents...");
    const response = await fetch(`http://localhost:3000/api/user/upload/document/${id}`, {
        method: "POST",
        body: formData,
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const successData = await response.json()
      // alert(successData.message)
      console.log(successData)
      navigate("/")

  };

  const Preview = ({ src }) => {
    if (!src) return null;

    return (
      <div className="mt-3">
        <img
          src={src}
          alt="Preview"
          className="max-h-48 rounded-md border bg-gray-50 object-contain"
        />
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full max-w-5xl mx-auto my-20 px-6"
    >
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Document Verification
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Upload the required documents to proceed.
      </p>

      <div className="h-px bg-gray-200 my-6" />

      <div className="space-y-8">

        {/* Digital ID */}
        <div>
          <label className="block font-medium text-gray-800">
            Digital ID <span className="text-xs text-red-500">(Required)</span>
          </label>

          <input
            type="file"
            name="digital_id"
            accept="image/*"
            required
            onChange={(e)=> handleFileChange(e)}
            className="mt-2 block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />

          <Preview src={previews.digital_id} />
        </div>
  
      </div>

      <div className="h-px bg-gray-200 my-8" />

      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <p className="text-xs text-gray-400">
          JPG, PNG, • Max 5MB per document
        </p>
        <div className="flex gap-4">
         <Link
        to={"/"}>
        <button
          className="bg-red-600 text-white px-8 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
        >
          Later
        </button>
        </Link>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          Submit Documents
        </button>
       
      </div>
      </div>
    </form>
  );
};

export default DigitalID;
