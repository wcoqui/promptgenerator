import React, { useState, useEffect } from "react";

const AdvancedPromptGenerator = () => {
  // Core settings
  const [category, setCategory] = useState("Fantasy");
  const [style, setStyle] = useState("Realistic");
  const [subject, setSubject] = useState("");
  const [mood, setMood] = useState("Mysterious");
  const [composition, setComposition] = useState("Centered");
  
  // Visual settings
  const [lighting, setLighting] = useState("Soft");
  const [colorScheme, setColorScheme] = useState("Vibrant");
  const [details, setDetails] = useState("High Detail");
  const [perspective, setPerspective] = useState("Eye level");
  const [timeOfDay, setTimeOfDay] = useState("Day");
  
  // Camera settings
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  
  // Advanced settings
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [extraDetails, setExtraDetails] = useState("");
  
  // UI states
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCameraOptions, setShowCameraOptions] = useState(false);
  const [selectedArtistInfo, setSelectedArtistInfo] = useState(null);
  
  // Artist data with style descriptions
  useEffect(() => {
    setArtists([
      {
        name: "Greg Rutkowski", 
        style: "Fantasy art with detailed environments and dramatic lighting",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Alphonse Mucha", 
        style: "Art Nouveau with elegant figures, ornate floral elements, and decorative patterns",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Hayao Miyazaki", 
        style: "Whimsical anime with beautiful natural worlds and intricate detail",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Simon Stålenhag", 
        style: "Sci-fi landscapes blending rural environments with futuristic technology",
        image: "/api/placeholder/100/60"
      },
      {
        name: "James Gurney", 
        style: "Realistic fantasy environments with vivid colors and scientific accuracy",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Ross Tran", 
        style: "Vibrant digital paintings with dynamic lighting and expressive figures",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Artgerm", 
        style: "Polished digital portraits with perfect lighting and idealized features",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Moebius", 
        style: "Clean line art with vibrant colors and surreal sci-fi themes",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Andy Warhol", 
        style: "Pop art with bold colors, repetition, and cultural imagery",
        image: "/api/placeholder/100/60"
      },
      {
        name: "Salvador Dalí", 
        style: "Surrealism with dreamlike imagery and melting, distorted objects",
        image: "/api/placeholder/100/60"
      }
    ]);
  }, []);
  
  const toggleArtist = (artist) => {
    if (selectedArtists.includes(artist.name)) {
      setSelectedArtists(selectedArtists.filter(a => a !== artist.name));
    } else {
      setSelectedArtists([...selectedArtists, artist.name]);
    }
  };
  
  const showArtistInfo = (artist) => {
    setSelectedArtistInfo(artist);
    setTimeout(() => {
      setSelectedArtistInfo(null);
    }, 3000);
  };
  
  const generatePrompt = () => {
    let prompt = "";
    
    // Add subject if provided
    if (subject) {
      prompt = `${subject}`;
    } else {
      prompt = `A ${category.toLowerCase()} scene`;
    }
    
    // Add core visual elements
    prompt += ` with ${style.toLowerCase()} style`;
    
    // Add composition and perspective
    prompt += `, ${composition.toLowerCase()} composition, ${perspective.toLowerCase()} perspective`;
    
    // Add mood and time
    prompt += `, ${mood.toLowerCase()} mood, ${timeOfDay.toLowerCase()} time`;
    
    // Add visual details
    prompt += `, ${lighting.toLowerCase()} lighting, ${colorScheme.toLowerCase()} colors, ${details.toLowerCase()} details`;
    
    // Add camera settings if selected
    if (camera) {
      prompt += `, shot on ${camera}`;
    }
    
    if (lens) {
      prompt += `, ${lens}`;
    }
    
    // Add artist inspiration if selected
    if (selectedArtists.length > 0) {
      prompt += `, in the style of ${selectedArtists.join(", ")}`;
    }
    
    // Add aspect ratio
    prompt += `, ${aspectRatio} aspect ratio`;
    
    // Add extra details if provided
    if (extraDetails) {
      prompt += `, ${extraDetails}`;
    }
    
    setGeneratedPrompt(prompt);
  };
  
  const savePrompt = () => {
    if (generatedPrompt && !savedPrompts.includes(generatedPrompt)) {
      setSavedPrompts([...savedPrompts, generatedPrompt]);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert("Prompt copied to clipboard!");
  };
  
  const clearPrompt = () => {
    setGeneratedPrompt("");
  };
  
  return (
    <div className="p-4 space-y-4 border rounded shadow-lg max-w-4xl mx-auto bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-center text-blue-600">Reve.art Advanced Prompt Generator</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowCameraOptions(!showCameraOptions)}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {showCameraOptions ? "Hide Camera" : "Show Camera"}
          </button>
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {showAdvanced ? "Hide Advanced" : "Show Advanced"}
          </button>
        </div>
      </div>
      
      {/* Main Input for Subject */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Main Subject (optional)</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Describe your main subject (e.g., 'A wizard in a forest')"
          className="w-full p-2 border rounded"
        />
      </div>
      
      {/* Core Settings */}
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2 text-gray-700">Core Settings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select 
              className="w-full border p-2 rounded" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Fantasy</option>
              <option>Sci-Fi</option>
              <option>Cyberpunk</option>
              <option>Nature</option>
              <option>Portrait</option>
              <option>Architecture</option>
              <option>Cityscape</option>
              <option>Surreal</option>
              <option>Steampunk</option>
              <option>Horror</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Style</label>
            <select 
              className="w-full border p-2 rounded" 
              value={style} 
              onChange={(e) => setStyle(e.target.value)}
            >
              <option>Realistic</option>
              <option>Cartoon</option>
              <option>Anime</option>
              <option>Abstract</option>
              <option>Digital Art</option>
              <option>Oil Painting</option>
              <option>Watercolor</option>
              <option>Pixel Art</option>
              <option>Concept Art</option>
              <option>Illustration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mood</label>
            <select 
              className="w-full border p-2 rounded" 
              value={mood} 
              onChange={(e) => setMood(e.target.value)}
            >
              <option>Mysterious</option>
              <option>Peaceful</option>
              <option>Dramatic</option>
              <option>Energetic</option>
              <option>Melancholic</option>
              <option>Joyful</option>
              <option>Tense</option>
              <option>Ethereal</option>
              <option>Gritty</option>
              <option>Romantic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Composition</label>
            <select 
              className="w-full border p-2 rounded" 
              value={composition} 
              onChange={(e) => setComposition(e.target.value)}
            >
              <option>Centered</option>
              <option>Rule of Thirds</option>
              <option>Symmetrical</option>
              <option>Asymmetrical</option>
              <option>Diagonal</option>
              <option>Cinematic</option>
              <option>Bird's eye view</option>
              <option>Macro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Perspective</label>
            <select 
              className="w-full border p-2 rounded" 
              value={perspective} 
              onChange={(e) => setPerspective(e.target.value)}
            >
              <option>Eye level</option>
              <option>Aerial view</option>
              <option>Low angle</option>
              <option>High angle</option>
              <option>Dutch angle</option>
              <option>First person</option>
              <option>Isometric</option>
              <option>Panoramic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time of Day</label>
            <select 
              className="w-full border p-2 rounded" 
              value={timeOfDay} 
              onChange={(e) => setTimeOfDay(e.target.value)}
            >
              <option>Day</option>
              <option>Night</option>
              <option>Dawn</option>
              <option>Dusk</option>
              <option>Golden hour</option>
              <option>Blue hour</option>
              <option>Midday</option>
              <option>Midnight</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Camera Settings */}
      {showCameraOptions && (
        <div className="mb-2 p-3 bg-gray-50 rounded border">
          <h2 className="font-semibold text-lg mb-2 text-gray-700">Camera Settings</h2>
          <p className="text-xs text-gray-500 mb-3">Camera settings can dramatically change the look and feel of the generated image.</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Camera Type</label>
              <select 
                className="w-full border p-2 rounded" 
                value={camera} 
                onChange={(e) => setCamera(e.target.value)}
              >
                <option value="">None (don't specify)</option>
                <option>Canon EOS R5</option>
                <option>Sony A7R IV</option>
                <option>Nikon Z9</option>
                <option>Hasselblad X2D</option>
                <option>Leica M11</option>
                <option>Fujifilm GFX 100S</option>
                <option>IMAX Camera</option>
                <option>8mm film camera</option>
                <option>Polaroid camera</option>
                <option>Cinematic camera</option>
                <option>Professional studio camera</option>
                <option>iPhone 16 Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Lens/Effect</label>
              <select 
                className="w-full border p-2 rounded" 
                value={lens} 
                onChange={(e) => setLens(e.target.value)}
              >
                <option value="">None (don't specify)</option>
                <option>wide angle lens</option>
                <option>telephoto lens</option>
                <option>macro lens</option>
                <option>50mm lens</option>
                <option>85mm portrait lens</option>
                <option>35mm lens</option>
                <option>fisheye lens</option>
                <option>tilt-shift lens</option>
                <option>bokeh effect</option>
                <option>depth of field</option>
                <option>motion blur</option>
                <option>HDR</option>
                <option>long exposure</option>
              </select>
            </div>
          </div>
          
          <div className="mt-2 text-xs p-2 bg-blue-50 rounded border border-blue-100 text-blue-700">
            <strong>Tip:</strong> Using specific camera gear can enhance realism. For artistic images, consider leaving these unspecified.
          </div>
        </div>
      )}
      
      {/* Visual Settings */}
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2 text-gray-700">Visual Settings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Lighting</label>
            <select 
              className="w-full border p-2 rounded" 
              value={lighting} 
              onChange={(e) => setLighting(e.target.value)}
            >
              <option>Soft</option>
              <option>Dramatic</option>
              <option>Neon</option>
              <option>Natural</option>
              <option>Backlit</option>
              <option>Rim lighting</option>
              <option>Volumetric</option>
              <option>Studio lighting</option>
              <option>Cinematic lighting</option>
              <option>Candlelight</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Color Scheme</label>
            <select 
              className="w-full border p-2 rounded" 
              value={colorScheme} 
              onChange={(e) => setColorScheme(e.target.value)}
            >
              <option>Vibrant</option>
              <option>Pastel</option>
              <option>Monochrome</option>
              <option>Dark Tones</option>
              <option>Complementary</option>
              <option>Analogous</option>
              <option>Triadic</option>
              <option>Sepia</option>
              <option>Neon</option>
              <option>Muted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Details</label>
            <select 
              className="w-full border p-2 rounded" 
              value={details} 
              onChange={(e) => setDetails(e.target.value)}
            >
              <option>High Detail</option>
              <option>Minimalist</option>
              <option>Sketchy</option>
              <option>Photorealistic</option>
              <option>Intricate</option>
              <option>Stylized</option>
              <option>Low poly</option>
              <option>Impressionist</option>
              <option>Hyper-detailed</option>
              <option>Retro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Aspect Ratio</label>
            <select 
              className="w-full border p-2 rounded" 
              value={aspectRatio} 
              onChange={(e) => setAspectRatio(e.target.value)}
            >
              <option>16:9</option>
              <option>1:1</option>
              <option>4:3</option>
              <option>9:16</option>
              <option>3:2</option>
              <option>2:3</option>
              <option>21:9</option>
              <option>5:4</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="mb-2 p-3 bg-gray-50 rounded border">
          <h2 className="font-semibold text-lg mb-2 text-gray-700">Advanced Settings</h2>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Artist Inspiration</label>
            <p className="text-xs text-gray-500 mb-2">Click an artist to add to your prompt. Hover/tap to see style description.</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {artists.map((artist) => (
                <div key={artist.name} className="relative inline-block">
                  <button
                    onClick={() => toggleArtist(artist)}
                    onMouseEnter={() => showArtistInfo(artist)}
                    onMouseLeave={() => setSelectedArtistInfo(null)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      selectedArtists.includes(artist.name) 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {artist.name}
                    <span className="ml-1 text-xs cursor-help">ℹ️</span>
                  </button>
                  
                  {selectedArtistInfo && selectedArtistInfo.name === artist.name && (
                    <div className="absolute z-10 w-48 p-2 mt-1 text-xs bg-white rounded shadow-lg border border-gray-200">
                      <div className="flex mb-1">
                        <div className="w-full">
                          <strong>{artist.name}</strong>
                          <p>{artist.style}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
            <input
              type="text"
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
              placeholder="Add any specific details (materials, techniques, elements, etc.)"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt (things to avoid)</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="Elements to avoid (e.g., 'blurry, distorted faces')"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}
      
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={generatePrompt} 
          className="flex-grow bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
        >
          Generate Prompt
        </button>
        <button 
          onClick={savePrompt} 
          disabled={!generatedPrompt}
          className={`px-4 py-2 rounded transition-colors ${
            generatedPrompt 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save
        </button>
        <button 
          onClick={copyToClipboard} 
          disabled={!generatedPrompt}
          className={`px-4 py-2 rounded transition-colors ${
            generatedPrompt 
              ? 'bg-purple-500 hover:bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Copy
        </button>
        <button 
          onClick={clearPrompt} 
          disabled={!generatedPrompt}
          className={`px-4 py-2 rounded transition-colors ${
            generatedPrompt 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Clear
        </button>
      </div>
      
      {/* Generated Prompt */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Generated Prompt</label>
        <textarea 
          readOnly 
          value={generatedPrompt} 
          className="w-full p-3 border rounded min-h-24 bg-gray-50" 
          placeholder="Your generated prompt will appear here..."
        />
        
        {negativePrompt && (
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
            <textarea 
              readOnly 
              value={negativePrompt} 
              className="w-full p-3 border rounded min-h-12 bg-gray-50 border-red-200" 
            />
          </div>
        )}
      </div>
      
      {/* Saved Prompts */}
      {savedPrompts.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-md mb-2 text-gray-700">Saved Prompts</h3>
          <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
            {savedPrompts.map((prompt, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 text-sm border-b last:border-b-0">
                {prompt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedPromptGenerator;