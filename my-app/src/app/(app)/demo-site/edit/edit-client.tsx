'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type Style = {
  color: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
};

type TextContent = {
  text: string;
  style: Style;
};

type FeatureService = {
  title: TextContent;
  description: TextContent;
};

type Content = {
  pageColor:TextContent
  heroTitle: TextContent;
  heroSubtitle: TextContent;
  features: FeatureService[];
  about: TextContent;
  services: FeatureService[];
  contact: TextContent;
};


export default function EditableDemoPage() {

  const { data: session } = useSession();
  const router = useRouter()
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [randerValue ,setRenderValue] = useState<EditableTextField| null>(null)
  type SelectedField = {
    type: "features" | "services";
    index: number;
    key: "title" | "description";
  } | null;

  const [selectedField, setSelectedField] = useState<SelectedField>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
// Generic handlers

  useEffect(() => {
    fetch("/api/content-edit")
      .then((res) => res.json())
      .then((data: { content: Content; status: string; message?: string }) => {
        setContent(data.content);
        setLoading(false);

        // Show popup message for 3 seconds
        if (data.message) {
          setPopupMessage(data.message);
          setTimeout(() => setPopupMessage(null), 3000);
        }
      })
      .catch((err) => console.error("Error fetching content:", err));
  }, []);



    if (loading || !content) return(
      <div className="text-white pt-7 lg:px-7 z-20 mx-auto max-w-[1460px] w-11/12 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinning loader */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold tracking-wide">Loading...</p>
        </div>
      </div>
    )
      const handleTextChange = (field: keyof Content, value: string) => {
      setContent({ ...content, [field]: { ...content[field], text: value } });
    };

    if (!session?.user) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-4">You must be logged in to edit this page</h2>
                <button
                onClick={() => router.push('/auth/sign-in')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                Sign up
                </button>
            </div>
        );
    }
    
    type EditableTextField =  "heroTitle" | "heroSubtitle" | "about" | "contact" ;

    const handleStyleChange = (field: EditableTextField, styleKey: keyof Style, value: string) => {
    setContent({
        ...content,
        [field]: {
        ...content[field],
        style: { ...content[field].style, [styleKey]: value },
        },
    });
    };


  const handleFeatureServiceChange = (index: number, type: "features" | "services", key: "title" | "description", field: "text" | "style", subKey?: keyof Style, value?: string) => {
    const updated = [...content[type]];
    if (field === "text") {
      updated[index][key].text = value!;
    } else if (field === "style" && subKey) {
      updated[index][key].style[subKey] = value!;
    }
    setContent({ ...content, [type]: updated });
  };

  const addFeatureService = (type: "features" | "services") => {
    const newItem: FeatureService = {
      title: { text: "New Item", style: { color: "#000", fontSize: "1.25rem", fontWeight: "bold", fontStyle: "normal" } },
      description: { text: "Description...", style: { color: "#333", fontSize: "1rem", fontWeight: "normal", fontStyle: "normal" } },
    };
    setContent({ ...content, [type]: [...content[type], newItem] });
  };
  
