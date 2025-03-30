import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

// Available options constants
const availableArtists = [
  {
    name: "Vincent van Gogh",
    style: "Post-impressionist style with bold colors and expressive brush strokes",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
  },
  {
    name: "Leonardo da Vinci",
    style: "Renaissance style with subtle shading and realistic proportions",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
  },
  {
    name: "Frida Kahlo",
    style: "Surrealist style with bold colors and symbolic elements",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Frida_Kahlo_%28self_portrait%29.jpg/800px-Frida_Kahlo_%28self_portrait%29.jpg"
  },
  {
    name: "Gustav Klimt",
    style: "Art Nouveau style with ornate patterns and gold leaf",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Gustav_Klimt_046.jpg/800px-Gustav_Klimt_046.jpg"
  },
  {
    name: "Salvador Dalí",
    style: "Surrealist style with dreamlike imagery and melting forms",
    image: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
  },
  {
    name: "Claude Monet",
    style: "Impressionist style with emphasis on light and atmospheric effects",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Claude_Monet_-_Water_Lilies_-_1906.jpg/1280px-Claude_Monet_-_Water_Lilies_-_1906.jpg"
  },
  {
    name: "Pablo Picasso",
    style: "Cubist style with geometric forms and multiple perspectives",
    image: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg"
  },
  {
    name: "Rembrandt",
    style: "Baroque style with dramatic lighting and emotional depth",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/800px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg"
  },
  {
    name: "Andy Warhol",
    style: "Pop Art style with bold colors and repeated imagery",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1f/Campbell%27s_Soup_Cans_MOMA.jpg"
  },
  {
    name: "Wassily Kandinsky",
    style: "Abstract style with geometric shapes and vibrant colors",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg/1280px-Vassily_Kandinsky%2C_1913_-_Composition_7.jpg"
  }
];

const availableCategories = ["Fantasy", "Sci-Fi", "Nature", "Portrait", "Architecture", "Abstract", "Still Life"];
const availableStyles = ["Digital Art", "Oil Painting", "Watercolor", "Photography", "3D Render", "Sketch", "Anime"];
const availableMoods = ["Happy", "Mysterious", "Dark", "Peaceful", "Energetic", "Romantic", "Melancholic"];
const availableCompositions = ["Close-up", "Wide Shot", "Bird's Eye View", "Low Angle", "Rule of Thirds", "Symmetrical", "Dynamic"];
const availableLighting = ["Natural", "Studio", "Dramatic", "Soft", "Hard", "Backlit", "Cinematic"];
const availableColorSchemes = ["Vibrant", "Monochromatic", "Pastel", "Dark", "Warm", "Cool", "Complementary"];
const availableQualityModifiers = ["High Quality", "4K", "8K", "Detailed", "Sharp", "Professional", "Award Winning"];

// Camera-related options
const availableCameras = ["Canon EOS R5", "Sony A7III", "Nikon Z6", "Fujifilm X-T4", "Leica M10"];
const availableLenses = ["24-70mm f/2.8", "50mm f/1.4", "85mm f/1.8", "70-200mm f/2.8", "35mm f/1.8"];
const availableFocalLengths = ["24mm", "35mm", "50mm", "85mm", "135mm", "200mm"];
const availableApertures = ["f/1.4", "f/1.8", "f/2.8", "f/4", "f/5.6", "f/8", "f/11"];
const availableShutterSpeeds = ["1/1000", "1/500", "1/250", "1/125", "1/60", "1/30"];
const availableISOs = ["100", "200", "400", "800", "1600", "3200"];
const availableEffects = ["None", "Bokeh", "Motion Blur", "Long Exposure", "HDR", "Black & White"];

