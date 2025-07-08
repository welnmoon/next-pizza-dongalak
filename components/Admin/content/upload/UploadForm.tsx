"use client";

import { useState } from "react";

const UploadForm = ({ onUpload }: { onUpload?: (url: string) => void }) => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.imageUrl);
    if (onUpload) onUpload(data.imageUrl); // <-- Добавь это
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="uploaded"
          className="mt-4 w-40 h-40 object-contain"
        />
      )}
    </div>
  );
};

export default UploadForm;