const renderStyleControls = (field: EditableTextField) => (
  <div className="flex gap-3 justify-center mt-2 items-center bg-black rounded-full top-10 fixed w-[320px] z-[9999] left-[50%] -translate-x-[50%] shadow-lg p-2">
    
    {/* Color picker */}
    <div className="w-8 h-8 rounded-full  border-2 border-white overflow-hidden flex items-center justify-center cursor-pointer">
      <input
        type="color"
        value={content[field].style.color}
        onChange={(e) => handleStyleChange(field, "color", e.target.value)}
        className="w-full h-full p-0 border-none cursor-pointer scale-150"
      />
    </div>

    {/* Font size control */}
    <div className="flex items-center border rounded-full overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => handleStyleChange(field, "fontSize", `${Math.max(1, parseFloat(content[field].style.fontSize) - 0.5)}rem`)}
        className="px-3 py-1 text-lg font-bold hover:bg-gray-200 transition"
      >
        -
      </button>
      <input
        type="text"
        readOnly
        value={content[field].style.fontSize}
        className="w-16 text-center font-medium"
      />
      <button
        type="button"
        onClick={() => handleStyleChange(field, "fontSize", `${Math.min(3, parseFloat(content[field].style.fontSize) + 0.5)}rem`)}
        className="px-3 py-1 text-lg font-bold hover:bg-gray-200 transition"
      >
        +
      </button>
    </div>

    {/* Bold button */}
    <button
      onClick={() =>
        handleStyleChange(
          field,
          "fontWeight",
          content[field].style.fontWeight === "bold" ? "normal" : "bold"
        )
      }
      className={`
        px-3 py-1 rounded-md border transition-all duration-200
        ${content[field].style.fontWeight === "bold" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
      `}
      title={content[field].style.fontWeight === "bold" ? "Bold" : "Normal"}
    >
      <span className={`${content[field].style.fontWeight === "bold" ? 'font-extrabold text-xl' : 'font-bold text-lg'}`}>B</span>
    </button>

    {/* Italic button */}
    <button
      onClick={() =>
        handleStyleChange(
          field,
          "fontStyle",
          content[field].style.fontStyle === "italic" ? "normal" : "italic"
        )
      }
      className={`
        px-3 py-1 rounded-md border transition-all duration-200
        ${content[field].style.fontStyle === "italic" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
      `}
      title={content[field].style.fontStyle === "italic" ? "Italic" : "Normal"}
    >
      <span className={`${content[field].style.fontStyle === "italic" ? 'font-extrabold text-xl italic' : 'font-bold text-lg'}`}>I</span>
    </button>

  </div>

);
const renderFeatureServiceStyleControls = (
  type: "features" | "services",
  index: number,
  key: "title" | "description"
) => {
  const item = content[type][index][key];

  return (
    <div className="flex gap-3 justify-center mt-2 items-center bg-black rounded-full fixed top-10 w-[320px] z-[9999] left-[50%] -translate-x-[50%] shadow-lg p-2">
      {/* Color picker */}

      <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex items-center justify-center cursor-pointer">
        <input
          type="color"
          value={item.style.color}
          onChange={(e) => handleFeatureServiceChange(index, type, key, "style", "color", e.target.value)}
          className="w-full h-full p-0 border-none cursor-pointer scale-150"
        />
      </div>


      {/* Font size */}
      <div className="flex items-center border rounded-full overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => handleFeatureServiceChange( index, type, key, "style", "fontSize", `${Math.max(0.5, parseFloat(item.style.fontSize) - 0.1)}rem`)}
          className="px-3 py-1 text-lg font-bold hover:bg-gray-200 transition"
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={item.style.fontSize}
          className="w-16 text-center font-medium"
        />
        <button
          onClick={() => handleFeatureServiceChange( index, type, key, "style", "fontSize", `${Math.min(3, parseFloat(item.style.fontSize) + 0.1)}rem` )}
          className="px-3 py-1 text-lg font-bold hover:bg-gray-200 transition"
        >
          +
        </button>
      </div>
      {/* Bold toggle */}
      <button
        onClick={() =>
          handleFeatureServiceChange(
            index,
            type,
            key,
            "style",
            "fontWeight",
            item.style.fontWeight === "bold" ? "normal" : "bold"
          )
        }
        className={`px-3 py-1 rounded-md border transition-all duration-200 ${
          item.style.fontWeight === "bold" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
      <span className={`${item.style.fontWeight === "bold" ? 'font-extrabold text-xl' : 'font-bold text-lg'}`}>B</span>
      </button>

    </div>
  );
};


const handleReset = async () => {
  try {
    const res = await axios.post("/api/reset-content")
      
    if (res.status === 200) {
      setPopupMessage(res.data.message);
      setTimeout(() => setPopupMessage(null), 3000);
      window.location.reload()
    } else {
      setPopupMessage(res.data.message);
      setTimeout(() => setPopupMessage(null), 3000);
    }
  } catch (err) {
    console.error(err);
  }
};
const handleSave = async (status: "Live" | "Draft" | "Cancel") => {
  if(status === 'Cancel'){
    window.location.reload()
    return
  }
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...content, status }), // send status
    });

    const result = await res.json();
    if (result.success) {
      setPopupMessage(result.message);
      setTimeout(() => setPopupMessage(null), 3000);
    } else {
      alert("Failed to save changes.");
    }
  } catch (err) {
    console.error(err);
    alert("Error saving changes.");
  }
};

const deleteFeatureService = (index: number, type: "features" | "services") => {
  const updated = [...content[type]];
  updated.splice(index, 1); // remove the item
  setContent({ ...content, [type]: updated });
};


return (
  <main className="font-sans text-gray-900 bg-gray-50 p-6">
    {/* Hero */}
    <section className="bg-indigo-600 py-20 px-6 text-center relative">
      <button onClick={handleReset} className="px-6 py-2 bg-red-600 text-white rounded font-semibold absolute top-3 right-3">Reset to Default</button>
      {randerValue && renderStyleControls(randerValue)}
      {selectedField && renderFeatureServiceStyleControls( selectedField.type, selectedField.index, selectedField.key )}
      {popupMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1abc9c] text-white px-8 py-6 rounded shadow-xl z-50 text-xl md:text-2xl font-bold animate-fade-in-out max-w-lg text-center">
          {popupMessage}
        </div>
      )}
      <div className="pb-10"></div>
      <div className="text-center my-6 flex gap-4 justify-center ">
      <div className="text-center my-6 flex gap-4 justify-center items-center">
        <button
          onClick={() => handleSave("Live")}
          className="px-6 py-2 bg-green-600 text-white rounded font-semibold"
        >
          Live
        </button>

        <button
          onClick={() => handleSave("Draft")}
          className="px-6 py-2 bg-yellow-500 text-white rounded font-semibold"
        >
          Draft
        </button>

        <button
          onClick={() => handleSave("Cancel")}
          className="px-6 py-2 bg-red-600 text-white rounded font-semibold"
        >
          Cancel
        </button>
      </div>
      </div>

      <input
        type="text"
        value={content.heroTitle.text}
        onChange={(e) => handleTextChange("heroTitle", e.target.value)}
        style={{ ...content.heroTitle.style }}
        onClick={() => {setRenderValue("heroTitle"); setSelectedField(null)}}
        className={`mb-4 w-full bg-indigo-600 border-white focus:outline-none text-center  ${randerValue === 'heroTitle' ? ' border-b' : 'border-0'}`}
      />
      
      <textarea
        value={content.heroSubtitle.text}
        onChange={(e) => handleTextChange("heroSubtitle", e.target.value)}
        style={{ ...content.heroSubtitle.style }}
        className={`text-lg md:text-xl max-w-2xl mx-auto w-full bg-indigo-600 border-white focus:outline-none text-center ${randerValue === 'heroSubtitle' ? ' border-b' : 'border-0'}`}
        onClick={() => setRenderValue("heroSubtitle")}
      />
    </section>

    {/* Features */}
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => (
              <div key={index} className={`p-6 bg-white rounded-xl shadow hover:shadow-lg transition relative ${selectedField?.index === index && selectedField?.type === "features" ? ' border-2' : 'border-0'}`}>
                  {/* Delete button */}
                  <button
                  onClick={() => deleteFeatureService(index, "features")}
                  className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
                  >
                  &times;
                  </button>

                  <input
                  type="text"
                  value={feature.title.text}
                  onChange={(e) => handleFeatureServiceChange(index, "features", "title", "text", undefined, e.target.value)}
                  style={{ ...feature.title.style }}
                  onClick={() => {setSelectedField({ type: "features", index, key: "title" }); setRenderValue(null);}}
                  className={`text-xl font-semibold mb-2 w-full pb-1 border-black focus:outline-none  ${selectedField?.index === index && selectedField?.type === "features"  ? ' border-b' : 'border-0'}`}
                  />

                  <textarea
                  value={feature.description.text}
                  onChange={(e) => handleFeatureServiceChange(index, "features", "description", "text", undefined, e.target.value)}
                  style={{ ...feature.description.style }}
                  className={`w-full focus:outline-none border-black  ${selectedField?.index === index && selectedField?.type === "features"  ? ' border-b' : 'border-0'}`}
                  onClick={() => {setSelectedField({ type: "features", index, key: "description" });setRenderValue(null);}}
                  />

              </div>
          ))}

      </div>
      <button onClick={() => addFeatureService("features")} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
        Add Feature
      </button>
    </section>

    {/* About */}
    <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <textarea
        value={content.about.text}
        onChange={(e) => handleTextChange("about", e.target.value)}
        style={{ ...content.about.style }}
        className={`w-full p-2 rounded focus:outline-none mb-2 ${randerValue === 'about' ? ' border' : 'border-0'}`}
        onClick={() => {setRenderValue("about"); setSelectedField(null)}}
        rows={4}
      />
    </section>

    {/* Services */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
          <div key={index} className={`p-6 bg-white rounded-xl shadow hover:shadow-lg transition relative flex flex-col justify-between ${selectedField?.index === index && selectedField?.type === "services" ? ' border-2' : 'border-0'}`}>
              {/* Delete button */}
              <button
              onClick={() => deleteFeatureService(index, "services")}
              className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
              >
              &times;
              </button>

              <input
              type="text"
              value={service.title.text}
              onChange={(e) => handleFeatureServiceChange(index, "services", "title", "text", undefined, e.target.value) }
              onClick={() => {setSelectedField({ type: "services", index, key: "title" }); setRenderValue(null);}}
              style={{ ...service.title.style }}
              className={`text-2xl font-semibold mb-2 w-full  border-black focus:outline-none ${selectedField?.index === index && selectedField?.type === "services" ? ' border-b' : 'border-0'}`}
              />

              <textarea
              value={service.description.text}
              onChange={(e) => handleFeatureServiceChange(index, "services", "description", "text", undefined, e.target.value)}
              onClick={() => {setSelectedField({ type: "services", index, key: "description" });setRenderValue(null);}}
              style={{ ...service.description.style }}
              className={`w-full focus:outline-none border-black ${selectedField?.index === index && selectedField?.type === "services" ? ' border-b' : 'border-0'}`}
              rows={4}
              />
          </div>
          ))}
        </div>
        <button onClick={() => addFeatureService("services")} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
            Add Service
        </button>
      </section>


    {/* Contact */}
    <section className="py-16 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <textarea
        value={content.contact.text}
        onChange={(e) => handleTextChange("contact", e.target.value)}
        style={{ ...content.contact.style }}
        className={`w-full max-w-xl p-2 rounded focus:outline-none mb-2 ${randerValue === 'contact' ? ' border' : 'border-0'}`}
        onClick={() => {setRenderValue("contact"); setSelectedField(null)}}
        rows={3}
      />
    </section>

    {/* Footer & Save */}
    <footer className="py-8 bg-gray-200 text-gray-600 text-center text-sm">
      &copy; {new Date().getFullYear()} Demo Site. All rights reserved.
    </footer>
  </main>
);
}
