import { useState } from "react";

export default function useImageSearch() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageResults, setImageResults] = useState(false);
  const [amazonResults, setAmazonResults] = useState([]);
  const [alibabaResults, setAlibabaResults] = useState([]);

  const handleImageUpload = async (file) => {
    setUploadedImage(file);

    if (!file) return;

    setAmazonResults([
      { name: "Produit Amazon 1", price: "€29.99", image: file },
      { name: "Produit Amazon 2", price: "€34.99", image: file }
    ]);

    setAlibabaResults([
      { name: "Produit Alibaba 1", price: "€5.50", image: file },
      { name: "Produit Alibaba 2", price: "€4.20", image: file }
    ]);

    setImageResults(true);
  };

  return {
    uploadedImage,
    imageResults,
    amazonResults,
    alibabaResults,
    handleImageUpload
  };
}
