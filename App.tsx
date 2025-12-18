import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AlertCircle, Clock, Users, Play, Trophy, ArrowUp, Lock, Pencil, Save, Ghost, LayoutGrid, Timer, HelpCircle, X, Sparkles, Search, Lightbulb, Repeat, Home, ChevronLeft, User, Flame, Plus, ChevronRight, Check, Keyboard, Map, RefreshCw, Trash2, Calculator, RotateCcw } from 'lucide-react';
import { GameState, GameStage, CategoryId, Player, WordItem, GameType, LiarGameState, LiarPlayer, LiarQuestionPair } from './types';
import { UI_TEXT, CATEGORIES, DEFAULT_PLAYER_COUNT, DEFAULT_TIMER_MINUTES, LIAR_UI_TEXT, LIAR_QUESTIONS, LIAR_GAME_CATEGORIES, KALAKOBANA_UI_TEXT, GEORGIAN_ALPHABET, DEFAULT_KALAKOBANA_CATEGORIES } from './constants';
import { generateGameWords } from './services/geminiService';

// --- Shared Helper Components ---

const Switch = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-green-500' : 'bg-gray-600'}`}
  >
    <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const ListRow = ({ 
  icon: Icon, 
  label, 
  value, 
  color = "text-white", 
  bgIcon = "bg-gray-700",
  onClick,
  hasChevron = true,
  rightElement
}: { 
  icon: React.ElementType, 
  label: string, 
  value?: string | number, 
  color?: string,
  bgIcon?: string,
  onClick?: () => void,
  hasChevron?: boolean,
  rightElement?: React.ReactNode
}) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-4 ${onClick ? 'cursor-pointer active:bg-white/5' : ''} transition-colors border-b border-white/5 last:border-0`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-8 h-8 rounded-lg ${bgIcon} flex items-center justify-center`}>
        <Icon size={18} className={color} />
      </div>
      <span className="font-bold text-white text-lg">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {rightElement}
      {value && <span className="text-gray-400 font-medium">{value}</span>}
      {hasChevron && <ChevronRight size={20} className="text-gray-500" />}
    </div>
  </div>
);

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  title: string, 
  children?: React.ReactNode 
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
      <div className="bg-[#1C1C1E] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 pointer-events-auto transform transition-transform animate-slide-up max-h-[90vh] flex flex-col pb-20 sm:pb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">{title}</h2>
          <button onClick={onClose} className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto scrollbar-hide">
          {children}
        </div>
        <div className="mt-6 pt-2">
             <button onClick={onClose} className="w-full bg-white text-black font-bold py-4 rounded-xl active:scale-95 transition-transform">
                {UI_TEXT.save}
             </button>
        </div>
      </div>
    </div>
  );
};

