import { useState } from "react";
import axios from "axios";

export default function WikiFetcher({ onSectionsFetched }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWiki = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/fetch-wiki", { topic });
      onSectionsFetched(res.data);
    } catch (err) {
      console.error("Failed to fetch via backend:", err.message);
      alert("Failed to fetch Wikipedia page. Check the topic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter Wikipedia topic"
        className="border p-2 rounded flex-grow"
      />
      <button
        onClick={fetchWiki}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch"}
      </button>
    </div>
  );
}
