import React, { useState, useRef } from 'react';
import { Shield, PlusSquare, Sword, Star, Download, RefreshCw, Users, Clock, Upload, GripVertical, AlertTriangle, Settings, X, Trash2, Plus } from 'lucide-react';

// --- DATA CONFIGURATION ---
const INITIAL_PLAYERS = [
  // DPS
  { id: 2, name: "jadow", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 4, name: "Repoint[EU]", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 5, name: "Jinlei", role: "DPS", status: "Confirmed", isOfficer: true },
  { id: 8, name: "穏Surge", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 9, name: "Luminiferous", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 10, name: "Forensiic", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 11, name: "Kīoko", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 13, name: "Songkl", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 17, name: "Yina-Fa", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 19, name: "Fauxpha", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 20, name: "☆emihime☆", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 21, name: "Bizzlen", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 22, name: "SqueakyPotato", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 23, name: "paciFIST", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 24, name: "Mdemon", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 25, name: "Lyviene", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 27, name: "Chængyu", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 28, name: "LotusRaven", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 34, name: "Wisperia", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 35, name: "WangKaiRui", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 36, name: "GhoStu", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 38, name: "Kafka", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 40, name: "YuujinLong", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 41, name: "TheósOuíski", role: "DPS", status: "Confirmed", isOfficer: false },
  { id: 42, name: "Fichus", role: "DPS", status: "Confirmed", isOfficer: false },

  // Tanks
  { id: 1, name: "WhiteLotusKnee", role: "Tank", status: "Confirmed", isOfficer: true },
  { id: 14, name: "TouYang", role: "Tank", status: "Confirmed", isOfficer: false },
  { id: 18, name: "LouZi", role: "Tank", status: "Confirmed", isOfficer: false },
  { id: 32, name: "Volucrin", role: "Tank", status: "Confirmed", isOfficer: true },
  { id: 44, name: "Ethril", role: "Tank", status: "Confirmed", isOfficer: false },

  // Healers
  { id: 3, name: "Beexzu(Bibble)", role: "Healer", status: "Confirmed", isOfficer: true },
  { id: 6, name: "Awnza", role: "Healer", status: "Confirmed", isOfficer: false },
  { id: 7, name: "Kyourena(Kyou)", role: "Healer", status: "Confirmed", isOfficer: false },
  { id: 12, name: "ReinStorm", role: "Healer", status: "Confirmed", isOfficer: false },
  { id: 15, name: "Xiao-Maii", role: "Healer", status: "Confirmed", isOfficer: false },
  { id: 26, name: "LadyFace", role: "Healer", status: "Confirmed", isOfficer: false },
  { id: 30, name: "BlackLotusFaen", role: "Healer", status: "Confirmed", isOfficer: true },
  { id: 33, name: "scintilla(chinchilla)", role: "Healer", status: "Confirmed", isOfficer: false },
  { id: 37, name: "SkyePie", role: "Healer", status: "Confirmed", isOfficer: false },

  // Tentatives
  { id: 29, name: "PrincessPenguin", role: "DPS", status: "Tentative", isOfficer: false },
  { id: 31, name: "zsitan", role: "DPS", status: "Tentative", isOfficer: false },
  { id: 43, name: "Liluth", role: "DPS", status: "Tentative", isOfficer: false },

  // Absences
  { id: 16, name: "TianWeishang", role: "DPS", status: "Absent", isOfficer: false },
  { id: 39, name: "HeyGooogle", role: "DPS", status: "Absent", isOfficer: false },
];

const INITIAL_REQUIRED_LINKS = [
  ["WhiteLotusKnee", "BlackLotusFaen"],
  ["LotusRaven", "Luminiferous"],
  ["Xiao-Maii", "Volucrin", "Fauxpha"],
  ["綾Suzu", "穏Surge"], 
  ["Songkl", "Lyviene", "LadyFace"]
];

const INITIAL_GROUP_SIZE_LIMIT = 10;
const INITIAL_MIN_TANKS = 1;
const INITIAL_MIN_HEALERS = 2;
const INITIAL_MIN_OFFICERS = 1;

const ROLE_ORDER = { Tank: 1, Healer: 2, DPS: 3 };