const PlayersScreen: React.FC<{ 
    color: string, 
    names: string[], 
    count: number, 
    onAddPlayer: () => void,
    onRemovePlayer: (idx: number) => void,
    setName: (i: number, n: string) => void, 
    onBack: () => void,
    defaultName: string
  }> = ({ 
    color, 
    names, 
    count, 
    onAddPlayer,
    onRemovePlayer,
    setName, 
    onBack,
    defaultName
  }) => {
    return (
      <div className={`flex flex-col h-screen ${color} text-white animate-fade-in`}>
        {/* Header */}
        <div className="px-6 safe-pt pb-4 flex items-center gap-4 z-10">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-white/10 transition-colors">
             <ChevronLeft size={32} />
          </button>
          <h1 className="text-3xl font-bold">{UI_TEXT.playersConfig}</h1>
        </div>
  
        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide z-10">
           <div className="bg-[#1C1C1E] rounded-3xl overflow-hiddenl">
              {Array.from({ length: count }).map((_, idx) => (
                 <div key={idx} className="flex items-center justify-between p-5 border-b border-white/10 last:border-0 group">
                    <input
                      type="text"
                      value={names[idx] || ''}
                      onChange={(e) => setName(idx, e.target.value)}
                      placeholder={`${defaultName} ${idx + 1}`}
                      className="bg-transparent text-white font-bold text-lg w-full focus:outline-none placeholder-gray-500"
                    />
                    <div className="flex items-center gap-4">
                       <Pencil size={20} className="text-gray-400 group-focus-within:text-white transition-colors" />
                       {count > 3 && (
                          <button 
                             onClick={() => onRemovePlayer(idx)}
                             className="text-gray-600 hover:text-red-500 transition-colors p-1"
                          >
                             <X size={20} />
                          </button>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        
          {/* Add Button */}
          <div className="p-4 pt-2 flex justify-center z-20">
            <button 
              onClick={onAddPlayer}
              className="bg-[#1C1C1E] text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform text-lg"
            >
                <Plus size={24} />
                {UI_TEXT.addPlayer}
            </button>
          </div>
        </div>

        <div className="p-8 safe-pb bottom-5 flex justify-center z-20">
           <button 
             onClick={onBack}
             className="bg-black text-white font-bold py-4 px-24 rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition-transform text-lg"
           >
              <Save size={24} />
              {UI_TEXT.save}
           </button>
        </div>
      </div>
    )
};

const GameCard = ({ 
    title, 
    description,
    imageColor, 
    tag, 
    onClick,
    icon
}: { 
    title: string, 
    description?: string, 
    imageColor: string, 
    tag?: string, 
    onClick: () => void,
    icon?: React.ReactNode
}) => (
    <button onClick={onClick} className="relative w-full h-56 rounded-[2rem] overflow-hidden shadow-2xl transform active:scale-95 transition-all duration-300 group hover:shadow-3xl ring-0 focus:outline-none">
        <div className={`absolute inset-0 ${imageColor} transition-transform duration-500 group-hover:scale-105`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60 group-hover:to-black/80 transition-all"></div>
        
        {/* Background Pattern/Icon */}
        {icon && <div className="opacity-100 pointer-events-none">{icon}</div>}

        {tag && (
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-black bg-white/90 backdrop-blur text-black shadow-sm flex items-center gap-1 z-20">
                {(tag === 'POPULAR' || tag === 'პოპულარული') && <Flame size={12} className="text-orange-500 fill-orange-500" />}
                {(tag === 'NEW' || tag === 'ახალი') && <Sparkles size={12} className="text-blue-500 fill-blue-500" />}
                {tag}
            </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start text-left z-20">
            <h3 className="text-3xl font-black text-white uppercase leading-none drop-shadow-lg font-['Noto_Sans_Georgian'] mb-2">{title}</h3>
            {description && <p className="text-white/90 font-bold text-sm font-['Noto_Sans_Georgian'] opacity-90">{description}</p>}
        </div>
        
        <div className="absolute right-5 bottom-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
             <Play fill="white" className="text-white ml-1" size={20} />
        </div>
    </button>
);

const CancelGameButton = ({ onConfirm }: { onConfirm: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-[#1C1C1E] p-6 rounded-3xl w-full max-w-xs text-center border border-white/10 shadow-2xl transform scale-100">
            <h3 className="text-xl font-bold text-white mb-8">{UI_TEXT.stopGame}</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-2xl font-bold transition-colors"
              >
                {UI_TEXT.no}
              </button>
              <button 
                onClick={onConfirm}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold transition-colors"
              >
                {UI_TEXT.yes}
              </button>
            </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => setShowConfirm(true)}
        className="absolute top-12 right-6 z-50 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-500/80 transition-colors text-white border border-white/10 shadow-lg active:scale-95"
        style={{ top: 'max(2rem, env(safe-area-inset-top) + 1rem)' }}
      >
        <X size={20} />
      </button>
    </>
  );
};

// --- GAME 1: IMPOSTER GAME COMPONENTS ---

const ImposterMainMenu = ({ 
    onStart, onBack, playerCount, setPlayerCount, onAddPlayer, onRemovePlayer, selectedCategory, setSelectedCategory, 
    customTopic, setCustomTopic, playerNames, setPlayerName, timerEnabled, setTimerEnabled, 
    timerDuration, setTimerDuration, hintsEnabled, setHintsEnabled, imposterCount, setImposterCount
}: any) => {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [showPlayersScreen, setShowPlayersScreen] = useState(false);
  
    const currentCategoryLabel = CATEGORIES.find(c => c.id === selectedCategory)?.label;
  
    const handleDurationClick = () => {
      const next = timerDuration === 3 ? 5 : timerDuration === 5 ? 7 : timerDuration === 7 ? 10 : 3;
      setTimerDuration(next);
    };

    const handleImposterCountClick = () => {
        const maxImposters = Math.floor((playerCount - 1) / 2) || 1;
        const next = imposterCount >= maxImposters ? 1 : imposterCount + 1;
        setImposterCount(next);
    };

    if (showPlayersScreen) {
        return (
            <PlayersScreen 
                color="bg-[#FF3B30]"
                names={playerNames}
                count={playerCount}
                onAddPlayer={onAddPlayer}
                onRemovePlayer={onRemovePlayer}
                setName={setPlayerName}
                onBack={() => setShowPlayersScreen(false)}
                defaultName={UI_TEXT.playerDefaultName}
            />
        );
    }
  
    return (
      <div className="flex flex-col h-full bg-[#FF3B30] text-white overflow-hidden relative animate-fade-in">
         {/* Top Nav */}
         <div className="px-6 safe-pt pb-4 flex justify-between items-center z-10">
            <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <div className="flex gap-4">
              <button onClick={() => setShowRules(true)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <HelpCircle size={24} />
              </button>
            </div>
         </div>
  
         {/* Header */}
         <div className="px-6 pb-8 text-center z-10 flex flex-col items-center">
            <h1 id="fallback-title" className="text-5xl font-black uppercase tracking-tight drop-shadow-md font-['Noto_Sans_Georgian']">
              {UI_TEXT.title}
            </h1>
            <p className="text-white/80 font-medium mt-2">Georgian Party Game</p>
         </div>
  
         {/* Scrollable Content Area */}
         <div className="flex-1 overflow-y-auto px-4 space-y-6 z-10 scrollbar-hide">
            
            {/* Card 1: Game Config */}
            <div className="bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-xl border border-white/5">
                <ListRow 
                  icon={Users} 
                  label={UI_TEXT.playersConfig} 
                  value={playerCount.toString()}
                  color="text-yellow-400"
                  bgIcon="bg-yellow-400/20"
                  onClick={() => setShowPlayersScreen(true)}
                />
                <ListRow 
                  icon={Ghost} 
                  label={UI_TEXT.impostors} 
                  value={imposterCount.toString()}
                  hasChevron={true}
                  color="text-purple-400"
                  bgIcon="bg-purple-400/20"
                  onClick={handleImposterCountClick}
                />
                <ListRow 
                  icon={Lightbulb} 
                  label={UI_TEXT.hintForImposter} 
                  hasChevron={false}
                  color="text-white"
                  bgIcon="bg-gray-600"
                  rightElement={<Switch checked={hintsEnabled} onChange={setHintsEnabled} />}
                  onClick={() => setHintsEnabled(!hintsEnabled)}
                />
                <ListRow 
                  icon={LayoutGrid} 
                  label={UI_TEXT.category} 
                  value={currentCategoryLabel}
                  color="text-blue-400"
                  bgIcon="bg-blue-400/20"
                  onClick={() => setShowCategoryModal(true)}
                />
            </div>
  
            {/* Card 2: Timer Config */}
            <div className="bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-xl border border-white/5">
                <ListRow 
                  icon={Clock} 
                  label={UI_TEXT.timeLimit} 
                  hasChevron={false}
                  color="text-red-400"
                  bgIcon="bg-red-400/20"
                  rightElement={<Switch checked={timerEnabled} onChange={setTimerEnabled} />}
                />
                {timerEnabled && (
                    <ListRow 
                      icon={Timer} 
                      label={UI_TEXT.duration} 
                      value={`${timerDuration} ${UI_TEXT.minutesShort}`}
                      color="text-green-400"
                      bgIcon="bg-green-400/20"
                      onClick={handleDurationClick}
                    />
                )}
            </div>
  
            <div className="text-center text-white/60 text-sm px-4 pb-20">
               {UI_TEXT.rulesText.substring(0, 50)}...
            </div>
  
         </div>
  
         {/* Start Button */}
         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FF3B30] via-[#FF3B30] to-transparent safe-pb z-20">
             <button 
               onClick={onStart}
               className="w-full bg-black text-white h-16 rounded-full text-xl font-black shadow-lg shadow-black/20 active:scale-95 transition-transform flex items-center justify-center gap-3 border border-white/10"
             >
                <Play fill="white" size={20} />
                {UI_TEXT.startGame}
             </button>
         </div>
  
         <Modal 
            isOpen={showCategoryModal} 
            onClose={() => setShowCategoryModal(false)} 
            title={UI_TEXT.chooseCategory}
          >
              <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); }}
                      className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 border-2 h-32 ${
                        selectedCategory === cat.id 
                          ? 'border-white bg-white/10 shadow-lg' 
                          : 'border-transparent bg-gray-800 hover:bg-gray-750'
                      }`}
                    >
                      <span className="text-4xl">{cat.icon}</span>
                      <span className={`font-bold text-sm ${selectedCategory === cat.id ? 'text-white' : 'text-gray-400'}`}>
                        {cat.label}
                      </span>
                    </button>
                  ))}
              </div>
              {selectedCategory === CategoryId.AI_GEN && (
                <div className="mt-6 animate-fade-in">
                  <label className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-2 block">
                    {UI_TEXT.aiGenerate}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder={UI_TEXT.aiPromptPlaceholder}
                      className="w-full bg-gray-800 text-white p-4 rounded-xl border border-gray-700 focus:border-indigo-500 focus:outline-none transition-colors pr-10"
                    />
                    <Sparkles className="absolute right-3 top-4 text-indigo-400" size={20} />
                  </div>
                </div>
              )}
         </Modal>
  
         <Modal
           isOpen={showRules}
           onClose={() => setShowRules(false)}
           title={UI_TEXT.rules}
         >
           <div className="p-4 bg-gray-800 rounded-xl text-gray-300 leading-relaxed">
             {UI_TEXT.rulesText}
           </div>
         </Modal>
  
      </div>
    );
};

const ImposterGame = ({ onBack }: { onBack: () => void }) => {
    const [gameState, setGameState] = useState<GameState>({
        stage: GameStage.MENU,
        players: [],
        currentWord: '',
        currentWordHint: '',
        currentCategory: CategoryId.EASY,
        imposterIndices: [],
        activePlayerRevealIndex: 0,
        timerSeconds: DEFAULT_TIMER_MINUTES * 60,
        winningTeam: null,
        customCategoryPrompt: ''
    });

    const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
    const [imposterCount, setImposterCount] = useState(1);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [timerEnabled, setTimerEnabled] = useState(false); // Default to false
    const [timerDuration, setTimerDuration] = useState(DEFAULT_TIMER_MINUTES);
    const [hintsEnabled, setHintsEnabled] = useState(false);

    // Initial population
    useEffect(() => {
        setPlayerNames(prev => {
           if (prev.length === 0) {
              return Array.from({ length: playerCount }, () => '');
           }
           return prev;
        });
    }, []);

    const handlePlayerNameChange = (index: number, name: string) => {
        const newNames = [...playerNames];
        newNames[index] = name;
        setPlayerNames(newNames);
    };

    const handleAddPlayer = () => {
        setPlayerNames([...playerNames, '']);
        setPlayerCount(c => c + 1);
    };

    const handleRemovePlayer = (index: number) => {
        if (playerCount <= 3) return;
        const newNames = [...playerNames];
        newNames.splice(index, 1);
        setPlayerNames(newNames);
        setPlayerCount(c => c - 1);
        // Ensure imposter count doesn't exceed new limit
        const maxImposters = Math.floor((playerCount - 2) / 2) || 1;
        if (imposterCount > maxImposters) setImposterCount(maxImposters);
    };

    const getRandomWord = async (catId: CategoryId, customPrompt?: string): Promise<WordItem> => {
        if (catId === CategoryId.AI_GEN && customPrompt) {
            setIsLoading(true);
            const aiWords = await generateGameWords(customPrompt);
            setIsLoading(false);
            if (aiWords.length > 0) {
                return aiWords[Math.floor(Math.random() * aiWords.length)];
            }
            return { word: "Error/Fallback", hint: "Error" };
        }
        const category = CATEGORIES.find(c => c.id === catId);
        const words = category ? category.words : CATEGORIES[0].words;
        const randomItem = words[Math.floor(Math.random() * words.length)];
        // Fallback for existing words without hints
        return { word: randomItem.word, hint: randomItem.hint || category?.label || "ზოგადი" };
    };

    const startGame = async () => {
        const selectedWordItem = await getRandomWord(gameState.currentCategory, gameState.customCategoryPrompt);
        
        const indices: number[] = [];
        const count = Math.min(imposterCount, playerCount - 1);
        while (indices.length < count) {
            const idx = Math.floor(Math.random() * playerCount);
            if (!indices.includes(idx)) {
                indices.push(idx);
            }
        }
        
        const newPlayers: Player[] = Array.from({ length: playerCount }, (_, i) => ({
          id: i,
          name: playerNames[i]?.trim() || `${UI_TEXT.playerDefaultName} ${i + 1}`,
          isImposter: indices.includes(i),
          voteCount: 0,
          isAlive: true
        }));
    
        const gameSeconds = timerEnabled ? timerDuration * 60 : 99999;
    
        setGameState({
          ...gameState,
          stage: GameStage.REVEAL,
          players: newPlayers,
          currentWord: selectedWordItem.word,
          currentWordHint: selectedWordItem.hint,
          imposterIndices: indices,
          activePlayerRevealIndex: 0,
          winningTeam: null,
          timerSeconds: gameSeconds
        });
    };

    const handleNextReveal = () => {
        if (gameState.activePlayerRevealIndex < gameState.players.length - 1) {
          setGameState(prev => ({
            ...prev,
            activePlayerRevealIndex: prev.activePlayerRevealIndex + 1
          }));
        } else {
            // Check if timer is enabled
            if (timerEnabled) {
                setGameState(prev => ({
                    ...prev,
                    stage: GameStage.GAMEPLAY
                }));
            } else {
                // If timer is disabled, skip GAMEPLAY and go directly to VOTING
                setGameState(prev => ({
                    ...prev,
                    stage: GameStage.VOTING
                }));
            }
        }
    };

    const handleVote = (votedPlayerId: number) => {
        const votedPlayer = gameState.players.find(p => p.id === votedPlayerId);
        const isImposterCaught = votedPlayer?.isImposter;
        setGameState(prev => ({
          ...prev,
          stage: GameStage.RESULTS,
          winningTeam: isImposterCaught ? 'citizens' : 'imposter'
        }));
    };

    const resetGame = () => {
        setGameState(prev => ({
          ...prev,
          stage: GameStage.MENU,
          activePlayerRevealIndex: 0
        }));
    };

    if (isLoading) {
        return (
            <div className="h-full w-full bg-[#1C1C1E] flex flex-col items-center justify-center text-white">
                 <Sparkles className="animate-spin text-[#FF3B30] mb-4" size={48} />
                 <p className="text-lg font-bold animate-pulse">{UI_TEXT.loadingAi}</p>
            </div>
        );
    }

    return (
        <>
            {gameState.stage !== GameStage.MENU && (
                <CancelGameButton onConfirm={resetGame} />
            )}

            {gameState.stage === GameStage.MENU && (
                <ImposterMainMenu 
                    onStart={startGame}
                    onBack={onBack}
                    playerCount={playerCount}
                    setPlayerCount={setPlayerCount}
                    imposterCount={imposterCount}
                    setImposterCount={setImposterCount}
                    onAddPlayer={handleAddPlayer}
                    onRemovePlayer={handleRemovePlayer}
                    selectedCategory={gameState.currentCategory}
                    setSelectedCategory={(c: CategoryId) => setGameState(prev => ({...prev, currentCategory: c}))}
                    customTopic={gameState.customCategoryPrompt || ''}
                    setCustomTopic={(t: string) => setGameState(prev => ({...prev, customCategoryPrompt: t}))}
                    playerNames={playerNames}
                    setPlayerName={handlePlayerNameChange}
                    timerEnabled={timerEnabled}
                    setTimerEnabled={setTimerEnabled}
                    timerDuration={timerDuration}
                    setTimerDuration={setTimerDuration}
                    hintsEnabled={hintsEnabled}
                    setHintsEnabled={setHintsEnabled}
                />
            )}

            {gameState.stage === GameStage.REVEAL && (
                <RoleReveal 
                  playerNumber={gameState.activePlayerRevealIndex + 1}
                  totalPlayers={gameState.players.length}
                  playerName={gameState.players[gameState.activePlayerRevealIndex].name}
                  role={gameState.players[gameState.activePlayerRevealIndex].isImposter ? 'imposter' : 'citizen'}
                  secretWord={gameState.currentWord}
                  onNext={handleNextReveal}
                  hintsEnabled={hintsEnabled}
                  hintText={gameState.currentWordHint || "No Hint"}
                />
            )}

            {gameState.stage === GameStage.GAMEPLAY && (
                <GameTimer 
                   seconds={gameState.timerSeconds}
                   onTimeUp={() => setGameState(prev => ({ ...prev, stage: GameStage.VOTING }))}
                   onVoteNow={() => setGameState(prev => ({ ...prev, stage: GameStage.VOTING }))}
                />
            )}

            {gameState.stage === GameStage.VOTING && (
                <Voting 
                   players={gameState.players}
                   onVote={handleVote}
                />
            )}

            {gameState.stage === GameStage.RESULTS && (
                <Results 
                   state={gameState}
                   onReset={resetGame}
                   onContinue={startGame}
                />
            )}
        </>
    );
}

// --- GAME 2: WHO'S THE LIAR COMPONENTS ---

const LiarMainMenu = ({ onStart, onBack, playerCount, setPlayerCount, playerNames, setPlayerName, onAddPlayer, onRemovePlayer, selectedCategory, setSelectedCategory, setLiarCount, liarCount }: any) => {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [showPlayersScreen, setShowPlayersScreen] = useState(false);

    const currentCategoryLabel = LIAR_GAME_CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Random';

    const handleLiarCountClick = () => {
      const maxLiar = Math.floor((playerCount - 1) / 2) || 1;
      const next = liarCount >= maxLiar ? 1 : liarCount + 1;
      setLiarCount(next);
    };

    if (showPlayersScreen) {
        return (
            <PlayersScreen 
                color="bg-[#4F46E5]"
                names={playerNames}
                count={playerCount}
                onAddPlayer={onAddPlayer}
                onRemovePlayer={onRemovePlayer}
                setName={setPlayerName}
                onBack={() => setShowPlayersScreen(false)}
                defaultName={UI_TEXT.playerDefaultName}
            />
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#4F46E5] text-white relative animate-fade-in">
             <div className="px-6 safe-pt pb-4 flex justify-between items-center z-10">
                <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex gap-4">
                    <button onClick={() => setShowRules(true)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <HelpCircle size={24} />
                    </button>
                </div>
             </div>

             <div className="px-6 pb-8 text-center z-10">
                <h1 className="text-5xl font-black uppercase tracking-tight drop-shadow-md font-['Noto_Sans_Georgian']">
                    {LIAR_UI_TEXT.title}
                </h1>
             </div>

             <div className="flex-1 px-4 space-y-6 z-10">
                 <div className="bg-[#1C1C1E]/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/10">
                    <ListRow 
                        icon={Users} 
                        label={UI_TEXT.playersConfig} 
                        value={playerCount.toString()}
                        color="text-yellow-400"
                        bgIcon="bg-yellow-400/20"
                        onClick={() => setShowPlayersScreen(true)}
                    />
                     <ListRow 
                        icon={Ghost} 
                        label={LIAR_UI_TEXT.liars} 
                        value={liarCount.toString()}
                        hasChevron={true}
                        color="text-red-400"
                        bgIcon="bg-red-400/20"
                        onClick={handleLiarCountClick}
                    />
                     <ListRow 
                        icon={LayoutGrid} 
                        label={UI_TEXT.category} 
                        value={currentCategoryLabel}
                        color="text-blue-400"
                        bgIcon="bg-blue-400/20"
                        onClick={() => setShowCategoryModal(true)}
                    />
                 </div>
                 <div className="text-center text-white/60 text-sm px-6 pb-20">
                    {LIAR_UI_TEXT.description}
                 </div>
             </div>

             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#4F46E5] via-[#4F46E5] to-transparent safe-pb z-20">
                 <button 
                   onClick={onStart}
                   className="w-full bg-[#1C1C1E] text-white h-16 rounded-full text-xl font-black shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-3"
                 >
                    {UI_TEXT.startGame}
                 </button>
             </div>

            <Modal 
                isOpen={showCategoryModal} 
                onClose={() => setShowCategoryModal(false)} 
                title={UI_TEXT.chooseCategory}
            >
                <div className="grid grid-cols-2 gap-3">
                    {LIAR_GAME_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => { setSelectedCategory(cat.id); }}
                            className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 border-2 h-32 ${
                                selectedCategory === cat.id 
                                ? 'border-white bg-white/10 shadow-lg' 
                                : 'border-transparent bg-gray-800 hover:bg-gray-750'
                            }`}
                        >
                            <span className="text-4xl">{cat.icon}</span>
                            <span className={`font-bold text-sm ${selectedCategory === cat.id ? 'text-white' : 'text-gray-400'}`}>
                                {cat.label}
                            </span>
                        </button>
                    ))}
                </div>
            </Modal>

            <Modal
                isOpen={showRules}
                onClose={() => setShowRules(false)}
                title={LIAR_UI_TEXT.rules}
            >
                <div className="p-4 bg-gray-800 rounded-xl text-gray-300 leading-relaxed">
                    {LIAR_UI_TEXT.rulesText}
                </div>
            </Modal>
        </div>
    );
}

const LiarInput: React.FC<{ player: LiarPlayer, question: string, onSubmit: (ans: string) => void, onPass: () => void }> = ({ player, question, onSubmit, onPass }) => {
    const [ready, setReady] = useState(false);
    const [answer, setAnswer] = useState('');

    if (!ready) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-[#4F46E5] p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 {/* No Header here since Global Exit Button is present */}

                 <button onClick={() => setReady(true)} className="relative z-10 w-full max-w-sm aspect-[3/4] bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-6 border-4 border-white/10 active:scale-95 transition-transform group">
                    <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <User size={48} className="text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">{player.name}</h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">{LIAR_UI_TEXT.tapToFlip}</p>
                 </button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#4F46E5] relative overflow-hidden">
             {/* Header */}
             <div className="px-6 safe-pt pb-4 flex justify-between items-center z-10">
                <div className="w-10" /> 
                <h1 className="text-xl font-bold text-white uppercase tracking-widest opacity-90">{LIAR_UI_TEXT.title}</h1>
                <div className="w-10" />
             </div>

             {/* Main Content */}
             <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 -mt-10">
                <div className="w-full max-w-sm aspect-[4/3] bg-[#121212] rounded-[2rem] border-[3px] border-white shadow-2xl flex flex-col items-center justify-between p-8 relative">
                    
                    {/* Question */}
                    <h2 className="text-2xl font-bold text-white text-center leading-snug pt-2">
                        {question}
                    </h2>

                    {/* Input */}
                    <div className="w-full relative flex-1 flex items-center justify-center">
                        <input 
                            type="text" 
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder={LIAR_UI_TEXT.yourAnswer}
                            className="w-full bg-transparent text-gray-200 text-3xl font-bold text-center placeholder-gray-600 focus:outline-none font-['Noto_Sans_Georgian']"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && answer.trim()) {
                                    onSubmit(answer);
                                }
                            }}
                        />
                    </div>

                    {/* Submit/Keyboard Icon Button */}
                    <div className="absolute bottom-6 right-6">
                         <button 
                            onClick={() => answer.trim() && onSubmit(answer)}
                            disabled={!answer.trim()}
                            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${answer.trim() ? 'bg-blue-600 hover:bg-blue-500 scale-100' : 'bg-gray-800 scale-90'}`}
                         >
                            {answer.trim() ? <Check size={28} className="text-white" /> : <Keyboard size={24} className="text-gray-500" />}
                         </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white/60 font-bold uppercase tracking-widest text-sm mb-1">{LIAR_UI_TEXT.player}</p>
                    <p className="text-white font-black text-3xl">{player.name}</p>
                </div>
             </div>
        </div>
    );
};

const LiarBoard = ({ players, questionPair, onReveal, onRestart, showLiar }: { players: LiarPlayer[], questionPair: LiarQuestionPair, onReveal: () => void, onRestart: () => void, showLiar: boolean }) => {
    return (
        <div className="h-full flex flex-col bg-[#4F46E5] p-6 relative overflow-hidden">
            {!showLiar ? (
                <div className="text-center mb-8 mt-4 relative z-10">
                    <h2 className="text-xl font-bold text-blue-100 mb-2">{LIAR_UI_TEXT.question}</h2>
                    <p className="text-2xl font-black text-white leading-tight">{questionPair.truthQuestion}</p>
                </div>
            ) : (
                 <div className="text-center mb-8 mt-4 relative z-10 space-y-4 bg-black/20 p-4 rounded-2xl">
                     <div>
                        <h2 className="text-xs uppercase text-blue-200 mb-1 tracking-widest">{LIAR_UI_TEXT.truthQuestionWas}</h2>
                        <p className="text-lg font-black text-white leading-tight">{questionPair.truthQuestion}</p>
                     </div>
                     <div className="h-px bg-white/20 w-full" />
                     <div>
                        <h2 className="text-xs uppercase text-red-200 mb-1 tracking-widest">{LIAR_UI_TEXT.liarQuestionWas}</h2>
                        <p className="text-lg font-black text-red-100 leading-tight">{questionPair.liarQuestion}</p>
                     </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 safe-pb overflow-y-auto flex-1 scrollbar-hide relative z-10">
                {players.map((player) => (
                    <div key={player.id} className={`relative bg-[#1C1C1E] p-4 rounded-3xl flex flex-col items-center justify-center aspect-square border-4 ${showLiar && player.isLiar ? 'border-red-500' : 'border-transparent'}`}>
                        <span className="text-gray-400 font-bold text-sm mb-2">{player.name}</span>
                        <span className="text-white text-2xl font-black text-center leading-tight break-words w-full">{player.answer}</span>
                        
                        {showLiar && player.isLiar && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-[20px]">
                                <X className="text-red-500 w-24 h-24" strokeWidth={4} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#4F46E5] via-[#4F46E5] to-transparent safe-pb z-20">
                {!showLiar ? (
                    <button 
                        onClick={onReveal}
                        className="w-full bg-[#1C1C1E] text-white h-16 rounded-2xl text-xl font-black shadow-lg active:scale-95 transition-transform"
                    >
                        {LIAR_UI_TEXT.revealLiars}
                    </button>
                ) : (
                    <button 
                        onClick={onRestart}
                        className="w-full bg-white text-black h-16 rounded-2xl text-xl font-black shadow-lg active:scale-95 transition-transform"
                    >
                        {LIAR_UI_TEXT.restart}
                    </button>
                )}
            </div>
        </div>
    );
}

const LiarGame = ({ onBack }: { onBack: () => void }) => {
    const [gameState, setGameState] = useState<LiarGameState>({
        stage: 'MENU',
        players: [],
        currentQuestion: null,
        activePlayerIndex: 0
    });
    const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
    const [liarCount, setLiarCount] = useState(1);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [showLiar, setShowLiar] = useState(false);

    useEffect(() => {
        setPlayerNames(prev => {
           if (prev.length === 0) {
              return Array.from({ length: playerCount }, () => '');
           }
           return prev;
        });
    }, [playerCount]);

    const handleAddPlayer = () => {
        setPlayerNames([...playerNames, '']);
        setPlayerCount(c => c + 1);
    };

    const handleRemovePlayer = (index: number) => {
        if (playerCount <= 3) return;
        const newNames = [...playerNames];
        newNames.splice(index, 1);
        setPlayerNames(newNames);
        setPlayerCount(c => c - 1);

        const maxLiar = Math.floor((playerCount - 2) / 2) || 1;
        if (liarCount > maxLiar) setLiarCount(maxLiar);
    };

    const handlePlayerNameChange = (index: number, name: string) => {
        const newNames = [...playerNames];
        newNames[index] = name;
        setPlayerNames(newNames);
    };

    const startGame = () => {
        let questionsPool = LIAR_QUESTIONS;
        if (selectedCategory !== 'ALL') {
          const filtered = LIAR_QUESTIONS.filter(q => q.category === selectedCategory);
          if (filtered.length > 0) questionsPool = filtered;
        }
        const question = questionsPool[Math.floor(Math.random() * questionsPool.length)];
        const indices: number[] = [];
        const count = Math.min(liarCount, playerCount - 1);
        while (indices.length < count){
          const liarIndex = Math.floor(Math.random() * playerCount);
          if (!indices.includes(liarIndex)) {
            indices.push(liarIndex);
          }
        }
        
        
        const newPlayers: LiarPlayer[] = Array.from({ length: playerCount }, (_, i) => ({
          id: i,
          name: playerNames[i]?.trim() || `${UI_TEXT.playerDefaultName} ${i + 1}`,
          isLiar: indices.includes(i),
          answer: ''
        }));
    
        setGameState({
          stage: 'INPUT', // We go directly to INPUT because LiarInput handles the transition screen
          players: newPlayers,
          currentQuestion: question,
          activePlayerIndex: 0
        });
        setShowLiar(false);
    };

    const handleInputSubmit = (answer: string) => {
        const updatedPlayers = [...gameState.players];
        updatedPlayers[gameState.activePlayerIndex].answer = answer;

        if (gameState.activePlayerIndex < gameState.players.length - 1) {
            setGameState({
                ...gameState,
                players: updatedPlayers,
                activePlayerIndex: gameState.activePlayerIndex + 1
            });
        } else {
            setGameState({
                ...gameState,
                players: updatedPlayers,
                stage: 'BOARD'
            });
        }
    };

    return (
        <>
            {gameState.stage !== 'MENU' && (
                <CancelGameButton onConfirm={() => setGameState(prev => ({ ...prev, stage: 'MENU' }))} />
            )}

            {gameState.stage === 'MENU' && (
                <LiarMainMenu 
                    onStart={startGame}
                    onBack={onBack}
                    playerCount={playerCount}
                    setPlayerCount={setPlayerCount}
                    liarCount={liarCount}
                    setLiarCount={setLiarCount}
                    onAddPlayer={handleAddPlayer}
                    onRemovePlayer={handleRemovePlayer}
                    playerNames={playerNames}
                    setPlayerName={handlePlayerNameChange}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            )}

            {gameState.stage === 'INPUT' && (
                <LiarInput 
                   key={gameState.activePlayerIndex}
                   player={gameState.players[gameState.activePlayerIndex]}
                   question={gameState.players[gameState.activePlayerIndex].isLiar ? (gameState.currentQuestion?.liarQuestion || '') : (gameState.currentQuestion?.truthQuestion || '')}
                   onSubmit={handleInputSubmit}
                   onPass={onBack}
                />
            )}

            {(gameState.stage === 'BOARD' || gameState.stage === 'REVEAL') && (
                <LiarBoard 
                   players={gameState.players}
                   questionPair={gameState.currentQuestion!}
                   onReveal={() => setShowLiar(true)}
                   onRestart={() => setGameState(prev => ({ ...prev, stage: 'MENU' }))}
                   showLiar={showLiar}
                />
            )}
        </>
    );
};

// --- GAME 3: KALAKOBANA (City Game) ---

const KalakobanaMainMenu = ({ 
  categories, 
  setCategories, 
  onStart, 
  onManualStart,
  onBack,
  totalScore,
  onResetScore
}: { 
  categories: string[], 
  setCategories: (c: string[]) => void, 
  onStart: () => void, 
  onManualStart: (letter: string) => void,
  onBack: () => void,
  totalScore: number,
  onResetScore: () => void
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [manualLetter, setManualLetter] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showRules, setShowRules] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (index: number) => {
    const newCats = [...categories];
    newCats.splice(index, 1);
    setCategories(newCats);
  };

  const submitManualLetter = () => {
      if (manualLetter.trim().length === 1) {
          onManualStart(manualLetter.trim());
          setShowLetterModal(false);
          setManualLetter('');
      }
  };

  return (
    <div className="flex flex-col h-full bg-teal-600 text-white relative animate-fade-in">
        <div className="px-6 safe-pt pb-4 flex justify-between items-center z-10">
          <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronLeft size={24} />
          </button>
          <div className="flex gap-4">
            <button onClick={() => setShowRules(true)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <HelpCircle size={24} />
            </button>
          </div>
        </div>

        <div className="px-6 pb-8 text-center z-10">
          <h1 className="text-4xl font-black uppercase tracking-tight drop-shadow-md font-['Noto_Sans_Georgian']">
            {KALAKOBANA_UI_TEXT.title}
          </h1>
          <p className="text-white/80 font-medium mt-2 text-sm">{KALAKOBANA_UI_TEXT.gameDescription}</p>
        </div>

        <div className="flex-1 px-4 space-y-6 z-10 overflow-hidden flex flex-col">
            
            {/* Session Score Card */}
            <div className="bg-[#1C1C1E]/30 backdrop-blur-xl rounded-3xl p-5 border border-white/10 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Trophy size={20} className="text-yellow-400" />
                    </div>
                    <div>
                        <span className="font-bold text-white text-lg block">{KALAKOBANA_UI_TEXT.sessionScore}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-white">{totalScore}</span>
                     {totalScore > 0 && (
                        <button onClick={onResetScore} className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/40 active:scale-95 transition-all">
                            <RotateCcw size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-[#1C1C1E]/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/10 flex-1 flex flex-col min-h-0">
                <div 
                   onClick={() => setShowCategoryModal(true)}
                   className="p-5 flex items-center justify-between border-b border-white/10 cursor-pointer active:bg-white/5"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                         <LayoutGrid size={20} className="text-orange-400" />
                      </div>
                      <div>
                        <span className="font-bold text-white text-lg block">{KALAKOBANA_UI_TEXT.categories}</span>
                        <span className="text-xs text-gray-400">{categories.length} Selected</span>
                      </div>
                   </div>
                   <Pencil size={20} className="text-gray-400" />
                </div>
                
                {/* Preview List */}
                <div className="p-4 flex flex-wrap gap-2 overflow-y-auto scrollbar-hide">
                  {categories.map((cat, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-teal-800/50 rounded-lg text-sm font-bold border border-teal-500/30">
                      {cat}
                    </span>
                  ))}
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-teal-600 via-teal-600 to-transparent safe-pb z-20 flex gap-4">
           {/* Manual Button */}
           <button 
             onClick={() => setShowLetterModal(true)}
             className="flex-1 bg-teal-800/80 backdrop-blur text-white h-16 rounded-2xl text-lg font-bold shadow-lg active:scale-95 transition-transform flex flex-col items-center justify-center border border-teal-400/30"
           >
              <Keyboard size={20} className="mb-1 opacity-70" />
              <span className="text-sm leading-none">{KALAKOBANA_UI_TEXT.enterLetter}</span>
           </button>

           {/* Random Button */}
           <button 
             onClick={onStart}
             className="flex-[1.5] bg-white text-teal-900 h-16 rounded-2xl text-lg font-black shadow-lg active:scale-95 transition-transform flex flex-col items-center justify-center"
           >
              <RefreshCw size={20} className="mb-1 text-teal-700" />
              <span className="text-sm leading-none">{KALAKOBANA_UI_TEXT.randomLetter}</span>
           </button>
        </div>

        <Modal
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          title={KALAKOBANA_UI_TEXT.categories}
        >
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder={KALAKOBANA_UI_TEXT.enterCategory}
              className="flex-1 bg-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ring-teal-500 transition-all"
            />
            <button 
              onClick={handleAddCategory}
              className="bg-teal-500 text-white rounded-xl px-4 font-bold"
            >
              <Plus />
            </button>
          </div>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-800 p-3 rounded-xl border border-white/5">
                <span className="font-bold text-white">{cat}</span>
                <button 
                  onClick={() => handleRemoveCategory(idx)}
                  className="text-gray-500 hover:text-red-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </Modal>

        <Modal
           isOpen={showRules}
           onClose={() => setShowRules(false)}
           title={UI_TEXT.rules}
         >
           <div className="p-4 bg-gray-800 rounded-xl text-gray-300 leading-relaxed">
             {KALAKOBANA_UI_TEXT.rulesText}
           </div>
         </Modal>

         <Modal
           isOpen={showLetterModal}
           onClose={() => setShowLetterModal(false)}
           title={KALAKOBANA_UI_TEXT.typeLetter}
         >
            <div className="flex flex-col gap-4">
                <input 
                  type="text"
                  maxLength={1}
                  value={manualLetter}
                  onChange={(e) => setManualLetter(e.target.value)}
                  className="w-full h-24 bg-gray-800 rounded-2xl text-center text-6xl font-black text-white focus:outline-none focus:ring-4 ring-teal-500 transition-all uppercase"
                  autoFocus
                />
                <button 
                  onClick={submitManualLetter}
                  disabled={manualLetter.trim().length === 0}
                  className="bg-teal-500 text-white h-14 rounded-xl font-bold text-lg disabled:opacity-50 disabled:scale-100 active:scale-95 transition-all"
                >
                  {UI_TEXT.startGame}
                </button>
            </div>
         </Modal>
    </div>
  );
};

const KalakobanaPlay = ({ 
  categories, 
  currentLetter, 
  onSpinLetter, 
  onFinish 
}: { 
  categories: string[], 
  currentLetter: string | null, 
  onSpinLetter: () => void, 
  onFinish: (answers: Record<string, string>) => void 
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedLetter, setDisplayedLetter] = useState(currentLetter || '?');

  useEffect(() => {
    if (currentLetter) {
        setDisplayedLetter(currentLetter);
    }
  }, [currentLetter]);

  const handleSpin = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setDisplayedLetter(GEORGIAN_ALPHABET[Math.floor(Math.random() * GEORGIAN_ALPHABET.length)]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        onSpinLetter();
        setIsSpinning(false);
      }
    }, 50);
  };

  const handleInputChange = (category: string, value: string) => {
    setAnswers(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="flex flex-col h-full bg-teal-600 text-white overflow-hidden relative">
       {/* Header with improved spacing */}
       <div className="p-6 safe-pt flex justify-between items-center z-10 bg-teal-600 shadow-xl">
           <div className="flex items-center gap-4">
              <div className="bg-white text-teal-700 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg">
                {displayedLetter}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 block">{KALAKOBANA_UI_TEXT.letter}</span>
                <span className="font-bold text-lg">{isSpinning ? '...' : (currentLetter || '?')}</span>
              </div>
           </div>
           
           {/* Space for Exit Button */}
           <div className="w-10"></div>
       </div>

       {/* Form */}
       <div className="flex-1 overflow-y-auto p-4 pb-32 scrollbar-hide">
         {currentLetter ? (
             <div className="space-y-4">
                {categories.map((cat, idx) => (
                  <div key={idx} className="bg-white/10 rounded-2xl p-4 border border-white/5 focus-within:bg-white/20 transition-colors focus-within:border-white/20">
                    <label className="text-xs text-teal-200 font-bold uppercase tracking-wide mb-1 block pl-1">{cat}</label>
                    <input 
                      type="text" 
                      value={answers[cat] || ''}
                      onChange={(e) => handleInputChange(cat, e.target.value)}
                      placeholder={`${currentLetter}...`}
                      className="w-full bg-transparent text-xl font-bold text-white placeholder-teal-300/30 focus:outline-none"
                    />
                  </div>
                ))}
             </div>
         ) : (
           <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Map size={48} className="mb-6 text-teal-200/50 sm:w-16 sm:h-16" strokeWidth={1} />
              <p className="text-teal-200 mb-8 text-sm sm:max-w-xs mx-auto max-w-full">{KALAKOBANA_UI_TEXT.rulesText}</p>
              
              <button 
                 onClick={handleSpin}
                 disabled={isSpinning}
                 className="bg-teal-800 hover:bg-teal-700 p-6 rounded-full shadow-2xl disabled:opacity-50 transition-all active:scale-95 border-4 border-teal-500/30"
               >
                 <RefreshCw size={32} className={`text-white ${isSpinning ? 'animate-spin' : ''}`} />
               </button>
               <p className="text-teal-200 font-bold uppercase tracking-widest text-sm mt-4">{KALAKOBANA_UI_TEXT.randomLetterGenerator}</p>
           </div>
         )}
       </div>

       {/* Footer Button */}
       {currentLetter && (
         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-teal-600 via-teal-600 to-transparent safe-pb z-20">
            <button 
              onClick={() => onFinish(answers)}
              className="w-full bg-red-600 text-white h-16 rounded-2xl text-xl font-black shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              {KALAKOBANA_UI_TEXT.stop}
            </button>
         </div>
       )}
    </div>
  );
};

const KalakobanaScoring = ({ 
  categories, 
  answers, 
  onComplete 
}: { 
  categories: string[], 
  answers: Record<string, string>, 
  onComplete: (roundScore: number) => void 
}) => {
  const [scores, setScores] = useState<Record<string, number>>({});

  const toggleScore = (cat: string) => {
    const current = scores[cat] || 0;
    const next = current === 0 ? 5 : current === 5 ? 10 : current === 10 ? 20 : 0;
    setScores(prev => ({ ...prev, [cat]: next }));
  };

  const totalScore = (Object.values(scores) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col h-full bg-[#1C1C1E] text-white">
        <div className="p-6 safe-pt bg-[#2C2C2E] rounded-b-3xl shadow-2xl z-20">
           {/* Adjusted layout for calculator icon to be next to text and not overlap with exit button */}
           <div className="flex items-center gap-2 mb-1 justify-start">
             <Calculator className="text-teal-500" size={18} />
             <h2 className="text-gray-400 font-bold uppercase tracking-widest text-sm">{KALAKOBANA_UI_TEXT.totalScore}</h2>
           </div>
           <div className="text-6xl font-black text-white">{totalScore}</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
           <p className="text-center text-gray-500 text-xs uppercase tracking-widest my-4"> დააჭირეთ ქულას მისანიჭებლად (0 -&gt; 5 -&gt; 10 -&gt; 20)</p>
           {categories.map((cat, idx) => {
             const score = scores[cat] || 0;
             const color = score === 0 ? 'bg-gray-700 text-gray-400' : score === 5 ? 'bg-orange-500/20 text-orange-500 border-orange-500' : score === 10 ? 'bg-teal-500/20 text-teal-500 border-teal-500' : 'bg-purple-500/20 text-purple-400 border-purple-500';
             
             return (
               <div key={idx} className="bg-[#2C2C2E] p-4 rounded-2xl flex items-center justify-between border border-white/5">
                  <div className="flex-1 min-w-0 pr-4">
                     <div className="text-xs text-gray-500 uppercase font-bold mb-1">{cat}</div>
                     <div className="text-xl font-bold truncate text-white">{answers[cat] || '-'}</div>
                  </div>
                  <button 
                    onClick={() => toggleScore(cat)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl border-2 transition-all active:scale-90 ${color}`}
                  >
                    {score}
                  </button>
               </div>
             )
           })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E] to-transparent safe-pb z-20">
            <button 
              onClick={() => onComplete(totalScore)}
              className="w-full bg-teal-600 text-white h-16 rounded-2xl text-xl font-black shadow-lg active:scale-95 transition-transform"
            >
              {KALAKOBANA_UI_TEXT.finish}
            </button>
         </div>
    </div>
  );
};

const KalakobanaGame = ({ onBack }: { onBack: () => void }) => {
  const [stage, setStage] = useState<'MENU' | 'PLAY' | 'SCORING'>('MENU');
  const [categories, setCategories] = useState(DEFAULT_KALAKOBANA_CATEGORIES);
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionScore, setSessionScore] = useState(0);

  const handleSpinLetter = () => {
    const letter = GEORGIAN_ALPHABET[Math.floor(Math.random() * GEORGIAN_ALPHABET.length)];
    setCurrentLetter(letter);
  };

  const handleManualStart = (letter: string) => {
      setCurrentLetter(letter);
      setStage('PLAY');
  };

  return (
    <>
        {stage !== 'MENU' && (
            <CancelGameButton onConfirm={() => setStage('MENU')} />
        )}

        {stage === 'MENU' && (
            <KalakobanaMainMenu 
                categories={categories}
                setCategories={setCategories}
                onStart={() => {
                    setCurrentLetter(null);
                    setStage('PLAY');
                }}
                onManualStart={handleManualStart}
                onBack={onBack}
                totalScore={sessionScore}
                onResetScore={() => setSessionScore(0)}
            />
        )}

        {stage === 'PLAY' && (
            <KalakobanaPlay 
                categories={categories}
                currentLetter={currentLetter}
                onSpinLetter={handleSpinLetter}
                onFinish={(ans) => {
                    setAnswers(ans);
                    setStage('SCORING');
                }}
            />
        )}

        {stage === 'SCORING' && (
            <KalakobanaScoring 
                categories={categories}
                answers={answers}
                onComplete={(roundScore) => {
                    setSessionScore(prev => prev + roundScore);
                    setCurrentLetter(null);
                    setAnswers({});
                    setStage('MENU');
                }}
            />
        )}
    </>
  );
};

// --- LAUNCHER COMPONENT ---

const Launcher = ({ onSelectGame }: { onSelectGame: (type: GameType) => void }) => {
    return (
        <div className="h-screen bg-[#0F0F11] text-white flex flex-col p-6 relative overflow-hidden font-['Noto_Sans_Georgian']">
             {/* Ambient Background */}
             <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

             <div className="flex justify-center items-center mb-10 pt-8 z-10 safe-pt">
                 <div>
                     <h1 className="text-2xl items-center font-black tracking-tight">გასართობი თამაშები</h1>
                     <p className="text-gray-500 text-center font-medium text-sm mt-1">აირჩიე თამაში და გაერთე</p>
                 </div>
             </div>

             <div className="flex flex-col gap-6 z-10 overflow-y-auto pb-10 scrollbar-hide flex-1">
                 <GameCard 
                    title="იმპოსტერი"
                    description="იპოვე ვინ იმალება თქვენს შორის"
                    imageColor="bg-gradient-to-br from-[#FF3B30] to-[#D32F2F]" 
                    tag="პოპულარული"
                    onClick={() => onSelectGame(GameType.IMPOSTER)}
                    icon={<Ghost className="absolute right-[-10px] bottom-[-20px] w-48 h-48 text-white/10 rotate-12" strokeWidth={1.5} />}
                 />
                 <GameCard 
                    title="მატყუარა"
                    description="გაიგე ვინ იტყუება პასუხებში"
                    imageColor="bg-gradient-to-br from-[#4F46E5] to-[#312E81]"
                    tag="ახალი"
                    onClick={() => onSelectGame(GameType.LIAR)}
                    icon={<AlertCircle className="absolute right-[-20px] bottom-[-30px] w-52 h-52 text-white/10 -rotate-12" strokeWidth={1.5} />}
                 />
                 <GameCard 
                    title="ქალაქობანა"
                    description="სწრაფი წერის და აზროვნების თამაში"
                    imageColor="bg-gradient-to-br from-teal-500 to-teal-700"
                    tag="კლასიკა"
                    onClick={() => onSelectGame(GameType.KALAKOBANA)}
                    icon={<Map className="absolute right-[-20px] bottom-[-30px] w-52 h-52 text-white/10 rotate-6" strokeWidth={1.5} />}
                 />
             </div>
        </div>
    );
};

// --- ROOT COMPONENT ---

const RoleReveal = ({ 
    playerNumber, 
    totalPlayers, 
    playerName,
    role, 
    secretWord, 
    onNext,
    hintsEnabled,
    hintText
  }: { 
    playerNumber: number, 
    totalPlayers: number, 
    playerName: string,
    role: 'imposter' | 'citizen', 
    secretWord: string, 
    onNext: () => void,
    hintsEnabled: boolean,
    hintText: string
  }) => {
    const [isRevealed, setIsRevealed] = useState(false);
  
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#1C1C1E] p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/50 pointer-events-none"></div>
  
          <div className="text-gray-400 font-bold uppercase tracking-widest mb-8 z-10 text-center">
             <div className="text-white text-3xl mt-2 font-black">{playerName}</div>
          </div>
          
          <div className="relative w-full max-w-xs aspect-[3/4] cursor-pointer perspective-1000 group z-10">
             {!isRevealed ? (
               <div 
                  onClick={() => setIsRevealed(true)}
                  className="w-full h-full bg-gradient-to-br from-[#FF3B30] to-[#D32F2F] rounded-3xl shadow-2xl shadow-red-900/20 flex flex-col items-center justify-center p-6 text-center border-4 border-white/5 transition-transform hover:scale-[1.02] active:scale-95"
               >
                  <div className="w-24 h-24 bg-black/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                      <ArrowUp className="text-white w-12 h-12 animate-bounce" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">{UI_TEXT.tapToReveal}</h2>
               </div>
             ) : (
                role === 'imposter' ? (
                    <div className="w-full h-full bg-white text-gray-900 rounded-3xl shadow-2xl flex flex-col items-center justify-between p-6 text-center animate-flip-in relative overflow-hidden border-4 border-red-500/20">
                        {/* Center Icon - Red for Imposter */}
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto mt-4">
                             <Ghost className="text-red-600 w-12 h-12" />
                        </div>

                        {/* Role Title */}
                        <div className="z-10">
                            <h3 className="text-xl font-bold text-gray-500 mb-2">{UI_TEXT.youAre}</h3>
                            <h1 className="text-4xl font-black text-red-600 uppercase mb-4 drop-shadow-sm">{UI_TEXT.impostors}</h1>
                        </div>

                        {/* The HINT - Very Prominent Box */}
                        {hintsEnabled ? (
                            <div className="w-full bg-red-200 border-2 border-gray-200 rounded-2xl p-4 relative mt-2 flex-1 flex flex-col justify-center">
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-gray-400 text-xs font-bold uppercase border border-gray-200 rounded-full whitespace-nowrap">
                                    {UI_TEXT.hint}
                                </div>
                                <p className="text-3xl font-black text-gray-900 uppercase tracking-tight">{hintText}</p>
                            </div>
                        ) : (
                             <div className="w-full bg-red-50 border-2 border-red-100 rounded-2xl p-4 relative mt-2 flex-1 flex flex-col justify-center items-center opacity-80">
                                <p className="text-xl font-bold text-red-900 uppercase tracking-tight text-center leading-tight">{UI_TEXT.tryToBlendIn}</p>
                            </div>
                        )}

                         <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsRevealed(false); 
                                onNext();
                            }}
                            className="mt-6 bg-red-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform w-full z-20"
                          >
                             {UI_TEXT.hideCard}
                          </button>
                    </div>
                ) : (
                   <div className="w-full h-full bg-white text-gray-900 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 text-center animate-flip-in relative overflow-hidden">
                       <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                          <Lock className="text-green-600 w-12 h-12" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-500 mb-2">{UI_TEXT.secretWord}</h3>
                       <h1 className="text-4xl font-black text-gray-900 uppercase mb-4 break-words w-full leading-tight">{secretWord}</h1>
                       <p className="text-gray-500 text-sm">{UI_TEXT.describeWord}</p>

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsRevealed(false); 
                                onNext();
                            }}
                            className="mt-auto mb-4 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform w-full z-20"
                        >
                            {UI_TEXT.hideCard}
                        </button>
                   </div>
                )
             )}
          </div>
      </div>
    );
};

const GameTimer = ({ 
      seconds, 
      onTimeUp, 
      onVoteNow 
  }: { 
      seconds: number, 
      onTimeUp: () => void, 
      onVoteNow: () => void 
  }) => {
      // Initialize timeLeft with seconds, ensure it's valid
      const [timeLeft, setTimeLeft] = useState(Math.max(0, seconds));
  
      useEffect(() => {
          // Re-sync if seconds prop changes significantly (new game)
          setTimeLeft(Math.max(0, seconds));
      }, [seconds]);
  
      useEffect(() => {
          if (seconds > 6000) { // Infinite mode
              return; 
          }
          if (timeLeft <= 0) {
              onTimeUp();
              return;
          }
          const timer = setInterval(() => {
              setTimeLeft(prev => Math.max(0, prev - 1));
          }, 1000);
          return () => clearInterval(timer);
      }, [timeLeft, onTimeUp, seconds]);
  
      const formatTime = (s: number) => {
          const m = Math.floor(s / 60);
          const sec = s % 60;
          return `${m}:${sec < 10 ? '0' : ''}${sec}`;
      };
  
      const isInfinite = seconds > 6000;
      
      // Circle Math
      const radius = 120;
      const circumference = 2 * Math.PI * radius;
      // Avoid division by zero if seconds is 0
      const safeSeconds = seconds > 0 ? seconds : 1;
      const strokeOffset = circumference * (1 - timeLeft / safeSeconds);
  
      return (
          <div className="h-full flex flex-col items-center justify-center bg-[#1C1C1E] text-white p-6 relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                  {!isInfinite && (
                      <div 
                          className="h-full bg-red-500 transition-all duration-1000 ease-linear"
                          style={{ width: `${(timeLeft/safeSeconds)*100}%` }} 
                      />
                  )}
               </div>
  
              <div className="text-center space-y-8 z-10 w-full max-w-md">
                  <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">{UI_TEXT.timeRemaining}</h2>
                  
                  <div className="relative flex items-center justify-center py-4">
                      {/* Timer Circle */}
                      <div className="w-72 h-72 flex items-center justify-center relative">
                          {!isInfinite && (
                              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 288 288">
                                  <circle
                                      cx="144"
                                      cy="144"
                                      r={radius}
                                      stroke="#374151" // gray-700
                                      strokeWidth="12"
                                      fill="transparent"
                                  />
                                  <circle
                                      cx="144"
                                      cy="144"
                                      r={radius}
                                      stroke="#EF4444" // red-500
                                      strokeWidth="12"
                                      fill="transparent"
                                      strokeLinecap="round"
                                      strokeDasharray={circumference}
                                      strokeDashoffset={strokeOffset}
                                      className="transition-all duration-1000 ease-linear"
                                  />
                              </svg>
                          )}
                           {/* Infinite Mode Static Circle */}
                          {isInfinite && (
                               <div className="w-64 h-64 rounded-full border-8 border-gray-700 absolute" />
                          )}
  
                          <div className="flex flex-col items-center absolute inset-0 justify-center">
                              <span className="text-7xl font-black tabular-nums font-['Noto_Sans_Georgian'] tracking-tighter">
                                  {isInfinite ? "∞" : formatTime(timeLeft)}
                              </span>
                              {isInfinite && <span className="text-gray-500 font-bold mt-2">No Limit</span>}
                          </div>
                      </div>
                  </div>
  
                  <button 
                      onClick={onVoteNow}
                      className="w-full bg-white text-black hover:bg-gray-200 py-5 rounded-2xl text-xl font-black shadow-xl shadow-white/10 active:scale-95 transition-all"
                  >
                      {UI_TEXT.voteTitle}
                  </button>
              </div>
          </div>
      );
  };

const Voting = ({ 
    players, 
    onVote 
}: { 
    players: Player[], 
    onVote: (playerId: number) => void 
}) => {
    return (
        <div className="h-full flex flex-col bg-[#1C1C1E] text-white p-6 overflow-hidden">
            <div className="text-center mb-8 mt-4">
                <h2 className="text-3xl font-black text-white mb-2">{UI_TEXT.voteTitle}</h2>
                <p className="text-gray-400">{UI_TEXT.voteSubtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-20 overflow-y-auto flex-1 scrollbar-hide">
                {players.map((player) => (
                    <button
                        key={player.id}
                        onClick={() => onVote(player.id)}
                        className="bg-gray-800 p-6 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-gray-700 active:bg-red-600 transition-all border-2 border-transparent hover:border-white/10 active:scale-95"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner text-white">
                             {player.name[0].toUpperCase()}
                        </div>
                        <span className="font-bold text-lg truncate w-full text-center">{player.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const Results = ({ 
    state, 
    onReset,
    onContinue
}: { 
    state: GameState, 
    onReset: () => void,
    onContinue: () => void
}) => {
    const imposters = state.players.filter(p => p.isImposter);
    const imposterWon = state.winningTeam === 'imposter';

    return (
        <div className={`h-full flex flex-col items-center justify-center p-6 text-center ${imposterWon ? 'bg-[#FF3B30]' : 'bg-green-600'} transition-colors duration-500`}>
            
            <div className="mb-8 animate-bounce drop-shadow-lg">
                 {imposterWon ? <Ghost size={100} className="text-white" /> : <Trophy size={100} className="text-yellow-300" />}
            </div>

            <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tight drop-shadow-md">
                {imposterWon ? UI_TEXT.imposterWins : UI_TEXT.citizensWin}
            </h1>
            
            <div className="bg-black/40 p-8 rounded-3xl backdrop-blur-md w-full max-w-sm mt-8 border border-white/10 shadow-2xl">
                <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-2">{imposters.length > 1 ? UI_TEXT.impostors : UI_TEXT.imposterWas}</p>
                <div className="text-4xl font-black text-white mb-8 flex flex-col items-center justify-center gap-2">
                     {imposters.map(i => i.name).join(", ")}
                </div>

                <div className="h-px bg-white/20 w-full mb-8"></div>

                <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-2">{UI_TEXT.wordWas}</p>
                <div className="text-3xl font-black text-yellow-300">{state.currentWord}</div>
            </div>

            <div className="flex gap-4 mt-12 w-full max-w-md">
                <button 
                    onClick={onReset}
                    className="flex-1 flex items-center justify-center gap-2 bg-black/40 text-white px-6 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-black/60 active:scale-95 transition-all border border-white/10"
                >
                    <Home size={20} />
                    {UI_TEXT.menu}
                </button>
                <button 
                    onClick={onContinue}
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black px-6 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                    <Repeat size={20} />
                    {UI_TEXT.continue}
                </button>
            </div>
        </div>
    );
};


export default function App() {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  // Create a visual effect for Imposter (Red) vs Liar (Blue) vs Default (Black)
  const getBgColor = () => {
      if (activeGame === GameType.IMPOSTER) return 'bg-[#FF3B30]';
      if (activeGame === GameType.LIAR) return 'bg-[#4F46E5]';
      if (activeGame === GameType.KALAKOBANA) return 'bg-teal-600';
      return 'bg-black';
  };

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden transition-colors duration-500 ${getBgColor()}`}>
      <div className="h-full w-full max-w-md mx-auto shadow-2xl overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-hidden relative h-full">
            {!activeGame && (
                <Launcher onSelectGame={setActiveGame} />
            )}

            {activeGame === GameType.IMPOSTER && (
                <ImposterGame onBack={() => setActiveGame(null)} />
            )}

            {activeGame === GameType.LIAR && (
                <LiarGame onBack={() => setActiveGame(null)} />
            )}

            {activeGame === GameType.KALAKOBANA && (
                <KalakobanaGame onBack={() => setActiveGame(null)} />
            )}
        </div>
      </div>
    </div>
  );
}