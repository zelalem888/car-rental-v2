const DocumentPreview = ({ title, src }) => {
  const isPDF = src.endsWith(".pdf");

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        {title}
      </h3>

      {isPDF ? (
        <iframe
          src={src}
          title={title}
          className="w-full h-[80vh] border rounded-md"
        />
      ) : (
        <img
          src={src}
          alt={title}
          className="w-full max-h-[80vh] object-contain border rounded-md"
        />
      )}
    </div>
  );
};

export default DocumentPreview;
