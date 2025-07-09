"use client";

import { useEffect, useRef, useState } from "react";

const UploadForm = ({
  onUpload,
  resetUploadForm,
}: {
  onUpload?: (url: string) => void;
  resetUploadForm: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resetUploadForm) {
      setImageUrl("");
      setFileName("");
    }
  }, [resetUploadForm]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name); // отображаем имя файла

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setImageUrl(data.imageUrl);
    if (onUpload) onUpload(data.imageUrl);
  };

  return (
    <div className="space-y-2">
      {/* Скрытый input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => fileInputRef.current?.click()}
      >
        Загрузить картинку
      </button>

      {/* Отображение выбранного имени файла */}
      <p className="text-sm text-gray-700">{fileName || "Файл не выбран"}</p>

      {/* Превью картинки */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="uploaded"
          className="mt-4 w-40 h-40 object-contain border"
        />
      )}
    </div>
  );
};

export default UploadForm;
