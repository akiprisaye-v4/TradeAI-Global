import { useState } from "react";

export default function useImageSearch() {
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState([]);

  function handleImageUpload(file) {
    setImageFile(file || null);
    setResults([]);
    setStatus(file ? "ready_for_real_connector" : "idle");
  }

  async function searchByImage() {
    setResults([]);
    setStatus("connector_required");
    return {
      ok: false,
      reason: "IMAGE_SEARCH_CONNECTOR_REQUIRED",
      message:
        "La recherche image nécessite un connecteur réel ou un import catalogue vérifiable. Aucun résultat simulé n’est généré."
    };
  }

  return {
    imageFile,
    status,
    results,
    handleImageUpload,
    searchByImage
  };
}
