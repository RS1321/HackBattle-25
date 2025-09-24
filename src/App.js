import { useState } from "react";
import WikiFetcher from "./components/WikiFetcher";
import InteractiveSection from "./components/InteractiveSection";

export default function App() {
  const [sections, setSections] = useState([]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Interactive Wikipedia Textbook
      </h1>

      <WikiFetcher onSectionsFetched={setSections} />

      {sections.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          Enter a Wikipedia topic above to start.
        </p>
      )}

      {sections.map((sec, idx) => (
        <InteractiveSection key={idx} section={sec} />
      ))}
    </div>
  );
}