// --- ICONS & STYLING HELPER ---
const RoleIcon = ({ role, isOfficer }) => {
  const iconProps = { size: 16, className: "inline-block mr-1" };
  let icon = null;
  if (role === 'Tank') icon = <Shield {...iconProps} className="text-orange-400 mr-1" />;
  if (role === 'Healer') icon = <PlusSquare {...iconProps} className="text-green-400 mr-1" />;
  if (role === 'DPS') icon = <Sword {...iconProps} className="text-red-400 mr-1" />;
  
  return (
    <div className="flex items-center gap-1">
      {icon}
      {isOfficer && <Star size={14} className="text-yellow-400 fill-yellow-400" title="Officer" />}
    </div>
  );
};

export default function App() {
  const [playersList, setPlayersList] = useState(INITIAL_PLAYERS);
  const [requiredLinks, setRequiredLinks] = useState(INITIAL_REQUIRED_LINKS);
  const [groupRules, setGroupRules] = useState({
    sizeLimit: INITIAL_GROUP_SIZE_LIMIT,
    minTanks: INITIAL_MIN_TANKS,
    minHealers: INITIAL_MIN_HEALERS,
    minOfficers: INITIAL_MIN_OFFICERS,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [results, setResults] = useState(null);
  const [isSorting, setIsSorting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // --- SETTINGS MANAGEMENT ---
  const handleUpdateRule = (key, value) => {
    setGroupRules(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  const handleAddLinkGroup = () => {
    setRequiredLinks(prev => [...prev, []]);
  };

  const handleRemoveLinkGroup = (index) => {
    setRequiredLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddToLinkGroup = (index, playerName) => {
    if (!playerName) return;
    setRequiredLinks(prev => {
      const next = [...prev];
      if (!next[index].includes(playerName)) {
        next[index] = [...next[index], playerName];
      }
      return next;
    });
  };

  const handleRemoveFromLinkGroup = (index, playerName) => {
    setRequiredLinks(prev => {
      const next = [...prev];
      next[index] = next[index].filter(n => n !== playerName);
      return next;
    });
  };
  
  const availablePlayersForLinks = playersList
    .map(p => p.name)
    .filter(name => !requiredLinks.flat().includes(name))
    .sort();

  // --- FUZZY MATCHING LOGIC ---
  const getLevenshteinDistance = (a, b) => {
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    const arr = [];
    for (let i = 0; i <= b.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= a.length; j++) {
        arr[i][j] = i === 0 ? j : Math.min(
          arr[i - 1][j] + 1,
          arr[i][j - 1] + 1,
          arr[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
        );
      }
    }
    return arr[b.length][a.length];
  };

  const findMatch = (targetName, players) => {
    // 1. Try Exact Match First
    let exact = players.find(p => p.name === targetName);
    if (exact) return { player: exact, isFuzzy: false };

    // 2. Try Fuzzy Match
    // FIX: Removed the aggressive regex that was stripping Japanese characters/symbols
    const normTarget = targetName.toLowerCase().trim();
    if (!normTarget || normTarget.length < 3) return { player: null }; // Too short to safely fuzzy match

    let bestMatch = null;
    let minDistance = Infinity;

    for (const p of players) {
      const normP = p.name.toLowerCase().trim();
      
      // Substring match (e.g., "Surge" inside "穏Surge")
      // FIX: Added a length requirement so it doesn't accidentally match 2-letter overlaps
      if (normTarget.length >= 4 && (normP.includes(normTarget) || normTarget.includes(normP))) {
        return { player: p, isFuzzy: true, matchedTo: targetName };
      }
      
      // Typo distance match
      const dist = getLevenshteinDistance(normTarget, normP);
      // FIX: Tighter threshold. Max 2 typos for longer names, 1 for short names.
      const maxAllowedDist = normTarget.length > 5 ? 2 : 1;
      
      if (dist < minDistance && dist <= maxAllowedDist) { 
        minDistance = dist;
        bestMatch = p;
      }
    }

    if (bestMatch) {
      return { player: bestMatch, isFuzzy: true, matchedTo: targetName };
    }
    return { player: null };
  };

  // Helper to chunk players based on links
  const createChunks = (playerList) => {
    let chunks = [];
    let placedNames = new Set();
    let availableForLinks = [...playerList];

    for (const linkGroup of requiredLinks) {
      let chunk = [];
      for (const targetName of linkGroup) {
        // Use fuzzy match to find the player
        const { player, isFuzzy, matchedTo } = findMatch(targetName, availableForLinks);
        
        if (player && !placedNames.has(player.name)) {
          // Tag them if they were a fuzzy match so the UI can flag them
          chunk.push({ ...player, _fuzzyMatchedTo: isFuzzy ? matchedTo : undefined });
          placedNames.add(player.name);
          // Remove from available to prevent duplicate matching
          availableForLinks = availableForLinks.filter(p => p.id !== player.id);
        }
      }
      if (chunk.length > 0) chunks.push(chunk);
    }

    // Add everyone else who didn't have a pairing rule
    for (const player of playerList) {
      if (!placedNames.has(player.name)) {
        chunks.push([{ ...player }]);
      }
    }
    return chunks;
  };

  // The sorting engine
  const runSortingAlgorithm = () => {
    // Filter out absences completely
    const activePlayers = playersList.filter(p => p.status !== 'Absent');

    const numFullGroups = Math.floor(activePlayers.length / groupRules.sizeLimit);
    let chunks = createChunks(activePlayers);

    // Group chunks by tentative vs confirmed status so confirmed get priority placement
    const isChunkTentative = c => c.some(p => p.status === 'Tentative');
    const tentativeChunks = chunks.filter(isChunkTentative);
    const confirmedChunks = chunks.filter(c => !isChunkTentative(c));

    // Split confirmed chunks: those with constraints vs pure DPS
    const importantConfirmed = confirmedChunks.filter(c => c.some(p => p.role === 'Tank' || p.role === 'Healer' || p.isOfficer));
    const regularConfirmed = confirmedChunks.filter(c => !c.some(p => p.role === 'Tank' || p.role === 'Healer' || p.isOfficer));

    const MAX_ATTEMPTS = 15000;
    
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      let currentGroups = Array.from({ length: numFullGroups }, () => []);
      let waitlist = [];

      // Shuffle within the splits to ensure randomness
      const shuffledImportant = [...importantConfirmed].sort(() => Math.random() - 0.5);
      const shuffledRegular = [...regularConfirmed].sort(() => Math.random() - 0.5);
      const shuffledTentatives = [...tentativeChunks].sort(() => Math.random() - 0.5);
      
      // Process Confirmed first, so Tentatives are used to fill the remaining gaps or get pushed to waitlist
      const combinedChunks = [...shuffledImportant, ...shuffledRegular, ...shuffledTentatives];

      for (const chunk of combinedChunks) {
        let availableGroups = currentGroups.filter(g => g.length + chunk.length <= groupRules.sizeLimit);
        
        if (availableGroups.length > 0) {
          const targetGroupIndex = Math.floor(Math.random() * availableGroups.length);
          const actualGroup = currentGroups.find(g => g === availableGroups[targetGroupIndex]);
          actualGroup.push(...chunk);
        } else {
          waitlist.push(...chunk);
        }
      }

      // Validate constraints
      let isValid = true;
      for (const group of currentGroups) {
        if (group.length !== groupRules.sizeLimit && group.length > 0) { isValid = false; break; } // Allow forming if partially complete
        const tanks = group.filter(p => p.role === 'Tank').length;
        const healers = group.filter(p => p.role === 'Healer').length;
        const officers = group.filter(p => p.isOfficer).length;

        if (tanks < groupRules.minTanks || healers < groupRules.minHealers || officers < groupRules.minOfficers) {
          isValid = false;
          break;
        }
      }

      if (isValid) {
        // Sort groups: Tank -> Healer -> DPS, then alphabetical
        const sortFn = (a, b) => (ROLE_ORDER[a.role] - ROLE_ORDER[b.role]) || a.name.localeCompare(b.name);
        currentGroups.forEach(g => g.sort(sortFn));
        waitlist.sort(sortFn);
        
        return { groups: currentGroups, waitlist, attempts: attempt + 1 };
      }
    }

    throw new Error("Could not find a valid combination meeting all constraints. Try again or edit player roles/status.");
  };

  const handleSort = () => {
    setIsSorting(true);
    setError("");
    setResults(null);

    setTimeout(() => {
      try {
        const generatedResults = runSortingAlgorithm();
        setResults(generatedResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsSorting(false);
      }
    }, 400);
  };

  // --- IMAGE PARSING LOGIC ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsParsing(true);
    setError("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        const apiKey = ""; // API key handled by environment
        
        const prompt = `You are a data extraction assistant. Extract the player list from this roster image.
        For each player find:
        - ID number (left column usually)
        - Name
        - Role (Look at icons: Shield=Tank, Plus=Healer, Sword=DPS. If unsure default to DPS)
        - Status: Look at sections. Tentative section = "Tentative", Absence = "Absent". Everyone else = "Confirmed".
        - isOfficer: Look for player names Jinlei, Beexzu, Volucrin, BlackLotusFaen, WhiteLotusKnee. If name matches, set true, else false.
        
        Return ONLY valid JSON matching this schema exactly.`;

        let delay = 1000;
        let response;
        // Exponential backoff retry logic for API
        for(let i=0; i<5; i++) {
            response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  role: "user",
                  parts: [
                    { text: prompt },
                    { inlineData: { mimeType: file.type, data: base64Data } }
                  ]
                }],
                generationConfig: {
                  responseMimeType: "application/json",
                  responseSchema: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                         id: { type: "INTEGER" },
                         name: { type: "STRING" },
                         role: { type: "STRING", enum: ["DPS", "Tank", "Healer"] },
                         status: { type: "STRING", enum: ["Confirmed", "Tentative", "Absent"] },
                         isOfficer: { type: "BOOLEAN" }
                      },
                      required: ["id", "name", "role", "status", "isOfficer"]
                    }
                  }
                }
              })
            });
            if(response.ok) break;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }

        if (!response.ok) throw new Error('API request failed after retries.');
        
        const result = await response.json();
        const jsonString = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (jsonString) {
           const parsedPlayers = JSON.parse(jsonString);
           if (parsedPlayers && parsedPlayers.length > 0) {
             setPlayersList(parsedPlayers);
             setResults(null); 
             setError("Success! Roster updated from image.");
             setTimeout(() => setError(""), 3000);
           } else {
             throw new Error("No players detected in image.");
           }
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Failed to parse image. Ensure the image is clear. " + err.message);
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- DRAG AND DROP LOGIC ---
  const handleDragStart = (e, player, sourceZone) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ player, sourceZone }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetZone) => {
    e.preventDefault();
    const dataString = e.dataTransfer.getData('application/json');
    if (!dataString) return;

    const { player, sourceZone } = JSON.parse(dataString);
    if (sourceZone === targetZone) return; // Dropped in the same place

    setResults(prev => {
      const next = { ...prev };
      const newGroups = prev.groups.map(g => [...g]);
      let newWaitlist = [...prev.waitlist];

      // 1. Remove from source
      if (sourceZone.startsWith('group-')) {
        const idx = parseInt(sourceZone.split('-')[1]);
        newGroups[idx] = newGroups[idx].filter(p => p.id !== player.id);
      } else if (sourceZone === 'waitlist') {
        newWaitlist = newWaitlist.filter(p => p.id !== player.id);
      }

      const sortFn = (a, b) => (ROLE_ORDER[a.role] - ROLE_ORDER[b.role]) || a.name.localeCompare(b.name);

      // 2. Add to target
      if (targetZone.startsWith('group-')) {
        const idx = parseInt(targetZone.split('-')[1]);
        newGroups[idx].push(player);
        newGroups[idx].sort(sortFn);
      } else if (targetZone === 'waitlist') {
        newWaitlist.push(player);
        newWaitlist.sort(sortFn);
      }

      return { groups: newGroups, waitlist: newWaitlist, attempts: prev.attempts };
    });
  };

  // --- EXPORT LOGIC ---
  const handleExportCSV = () => {
    if (!results) return;

    let csvContent = "\uFEFFGroup,Name,Role,Status,Officer\n";
    const addRow = (groupName, player) => {
      csvContent += `"${groupName}","${player.name}","${player.role}","${player.status}","${player.isOfficer ? 'Yes' : 'No'}"\n`;
    };

    results.groups.forEach((g, idx) => g.forEach(p => addRow(`Group ${idx + 1}`, p)));
    results.waitlist.forEach(p => addRow("Priority Waitlist", p));

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Roster_Sorting_Results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- COMPONENT RENDERERS ---
  const PlayerList = ({ players, title, icon, bgClass = "bg-gray-800/50", zoneId }) => {
    // Validate current group constraints for visual feedback
    const isWaitlist = zoneId === 'waitlist';
    const isOverLimit = !isWaitlist && players.length > groupRules.sizeLimit;
    const missingTank = !isWaitlist && players.filter(p => p.role === 'Tank').length < groupRules.minTanks;
    const missingHealer = !isWaitlist && players.filter(p => p.role === 'Healer').length < groupRules.minHealers;
    const missingOfficer = !isWaitlist && players.filter(p => p.isOfficer).length < groupRules.minOfficers;
    
    const hasWarnings = !isWaitlist && (isOverLimit || missingTank || missingHealer || missingOfficer);

    return (
      <div 
        className={`rounded-xl p-4 border shadow-lg transition-colors duration-200 ${bgClass} 
          ${hasWarnings ? 'border-red-500/50' : 'border-gray-700/50'}
          hover:border-purple-500/50`}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, zoneId)}
      >
        <div className="flex flex-col gap-2 mb-3 border-b border-gray-700 pb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-200">
              {icon} {title}
            </h3>
            <span className={`${players.length > groupRules.sizeLimit && !isWaitlist ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'} text-xs font-bold px-2 py-1 rounded-full`}>
              {players.length} Players
            </span>
          </div>
          
          {hasWarnings && (
            <div className="flex flex-wrap gap-1 text-[10px] text-red-400 font-bold bg-red-900/20 px-2 py-1 rounded">
               <AlertTriangle size={12} className="inline mr-1"/>
               {isOverLimit && <span>Over Limit ({groupRules.sizeLimit})!</span>}
               {missingTank && <span>Needs Tank!</span>}
               {missingHealer && <span>Needs Healer!</span>}
               {missingOfficer && <span>Needs Officer!</span>}
            </div>
          )}
        </div>
        
        <ul className="space-y-1 min-h-[50px]">
          {players.length === 0 && (
            <li className="text-gray-500 text-sm text-center py-4 border-2 border-dashed border-gray-700 rounded-lg">
              Drag players here
            </li>
          )}
          {players.map(p => (
            <li 
              key={p.id} 
              draggable
              onDragStart={(e) => handleDragStart(e, p, zoneId)}
              className="group flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-gray-700/50 bg-gray-800/40 border border-transparent hover:border-gray-600 transition-all cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center gap-2">
                <GripVertical size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs text-gray-500 w-5">{p.id}</span>
                <span className={`font-medium ${p.isOfficer ? 'text-yellow-100' : 'text-gray-300'} ${p.status === 'Tentative' ? 'italic opacity-80' : ''}`}>
                  {p.name}
                  {p.status === 'Tentative' && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-yellow-900/50 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-700/50 inline-block">
                      Tentative
                    </span>
                  )}
                  {p._fuzzyMatchedTo && (
                    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-orange-900/50 text-orange-400 px-1.5 py-0.5 rounded border border-orange-700/50 inline-flex items-center gap-1 align-text-bottom" title={`Fuzzy matched to linking rule: ${p._fuzzyMatchedTo}`}>
                      <AlertTriangle size={10} />
                      Paired as "{p._fuzzyMatchedTo}"
                    </span>
                  )}
                </span>
              </div>
              <RoleIcon role={p.role} isOfficer={p.isOfficer} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#13131a] text-gray-200 font-sans p-4 md:p-8 selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Lotus Clan Group Sorter
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Automatically builds balanced groups. Now supports dragging to adjust groups manually, and reading new rosters via image upload!
            </p>
            <p className="text-purple-400 text-xs mt-2 font-semibold">
              Currently loaded: {playersList.length} players 
              ({playersList.filter(p => p.status !== 'Absent').length} active, {playersList.filter(p => p.status === 'Absent').length} absent)
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {isParsing ? <RefreshCw className="animate-spin" size={18} /> : <Upload size={18} />}
              <span className="hidden sm:inline">{isParsing ? 'Reading Image...' : 'Upload Image'}</span>
            </button>

            <button 
              onClick={handleSort}
              disabled={isSorting || isParsing}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/50 disabled:opacity-50"
            >
              {isSorting ? <RefreshCw className="animate-spin" size={20} /> : <Users size={20} />}
              {isSorting ? 'Crunching...' : 'Generate Groups'}
            </button>
            
            {results && (
              <button 
                onClick={handleExportCSV}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/50"
              >
                <Download size={20} />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all border ${showSettings ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800'}`}
              title="Sorting Rules & Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
               <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2"><Settings className="text-purple-400"/> Sorting Logic & Rules</h2>
               <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Number Rules */}
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-300 text-sm uppercase tracking-wider">Group Requirements</h3>
                <div className="space-y-3">
                  {[{label: "Max Players per Group", key: "sizeLimit"}, {label: "Min Tanks per Group", key: "minTanks"}, {label: "Min Healers per Group", key: "minHealers"}, {label: "Min Officers per Group", key: "minOfficers"}].map(rule => (
                    <div key={rule.key} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                      <label className="text-sm font-medium text-gray-300">{rule.label}</label>
                      <input 
                        type="number" 
                        min="0"
                        value={groupRules[rule.key]} 
                        onChange={(e) => handleUpdateRule(rule.key, e.target.value)}
                        className="w-20 bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-white text-center focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Linking Rules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-purple-300 text-sm uppercase tracking-wider">Required Pairings</h3>
                  <button onClick={handleAddLinkGroup} className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded flex items-center gap-1 transition-colors">
                    <Plus size={14}/> Add Pair
                  </button>
                </div>
                
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                  {requiredLinks.map((linkGroup, idx) => (
                    <div key={idx} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {linkGroup.length === 0 && <span className="text-xs text-gray-500 italic">Empty group</span>}
                        {linkGroup.map(name => (
                          <span key={name} className="bg-purple-900/40 border border-purple-700/50 text-purple-200 text-xs px-2 py-1 rounded-md flex items-center gap-1.5">
                            {name}
                            <button onClick={() => handleRemoveFromLinkGroup(idx, name)} className="text-purple-400 hover:text-red-400 transition-colors">
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <select 
                          onChange={(e) => { handleAddToLinkGroup(idx, e.target.value); e.target.value = ""; }}
                          className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-purple-500"
                        >
                          <option value="">+ Add player to this pair...</option>
                          {availablePlayersForLinks.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                        <button onClick={() => handleRemoveLinkGroup(idx)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors" title="Delete Pair">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {requiredLinks.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-700 rounded-lg">
                      No required pairings. Players will be completely randomized.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className={`border p-4 rounded-xl text-center font-medium ${error.includes('Success') ? 'bg-green-900/30 border-green-500/50 text-green-300' : 'bg-red-900/30 border-red-500/50 text-red-300'}`}>
            {error}
          </div>
        )}

        {/* Results Area */}
        {results ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                <Users className="text-purple-400" />
                Sorted Roster
              </h2>
              <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                Drag to manually adjust • Found in {results.attempts} attempts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.groups.map((group, i) => (
                <PlayerList 
                  key={`group-${i}`} 
                  zoneId={`group-${i}`}
                  title={`Group ${i + 1}`} 
                  players={group} 
                  icon={<Shield className="text-blue-400" size={20}/>}
                  bgClass="bg-[#1f1f2e] border-blue-900/30 shadow-blue-900/10"
                />
              ))}

              <PlayerList 
                zoneId="waitlist"
                title="Priority Waitlist" 
                players={results.waitlist} 
                icon={<Clock className="text-orange-400" size={20}/>}
                bgClass="bg-[#2a221f] border-orange-900/30"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4 border-2 border-dashed border-gray-700/50 rounded-2xl">
            <Users size={64} className="text-gray-700" />
            <p className="text-lg text-center px-4">
              Click <strong>Generate Groups</strong> to sort current data.<br/>
              Or <strong>Upload Image</strong> to update roster from a screenshot.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}