const AdvancedPromptGenerator = () => {
  // Core settings
  const [category, setCategory] = useState("Fantasy");
  const [style, setStyle] = useState("Digital Art");
  const [subject, setSubject] = useState("");
  const [mood, setMood] = useState("");
  const [composition, setComposition] = useState("");
  const [lighting, setLighting] = useState("");
  const [colorScheme, setColorScheme] = useState("");
  const [details, setDetails] = useState("");
  const [extraDetails, setExtraDetails] = useState("");

  // Camera settings
  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [focalLength, setFocalLength] = useState("");
  const [aperture, setAperture] = useState("");
  const [shutterSpeed, setShutterSpeed] = useState("");
  const [iso, setIso] = useState("");
  const [effect, setEffect] = useState("");

  // Artist settings
  const [showArtistInfo, setShowArtistInfo] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedArtistInfo, setSelectedArtistInfo] = useState(null);
  const [qualityModifiers, setQualityModifiers] = useState([]);

  // Output
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState([]);

  // Templates and AI Model
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [aiModel, setAiModel] = useState("REVE");  // Cambiar aquí el valor inicial
  const [modelSpecificSettings, setModelSpecificSettings] = useState({
    steps: 50,
    cfg: 7,
    sampler: "Euler a",
    seed: -1
  });

  // Functions
  const saveAsTemplate = () => {
    const template = {
      name: "Template " + (templates.length + 1),
      settings: {
        category,
        style,
        mood,
        lighting,
        colorScheme,
        selectedArtists,
        qualityModifiers,
        aiModel,
        modelSpecificSettings
      }
    };
    setTemplates(prev => [...prev, template]);
  };

  const loadTemplate = (template) => {
    setCategory(template.settings.category);
    setStyle(template.settings.style);
    setMood(template.settings.mood);
    setLighting(template.settings.lighting);
    setColorScheme(template.settings.colorScheme);
    setSelectedArtists(template.settings.selectedArtists);
    setQualityModifiers(template.settings.qualityModifiers);
    setAiModel(template.settings.aiModel);
    setModelSpecificSettings(template.settings.modelSpecificSettings);
  };

  // Add these new state variables
  const [perspective, setPerspective] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [visualSettings, setVisualSettings] = useState("");
  const [detailLevel, setDetailLevel] = useState("");
  const [ratio, setRatio] = useState("1:1");
  
  // Expand categories array
  const categories = [
    "Fantasy", "Sci-Fi", "Portrait", "Landscape", "Abstract", 
    "Cyberpunk", "Steampunk", "Horror", "Anime", "Realistic",
    "Watercolor", "Oil Painting", "Digital Art", "Concept Art",
    "Character Design", "Environmental", "Architecture", "Nature"
  ];
  
  // Add new option arrays
  const perspectiveOptions = [
    "Close-up", "Wide shot", "Bird's eye view", "Worm's eye view",
    "Front view", "Side view", "Three-quarter view", "Isometric",
    "Aerial view", "Dutch angle", "Over the shoulder"
  ];
  
  const timeOfDayOptions = [
    "Dawn", "Morning", "Noon", "Afternoon", "Sunset", "Dusk",
    "Night", "Golden hour", "Blue hour", "Midnight"
  ];
  
  const visualSettingsOptions = [
    "High contrast", "Soft lighting", "Dramatic lighting", "Volumetric lighting",
    "Cinematic", "Studio lighting", "Natural lighting", "Neon lighting",
    "Backlit", "Rim lighting", "HDR", "Low key", "High key"
  ];
  
  const detailsOptions = [
    "Highly detailed", "Minimalist", "Intricate", "Simple",
    "Photorealistic", "Stylized", "Textured", "Smooth",
    "Sharp focus", "Soft focus", "Ultra HD", "8K resolution"
  ];
  
  const ratioOptions = [
    "1:1", "4:3", "3:4", "16:9", "9:16", "2:1", "1:2", "3:2", "2:3"
  ];
  
  // Remove the duplicate JSX elements that are outside the return statement
  // (Delete all the JSX elements that are between the option arrays and the generatePrompt function)
  
  const generatePrompt = () => {
      let prompt = [];
      
      if (qualityModifiers.length > 0) {
        prompt.push(qualityModifiers.join(", "));
      }
      
      if (category) prompt.push(category);
      if (style) prompt.push(style);
      if (subject) prompt.push(`of ${subject}`);
      if (mood) prompt.push(`${mood} mood`);
      if (perspective) prompt.push(perspective);
      if (timeOfDay) prompt.push(timeOfDay);
      if (visualSettings) prompt.push(visualSettings);
      if (detailLevel) prompt.push(detailLevel);
      if (composition) prompt.push(`${composition} composition`);
      if (lighting) prompt.push(`${lighting} lighting`);
      if (colorScheme) prompt.push(`${colorScheme} colors`);
      if (ratio) prompt.push(`aspect ratio ${ratio}`);
      
      // Add camera settings if enabled
      if (showCamera) {
        if (camera) prompt.push(`shot with ${camera}`);
        if (lens) prompt.push(`using ${lens}`);
        if (focalLength) prompt.push(`at ${focalLength}`);
        if (aperture) prompt.push(aperture);
        if (shutterSpeed) prompt.push(`at ${shutterSpeed}`);
        if (iso) prompt.push(`ISO ${iso}`);
        if (effect && effect !== "None") prompt.push(effect);
      }
  
      // Add selected artists if enabled
      if (showArtistInfo && selectedArtists.length > 0) {
        prompt.push(`in the style of ${selectedArtists.join(" and ")}`);
      }
  
      // Add extra details if any
      if (extraDetails) prompt.push(extraDetails);
  
      const finalPrompt = prompt.join(", ");
      setGeneratedPrompt(finalPrompt); // Add this line to update the state
      return finalPrompt;
    };

  const toggleArtist = (artist) => {
    setSelectedArtists(prev =>
      prev.includes(artist)
        ? prev.filter(a => a !== artist)
        : [...prev, artist]
    );
  };

  const toggleQualityModifier = (modifier) => {
    setQualityModifiers(prev =>
      prev.includes(modifier)
        ? prev.filter(m => m !== modifier)
        : [...prev, modifier]
    );
  };

  const savePrompt = () => {
    if (generatedPrompt) {
      setSavedPrompts(prev => [...prev, generatedPrompt]);
    }
  };

  const clearAllFields = () => {
    setCategory("Fantasy");
    setStyle("Digital Art");
    setSubject("");
    setMood("");
    setComposition("");
    setLighting("");
    setColorScheme("");
    setDetails("");
    setExtraDetails("");
    setShowCamera(false);
    setCamera("");
    setLens("");
    setFocalLength("");
    setAperture("");
    setShutterSpeed("");
    setIso("");
    setEffect("");
    setShowArtistInfo(false);
    setSelectedArtists([]);
    setQualityModifiers([]);
    setSelectedTemplate(null);
    setAiModel("Midjourney");
    setModelSpecificSettings({
      steps: 50,
      cfg: 7,
      sampler: "Euler a",
      seed: -1
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Advanced Prompt Generator</h1>
      
      {/* Top Section - Two Columns for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Core Settings Column */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Core Settings</h2>
          
          {/* Category */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Style */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-2 border rounded">
              {availableStyles.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter the main subject"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Mood */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Mood</option>
              {availableMoods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Perspective */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Perspective</label>
            <select value={perspective} onChange={(e) => setPerspective(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Perspective</option>
              {perspectiveOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Time of Day */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time of Day</label>
            <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Time of Day</option>
              {timeOfDayOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Settings Column */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Visual Settings</h2>

          {/* Visual Settings */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Visual Settings</label>
            <select value={visualSettings} onChange={(e) => setVisualSettings(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Visual Settings</option>
              {visualSettingsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Detail Level */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Detail Level</label>
            <select value={detailLevel} onChange={(e) => setDetailLevel(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Detail Level</option>
              {detailsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Composition */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Composition</label>
            <select value={composition} onChange={(e) => setComposition(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Composition</option>
              {availableCompositions.map((comp) => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          {/* Lighting */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lighting</label>
            <select value={lighting} onChange={(e) => setLighting(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Lighting</option>
              {availableLighting.map((light) => (
                <option key={light} value={light}>{light}</option>
              ))}
            </select>
          </div>

          {/* Color Scheme */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Color Scheme</label>
            <select value={colorScheme} onChange={(e) => setColorScheme(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Select Color Scheme</option>
              {availableColorSchemes.map((scheme) => (
                <option key={scheme} value={scheme}>{scheme}</option>
              ))}
            </select>
          </div>

          {/* Aspect Ratio */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
            <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="w-full p-2 border rounded">
              {ratioOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Section - Advanced Settings and Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Advanced Settings */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>

          {/* Quality Modifiers */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quality Modifiers</label>
            <div className="flex flex-wrap gap-2">
              {availableQualityModifiers.map((modifier) => (
                <button
                  key={modifier}
                  onClick={() => toggleQualityModifier(modifier)}
                  className={`px-3 py-1 rounded text-sm ${
                    qualityModifiers.includes(modifier)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {modifier}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Settings */}
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={showCamera}
                onChange={(e) => setShowCamera(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Camera Settings</label>
            </div>
            
            {showCamera && (
              <div className="space-y-2">
                <select
                  value={camera}
                  onChange={(e) => setCamera(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Camera</option>
                  {availableCameras.map((cam) => (
                    <option key={cam} value={cam}>{cam}</option>
                  ))}
                </select>

                <select
                  value={lens}
                  onChange={(e) => setLens(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Lens</option>
                  {availableLenses.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>

                <select
                  value={focalLength}
                  onChange={(e) => setFocalLength(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Focal Length</option>
                  {availableFocalLengths.map((fl) => (
                    <option key={fl} value={fl}>{fl}</option>
                  ))}
                </select>

                <select
                  value={aperture}
                  onChange={(e) => setAperture(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Aperture</option>
                  {availableApertures.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>

                <select
                  value={shutterSpeed}
                  onChange={(e) => setShutterSpeed(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Shutter Speed</option>
                  {availableShutterSpeeds.map((ss) => (
                    <option key={ss} value={ss}>{ss}</option>
                  ))}
                </select>

                <select
                  value={iso}
                  onChange={(e) => setIso(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select ISO</option>
                  {availableISOs.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>

                <select
                  value={effect}
                  onChange={(e) => setEffect(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Effect</option>
                  {availableEffects.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Artist Inspiration */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={showArtistInfo}
                  onChange={(e) => setShowArtistInfo(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Artist Inspiration</label>
              </div>
              <FaInfoCircle className="text-gray-500" title="Select artists to inspire the style" />
            </div>
            
            {showArtistInfo && (
              <div className="grid grid-cols-2 gap-2">
                {availableArtists.map((artist) => (
                  <button
                    key={artist.name}
                    onClick={() => toggleArtist(artist.name)}
                    className={`p-2 text-sm rounded flex items-center justify-center ${
                      selectedArtists.includes(artist.name)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {artist.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Model Settings */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">AI Model</label>
            <select
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option>REVE</option>
              <option>ImageFX</option>
              <option>Piclumen</option>
              <option>Midjourney</option>
              <option>Stable Diffusion</option>
              <option>DALL-E</option>
            </select>
          </div>

          {/* Extra Details */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra Details</label>
            <textarea
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
              placeholder="Any additional details or modifications"
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          {/* Templates */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Templates</label>
            <select
              value={selectedTemplate?.name || ""}
              onChange={(e) => {
                const template = templates.find(t => t.name === e.target.value);
                if (template) {
                  loadTemplate(template);
                  setSelectedTemplate(template);
                }
              }}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select Template</option>
              {templates.map((template) => (
                <option key={template.name} value={template.name}>{template.name}</option>
              ))}
            </select>
            <button
              onClick={saveAsTemplate}
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            >
              Save Current Settings as Template
            </button>
          </div>

          {/* Generate and Clear Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={generatePrompt}
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Generate Prompt
            </button>
            <button
              onClick={clearAllFields}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          
          <div className="mb-4">
            <textarea
              value={generatedPrompt || "Your generated prompt will appear here..."}
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
              rows="6"
            />
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigator.clipboard.writeText(generatedPrompt)}
              disabled={!generatedPrompt}
              className={`px-4 py-2 rounded text-white ${
                generatedPrompt ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-300'
              }`}
            >
              Copy to Clipboard
            </button>
            <button
              onClick={savePrompt}
              disabled={!generatedPrompt}
              className={`px-4 py-2 rounded text-white ${
                generatedPrompt ? 'bg-green-500 hover:bg-green-600' : 'bg-green-300'
              }`}
            >
              Save Prompt
            </button>
          </div>

          {savedPrompts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Saved Prompts</h3>
              <div className="space-y-2">
                {savedPrompts.map((prompt, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded border">
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedPromptGenerator;
