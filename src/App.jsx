import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  Sword,
  Shield,
  Zap,
  Flame,
  Trophy,
  AlertTriangle,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Calendar,
  Smartphone,
  Play,
  Film,
  RefreshCw,
  Download,
  Upload,
  Copy,
  Check,
  Award,
  TrendingUp,
  Lock,
  Unlock,
  Sliders,
  Eye,
  Maximize2,
  X,
  ChevronRight,
  Sparkles,
  Brain,
  Dumbbell,
  Target,
  Clock,
  Save,
  FolderOpen,
  History,
  Terminal,
  HelpCircle,
  Crown,
  Skull,
  FastForward,
  RotateCcw,
} from 'lucide-react';

// ==========================================
// 1. CONFIGURATION DES RANGS & COURBE 5 ANS
// ==========================================
const RANKS_CONFIG = [
  {
    min: 0,
    max: 19,
    rank: 'RANG E',
    shortRank: 'E',
    title: 'Chasseur Éveillé',
    color: '#94A3B8',
    borderGlow: 'rgba(148, 163, 184, 0.45)',
    bgGrad: 'from-slate-800/80 to-slate-950/90',
    badgeBg: 'bg-slate-800 text-slate-200 border-slate-500',
  },
  {
    min: 20,
    max: 39,
    rank: 'RANG D',
    shortRank: 'D',
    title: 'Combattant d’Acier',
    color: '#10B981',
    borderGlow: 'rgba(16, 185, 129, 0.5)',
    bgGrad: 'from-emerald-950/80 to-slate-950/90',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-500',
  },
  {
    min: 40,
    max: 59,
    rank: 'RANG C',
    shortRank: 'C',
    title: 'Vétéran du Système',
    color: '#00E5FF',
    borderGlow: 'rgba(0, 229, 255, 0.55)',
    bgGrad: 'from-cyan-950/80 to-slate-950/90',
    badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-400',
  },
  {
    min: 60,
    max: 79,
    rank: 'RANG B',
    shortRank: 'B',
    title: 'Chevalier d’Élite',
    color: '#A855F7',
    borderGlow: 'rgba(168, 85, 247, 0.55)',
    bgGrad: 'from-purple-950/80 to-slate-950/90',
    badgeBg: 'bg-purple-950 text-purple-300 border-purple-500',
  },
  {
    min: 80,
    max: 99,
    rank: 'RANG A',
    shortRank: 'A',
    title: 'Maître de Guilde',
    color: '#F43F5E',
    borderGlow: 'rgba(244, 63, 94, 0.6)',
    bgGrad: 'from-rose-950/80 to-slate-950/90',
    badgeBg: 'bg-rose-950 text-rose-300 border-rose-500',
  },
  {
    min: 100,
    max: 120,
    rank: 'RANG S',
    shortRank: 'S',
    title: 'Transcendant S-Class',
    color: '#FFD700',
    borderGlow: 'rgba(255, 215, 0, 0.65)',
    bgGrad: 'from-amber-950/80 to-slate-950/90',
    badgeBg: 'bg-amber-950 text-amber-300 border-amber-400',
  },
  {
    min: 121,
    max: 149,
    rank: 'RANG S+ • NATIONAL',
    shortRank: 'S+',
    title: 'Chasseur d’Autorité Nationale',
    color: '#38BDF8',
    borderGlow: 'rgba(56, 189, 248, 0.75)',
    bgGrad: 'from-sky-900/80 via-indigo-950/80 to-slate-950/95',
    badgeBg: 'bg-sky-950 text-sky-200 border-sky-400',
  },
  {
    min: 150,
    max: 9999,
    rank: 'MONARQUE',
    shortRank: '👑',
    title: 'Monarque des Ombres',
    color: '#C084FC',
    borderGlow: 'rgba(192, 132, 252, 0.85)',
    bgGrad: 'from-fuchsia-950/90 via-purple-950/90 to-black',
    badgeBg: 'bg-purple-950 text-fuchsia-300 border-fuchsia-400',
  },
];

const CATEGORIES = [
  { id: 'Physique', label: 'Physique', color: '#FF1E42', icon: Dumbbell },
  { id: 'Focus', label: 'Focus', color: '#00E5FF', icon: Target },
  { id: 'Mental', label: 'Mental', color: '#A855F7', icon: Brain },
  { id: 'Discipline', label: 'Discipline', color: '#FFD700', icon: Shield },
];

const DEFAULT_TODAY_QUESTS = [
  {
    id: 'q1',
    title: 'Entraînement Intensif (Muscu / Cardio 45m)',
    category: 'Physique',
    points: 30,
    completed: false,
  },
  {
    id: 'q2',
    title: 'Session Deep Work (3h sans distraction)',
    category: 'Focus',
    points: 35,
    completed: false,
  },
  {
    id: 'q3',
    title: 'Lecture & Apprentissage (20 pages)',
    category: 'Mental',
    points: 15,
    completed: false,
  },
  {
    id: 'q4',
    title: 'Réveil à l’heure & Zéro Scroll matinal',
    category: 'Discipline',
    points: 20,
    completed: false,
  },
];

const DEFAULT_TOMORROW_QUESTS = [
  {
    id: 'tq1',
    title: 'Séance Physique Quotidienne',
    category: 'Physique',
    points: 30,
    completed: false,
  },
  {
    id: 'tq2',
    title: 'Projet Prioritaire (Bloc Focus)',
    category: 'Focus',
    points: 35,
    completed: false,
  },
  {
    id: 'tq3',
    title: 'Méditation & Lecture (30 min)',
    category: 'Mental',
    points: 15,
    completed: false,
  },
  {
    id: 'tq4',
    title: 'Diète propre & Sommeil avant 23h30',
    category: 'Discipline',
    points: 20,
    completed: false,
  },
];

const DEFAULT_TEMPLATES = [
  {
    id: 'tpl_warrior',
    name: 'Journée Chasseur (Équilibré)',
    quests: [
      { title: 'Séance Sport / Musculation', category: 'Physique', points: 30 },
      { title: '3h Deep Work sur Objectif #1', category: 'Focus', points: 35 },
      { title: 'Lecture 20 pages', category: 'Mental', points: 15 },
      {
        title: 'Zéro réseau social inutile & Réveil fixe',
        category: 'Discipline',
        points: 20,
      },
    ],
  },
  {
    id: 'tpl_deepwork',
    name: 'Mode Deep Work Extrême',
    quests: [
      { title: 'Bloc Focus Matinal (3h)', category: 'Focus', points: 35 },
      { title: 'Bloc Focus Après-midi (2h)', category: 'Focus', points: 25 },
      {
        title: 'Marche rapide / Mobilité (30m)',
        category: 'Physique',
        points: 20,
      },
      {
        title: 'Planification & Inbox Zero',
        category: 'Discipline',
        points: 20,
      },
    ],
  },
  {
    id: 'tpl_spartan',
    name: 'Entraînement Sparte',
    quests: [
      {
        title: '100 Pompes, 100 Squats, 10km / HIIT',
        category: 'Physique',
        points: 45,
      },
      {
        title: 'Douche froide & Hydratation 3L',
        category: 'Discipline',
        points: 20,
      },
      { title: 'Travail essentiel (2h)', category: 'Focus', points: 20 },
      { title: 'Méditation & Calme mental', category: 'Mental', points: 15 },
    ],
  },
];

const DEFAULT_VIDEOS = [
  {
    id: 'v1',
    title: 'David Goggins - Personne ne viendra te sauver',
    url: 'https://www.youtube.com/watch?v=TLKxdTmk-zc',
    tag: 'Discipline',
    note: 'À regarder immédiatement quand l’envie de procrastiner apparaît. Le confort est un piège.',
  },
  {
    id: 'v2',
    title: 'Solo Leveling - Arise & Level Up Mindset',
    url: 'https://www.youtube.com/watch?v=fSMc2-1-G9c',
    tag: 'Anime',
    note: 'Rappelle-toi pourquoi tu as commencé au Rang E. Chaque jour à 100/100 forge le Monarque.',
  },
  {
    id: 'v3',
    title: 'L’Art de la Discipline Quotidienne (Focus Absolu)',
    url: 'https://www.youtube.com/watch?v=wnHW6o8WMas',
    tag: 'Mental',
    note: 'La motivation te lance, mais seul le Système te maintient au sommet pendant 5 ans.',
  },
];

// Helper: Get Rank info for a given level
function getRankInfo(level) {
  const found = RANKS_CONFIG.find((r) => level >= r.min && level <= r.max);
  return found || RANKS_CONFIG[0];
}

// Helper: Days required to pass from `level` to `level + 1`
function getRequiredDaysForLevel(level, maxDaysCap = 20) {
  const effectiveLevel = Math.max(1, level);
  return Math.min(effectiveLevel, maxDaysCap);
}

// Helper: Total cumulative days from Level 1 to `targetLevel`
function getCumulativeDaysToLevel(fromLevel, targetLevel, maxDaysCap = 20) {
  if (targetLevel <= fromLevel) return 0;
  let total = 0;
  for (let l = fromLevel; l < targetLevel; l++) {
    total += getRequiredDaysForLevel(l, maxDaysCap);
  }
  return total;
}

// Helper: Extract YouTube & Instagram Embed URL
function getEmbedUrl(url) {
  if (!url) return null;
  try {
    const clean = url.trim();

    // 1. YouTube (liens normaux, courts, Shorts, déjà embed)
    if (clean.includes('youtube.com/embed/')) return clean;
    let ytVideoId = null;
    if (clean.includes('youtu.be/')) {
      ytVideoId = clean.split('youtu.be/')[1]?.split(/[?&]/)[0];
    } else if (clean.includes('youtube.com/shorts/')) {
      ytVideoId = clean.split('youtube.com/shorts/')[1]?.split(/[?&]/)[0];
    } else if (clean.includes('v=')) {
      ytVideoId = clean.split('v=')[1]?.split('&')[0];
    }
    if (ytVideoId) {
      return `https://www.youtube.com/embed/${ytVideoId}`;
    }

    // 2. Instagram (Reels, Posts /p/, IGTV)
    const instaMatch = clean.match(
      /instagram\.com\/(reel|p|tv)\/([A-Za-z0-9_-]+)/
    );
    if (instaMatch) {
      return `https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed/`;
    }

    return null;
  } catch {
    return null;
  }
}

export default function App() {
  // ==========================================
  // 2. ÉTAT GLOBAL DU SYSTÈME
  // ==========================================
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'planner' | 'wallpaper' | 'sanctuary' | 'sync'
  const [level, setLevel] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(0); // Days validated at 100/100 in current level
  const [consecutiveFailures, setConsecutiveFailures] = useState(0); // 2 failures in a row = Level - 1
  const [maxDaysCap, setMaxDaysCap] = useState(20); // 20 = Rang S in 5 yrs | 13 = Monarque Lv.150 in 5 yrs
  const [totalPerfectDays, setTotalPerfectDays] = useState(0);

  const [todayQuests, setTodayQuests] = useState(DEFAULT_TODAY_QUESTS);
  const [tomorrowQuests, setTomorrowQuests] = useState(DEFAULT_TOMORROW_QUESTS);
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
  const [videos, setVideos] = useState(DEFAULT_VIDEOS);
  const [historyLogs, setHistoryLogs] = useState([
    {
      id: 'h1',
      date: 'J-3',
      score: 100,
      status: 'PERFECT',
      levelAfter: 1,
      note: 'Toutes les quêtes accomplies.',
    },
    {
      id: 'h2',
      date: 'J-2',
      score: 80,
      status: 'FAILED',
      levelAfter: 1,
      note: 'Série réinitialisée (1/2 avant pénalité).',
    },
    {
      id: 'h3',
      date: 'Hier',
      score: 100,
      status: 'PERFECT',
      levelAfter: 1,
      note: 'Reprise de la discipline.',
    },
  ]);

  // Modals & UI Notifications
  const [systemAlert, setSystemAlert] = useState(null); // { type: 'LEVEL_UP' | 'RANK_DOWN' | 'STREAK_RESET' | 'INFO', title, subtitle, details }
  const [showSimulator, setShowSimulator] = useState(false);

  // Forms States
  const [newTodayTitle, setNewTodayTitle] = useState('');
  const [newTodayCategory, setNewTodayCategory] = useState('Focus');
  const [newTodayPoints, setNewTodayPoints] = useState(20);

  const [newTomorrowTitle, setNewTomorrowTitle] = useState('');
  const [newTomorrowCategory, setNewTomorrowCategory] = useState('Focus');
  const [newTomorrowPoints, setNewTomorrowPoints] = useState(25);
  const [templateNameInput, setTemplateNameInput] = useState('');

  // Wallpaper Configuration States
  const canvasRef = useRef(null);
  const [wallpaperQuote, setWallpaperQuote] = useState(
    'L’ÉCHEC BRISE LE RANG. LA DISCIPLINE FORGE LE MONARQUE.'
  );
  const [wallpaperSource, setWallpaperSource] = useState('today'); // 'today' | 'tomorrow'
  const [showPhoneClockOverlay, setShowPhoneClockOverlay] = useState(true);

  // Sanctuary States
  const [selectedVideoTag, setSelectedVideoTag] = useState('Tous');
  const [focusedVideo, setFocusedVideo] = useState(null);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTag, setNewVideoTag] = useState('Discipline');
  const [newVideoNote, setNewVideoNote] = useState('');

  // Sync States
  const [syncString, setSyncString] = useState('');
  const [importFeedback, setImportFeedback] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // ==========================================
  // 3. PERSISTANCE LOCALSTORAGE
  // ==========================================
  useEffect(() => {
    try {
      const saved = localStorage.getItem('system_level_up_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.level === 'number') setLevel(parsed.level);
        if (typeof parsed.currentStreak === 'number')
          setCurrentStreak(parsed.currentStreak);
        if (typeof parsed.consecutiveFailures === 'number')
          setConsecutiveFailures(parsed.consecutiveFailures);
        if (typeof parsed.maxDaysCap === 'number')
          setMaxDaysCap(parsed.maxDaysCap);
        if (typeof parsed.totalPerfectDays === 'number')
          setTotalPerfectDays(parsed.totalPerfectDays);
        if (Array.isArray(parsed.todayQuests))
          setTodayQuests(parsed.todayQuests);
        if (Array.isArray(parsed.tomorrowQuests))
          setTomorrowQuests(parsed.tomorrowQuests);
        if (Array.isArray(parsed.templates)) setTemplates(parsed.templates);
        if (Array.isArray(parsed.videos)) setVideos(parsed.videos);
        if (Array.isArray(parsed.historyLogs))
          setHistoryLogs(parsed.historyLogs);
        if (parsed.wallpaperQuote) setWallpaperQuote(parsed.wallpaperQuote);
      }
    } catch (e) {
      console.warn('Impossible de charger la sauvegarde locale:', e);
    }
  }, []);

  useEffect(() => {
    try {
      const payload = {
        level,
        currentStreak,
        consecutiveFailures,
        maxDaysCap,
        totalPerfectDays,
        todayQuests,
        tomorrowQuests,
        templates,
        videos,
        historyLogs,
        wallpaperQuote,
      };
      localStorage.setItem('system_level_up_v2', JSON.stringify(payload));
    } catch (e) {
      // Ignore storage quota issues
    }
  }, [
    level,
    currentStreak,
    consecutiveFailures,
    maxDaysCap,
    totalPerfectDays,
    todayQuests,
    tomorrowQuests,
    templates,
    videos,
    historyLogs,
    wallpaperQuote,
  ]);

  // ==========================================
  // 4. CALCULS DÉRIVÉS (SCORE, RANG, PROGRESSION)
  // ==========================================
  const rankInfo = useMemo(() => getRankInfo(level), [level]);
  const requiredDays = useMemo(
    () => getRequiredDaysForLevel(level, maxDaysCap),
    [level, maxDaysCap]
  );

  const todayScore = useMemo(() => {
    const raw = todayQuests.reduce(
      (acc, q) => (q.completed ? acc + Number(q.points || 0) : acc),
      0
    );
    return Math.min(100, raw);
  }, [todayQuests]);

  const todayTotalPlanned = useMemo(() => {
    return todayQuests.reduce((acc, q) => acc + Number(q.points || 0), 0);
  }, [todayQuests]);

  const tomorrowTotalPoints = useMemo(() => {
    return tomorrowQuests.reduce((acc, q) => acc + Number(q.points || 0), 0);
  }, [tomorrowQuests]);

  // Days remaining to next Rank and to Rank S / Monarque
  const progressionStats = useMemo(() => {
    const nextRankConfig = RANKS_CONFIG.find((r) => r.min > level);
    const daysLeftInCurrentLevel = Math.max(0, requiredDays - currentStreak);

    let daysToNextRank = daysLeftInCurrentLevel;
    if (nextRankConfig) {
      daysToNextRank += getCumulativeDaysToLevel(
        level + 1,
        nextRankConfig.min,
        maxDaysCap
      );
    } else {
      daysToNextRank = 0;
    }

    const daysToRankS =
      level >= 100
        ? 0
        : daysLeftInCurrentLevel +
          getCumulativeDaysToLevel(level + 1, 100, maxDaysCap);

    const daysToMonarch =
      level >= 150
        ? 0
        : daysLeftInCurrentLevel +
          getCumulativeDaysToLevel(level + 1, 150, maxDaysCap);

    return {
      nextRankName: nextRankConfig ? nextRankConfig.rank : 'MAX (MONARQUE)',
      daysToNextRank,
      daysToRankS,
      daysToMonarch,
    };
  }, [level, requiredDays, currentStreak, maxDaysCap]);

  // ==========================================
  // 5. LOGIQUE DE JEU & CLÔTURE DE JOURNÉE
  // ==========================================
  const evaluateDayOutcome = useCallback(
    (scoreToEvaluate, promoteTomorrow = true) => {
      const dateStr = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
      });

      if (scoreToEvaluate >= 100) {
        // JOURNÉE PARFAITE (100/100)
        const nextStreak = currentStreak + 1;
        const needed = getRequiredDaysForLevel(level, maxDaysCap);
        setTotalPerfectDays((prev) => prev + 1);
        setConsecutiveFailures(0);

        if (nextStreak >= needed) {
          // LEVEL UP!
          const nextLevel = level + 1;
          const oldRank = getRankInfo(level).rank;
          const newRank = getRankInfo(nextLevel).rank;
          setLevel(nextLevel);
          setCurrentStreak(0);

          setHistoryLogs((prev) => [
            {
              id: Date.now().toString(),
              date: dateStr,
              score: 100,
              status: 'LEVEL_UP',
              levelAfter: nextLevel,
              note: `LEVEL UP ! Passage au Niveau ${nextLevel} (${newRank}).`,
            },
            ...prev.slice(0, 29),
          ]);

          setSystemAlert({
            type: 'LEVEL_UP',
            title: 'LEVEL UP !',
            subtitle: `NIVEAU ${level} ➔ NIVEAU ${nextLevel}`,
            details:
              oldRank !== newRank
                ? `PROMOTION DE RANG : Vous avez atteint le ${newRank} (${
                    getRankInfo(nextLevel).title
                  }) !`
                : `Conditions remplies (${needed}/${needed} jours à 100/100). Vos capacités augmentent.`,
          });
        } else {
          // PROGRESSION DANS LE NIVEAU ACTUEL
          setCurrentStreak(nextStreak);
          setHistoryLogs((prev) => [
            {
              id: Date.now().toString(),
              date: dateStr,
              score: 100,
              status: 'PERFECT',
              levelAfter: level,
              note: `Jour parfait validé (${nextStreak}/${needed} pour Niv. ${
                level + 1
              }).`,
            },
            ...prev.slice(0, 29),
          ]);

          setSystemAlert({
            type: 'INFO',
            title: 'QUÊTE QUOTIDIENNE ACCOMPLIE',
            subtitle: `SÉRIE DE NIVEAU : ${nextStreak} / ${needed} JOURS`,
            details: `Score 100/100 enregistré. Encore ${
              needed - nextStreak
            } jour(s) parfait(s) pour passer au Niveau ${level + 1}.`,
          });
        }
      } else {
        // ÉCHEC (< 100/100) -> PÉNALITÉ HARDCORE (OPTION B)
        const newFailures = consecutiveFailures + 1;
        setCurrentStreak(0);

        if (newFailures >= 2) {
          // 2 ÉCHECS CONSÉCUTIFS -> RÉTROGRADATION DE NIVEAU
          const demotedLevel = Math.max(0, level - 1);
          setLevel(demotedLevel);
          setConsecutiveFailures(0); // Reset counter after applying rank down

          setHistoryLogs((prev) => [
            {
              id: Date.now().toString(),
              date: dateStr,
              score: scoreToEvaluate,
              status: 'RANK_DOWN',
              levelAfter: demotedLevel,
              note: `PÉNALITÉ : 2 échecs consécutifs. Rétrogradation au Niveau ${demotedLevel}.`,
            },
            ...prev.slice(0, 29),
          ]);

          setSystemAlert({
            type: 'RANK_DOWN',
            title: 'PENALTY QUEST : RÉTROGRADATION',
            subtitle: `NIVEAU ${level} ➔ NIVEAU ${demotedLevel}`,
            details: `Vous avez échoué 2 jours consécutifs (${scoreToEvaluate}/100). Le Système applique la sanction : perte d'un Niveau.`,
          });
        } else {
          // 1er ÉCHEC -> SÉRIE BRISÉE + AVERTISSEMENT
          setConsecutiveFailures(newFailures);

          setHistoryLogs((prev) => [
            {
              id: Date.now().toString(),
              date: dateStr,
              score: scoreToEvaluate,
              status: 'FAILED',
              levelAfter: level,
              note: `Échec (${scoreToEvaluate}/100). Série du niveau remise à 0. Attention : 1/2 avant rétrogradation.`,
            },
            ...prev.slice(0, 29),
          ]);

          setSystemAlert({
            type: 'STREAK_RESET',
            title: 'ALERTE SYSTÈME : SÉRIE BRISÉE',
            subtitle: `SCORE INSUFFISANT (${scoreToEvaluate} / 100 PTS)`,
            details: `Votre compteur de jours pour le Niveau ${
              level + 1
            } retombe à 0/${requiredDays}. DANGER : Un second échec demain entraînera une rétrogradation au Niveau ${Math.max(
              0,
              level - 1
            )} !`,
          });
        }
      }

      // Basculer les quêtes préparées pour demain en quêtes du jour si activé
      if (promoteTomorrow && tomorrowQuests.length > 0) {
        const nextDayQuests = tomorrowQuests.map((q, idx) => ({
          ...q,
          id: `day_${Date.now()}_${idx}`,
          completed: false,
        }));
        setTodayQuests(nextDayQuests);
      }
    },
    [
      currentStreak,
      level,
      maxDaysCap,
      consecutiveFailures,
      requiredDays,
      tomorrowQuests,
    ]
  );

  // Actions sur les quêtes du jour
  const toggleTodayQuest = (id) => {
    setTodayQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  const addTodayQuest = (e) => {
    e.preventDefault();
    if (!newTodayTitle.trim()) return;
    const pts = Math.max(5, Math.min(100, Number(newTodayPoints) || 10));
    setTodayQuests((prev) => [
      ...prev,
      {
        id: `tq_${Date.now()}`,
        title: newTodayTitle.trim(),
        category: newTodayCategory,
        points: pts,
        completed: false,
      },
    ]);
    setNewTodayTitle('');
  };

  const deleteTodayQuest = (id) => {
    setTodayQuests((prev) => prev.filter((q) => q.id !== id));
  };

  // Actions sur le Planificateur J-1 (Demain)
  const addTomorrowQuest = (e) => {
    e.preventDefault();
    if (!newTomorrowTitle.trim()) return;
    const pts = Math.max(5, Math.min(100, Number(newTomorrowPoints) || 10));
    setTomorrowQuests((prev) => [
      ...prev,
      {
        id: `tmq_${Date.now()}`,
        title: newTomorrowTitle.trim(),
        category: newTomorrowCategory,
        points: pts,
        completed: false,
      },
    ]);
    setNewTomorrowTitle('');
  };

  const deleteTomorrowQuest = (id) => {
    setTomorrowQuests((prev) => prev.filter((q) => q.id !== id));
  };

  const autoBalanceTomorrowTo100 = () => {
    if (tomorrowQuests.length === 0) return;
    const currentSum = tomorrowQuests.reduce(
      (acc, q) => acc + Number(q.points),
      0
    );
    const diff = 100 - currentSum;
    if (diff === 0) return;
    setTomorrowQuests((prev) => {
      const copy = [...prev];
      const lastIdx = copy.length - 1;
      const newPts = Math.max(5, copy[lastIdx].points + diff);
      copy[lastIdx] = { ...copy[lastIdx], points: newPts };
      return copy;
    });
  };

  const saveCurrentTomorrowAsTemplate = () => {
    if (!templateNameInput.trim() || tomorrowQuests.length === 0) return;
    const newTpl = {
      id: `tpl_${Date.now()}`,
      name: templateNameInput.trim(),
      quests: tomorrowQuests.map((q) => ({
        title: q.title,
        category: q.category,
        points: q.points,
      })),
    };
    setTemplates((prev) => [...prev, newTpl]);
    setTemplateNameInput('');
  };

  const loadTemplateToTomorrow = (tpl) => {
    setTomorrowQuests(
      tpl.quests.map((q, idx) => ({
        id: `tmq_${Date.now()}_${idx}`,
        title: q.title,
        category: q.category,
        points: q.points,
        completed: false,
      }))
    );
  };

  // ==========================================
  // 6. GÉNÉRATEUR DE FOND D'ÉCRAN (HTML5 CANVAS 1080x1920)
  // ==========================================
  const questsForWallpaper =
    wallpaperSource === 'today' ? todayQuests : tomorrowQuests;
  const scoreForWallpaper = useMemo(() => {
    const raw = questsForWallpaper.reduce(
      (acc, q) => (q.completed ? acc + Number(q.points || 0) : acc),
      0
    );
    return Math.min(100, raw);
  }, [questsForWallpaper]);

  const drawWallpaperCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1920;

    // 1. Fond sombre abyssal dégradé
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#05070B');
    bgGrad.addColorStop(0.45, '#0B101B');
    bgGrad.addColorStop(1, '#05070B');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Quadrillage holographique subtil
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < W; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // 3. Aura lumineuse du Rang au centre-haut
    const radial = ctx.createRadialGradient(W / 2, 560, 40, W / 2, 560, 520);
    radial.addColorStop(0, `${rankInfo.color}28`);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 150, W, 900);

    // 4. ZONE HAUTE (0 - 460px : 25% supérieurs laissés épurés pour l'horloge du téléphone)
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, 80);
    ctx.lineTo(140, 80);
    ctx.moveTo(80, 80);
    ctx.lineTo(80, 140);
    ctx.moveTo(W - 80, 80);
    ctx.lineTo(W - 140, 80);
    ctx.moveTo(W - 80, 80);
    ctx.lineTo(W - 80, 140);
    ctx.stroke();

    // 5. ENCADRÉ SYSTÈME : NIVEAU & RANG (Y: 470 -> 720)
    const boxX = 70;
    const boxY = 470;
    const boxW = W - 140;
    const boxH = 240;

    ctx.fillStyle = 'rgba(13, 19, 33, 0.92)';
    ctx.strokeStyle = rankInfo.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(boxX + 25, boxY);
    ctx.lineTo(boxX + boxW, boxY);
    ctx.lineTo(boxX + boxW, boxY + boxH - 25);
    ctx.lineTo(boxX + boxW - 25, boxY + boxH);
    ctx.lineTo(boxX, boxY + boxH);
    ctx.lineTo(boxX, boxY + 25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Titre SYSTEM NOTIFICATION
    ctx.fillStyle = '#00E5FF';
    ctx.font = 'bold 26px "Orbitron", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ SYSTEM STATUS • PLAYER HUD ⚡', W / 2, boxY + 48);

    // Niveau & Rang
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 54px "Orbitron", sans-serif';
    ctx.fillText(`NIVEAU ${level} — ${rankInfo.rank}`, W / 2, boxY + 118);

    // Sous-titre de Rang + Progression Jours
    ctx.fillStyle = rankInfo.color;
    ctx.font = 'bold 30px "Rajdhani", sans-serif';
    ctx.fillText(
      `${rankInfo.title.toUpperCase()}  |  SÉRIE : ${currentStreak} / ${requiredDays} JOURS PARFAITS`,
      W / 2,
      boxY + 168
    );

    // Petits blocs de progression du niveau
    const maxBlocks = Math.min(20, requiredDays);
    const barTotalW = boxW - 140;
    const gap = 8;
    const blockW = (barTotalW - gap * (maxBlocks - 1)) / maxBlocks;
    const startBlockX = boxX + 70;
    const blockY = boxY + 192;

    for (let i = 0; i < maxBlocks; i++) {
      const isFilled = i < currentStreak;
      ctx.fillStyle = isFilled ? '#00E5FF' : 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(startBlockX + i * (blockW + gap), blockY, blockW, 20);
    }

    // Alerte danger si 1 échec consécutif
    if (consecutiveFailures > 0) {
      ctx.fillStyle = '#FF1E42';
      ctx.font = 'bold 26px "Rajdhani", sans-serif';
      ctx.fillText(
        '⚠️ DANGER DE RÉTROGRADATION : ÉCHEC INTERDIT AUJOURD’HUI (1/2)',
        W / 2,
        boxY + boxH + 42
      );
    }

    // 6. SECTION CENTRALE : QUÊTES DU JOUR (Y: 790 -> 1500)
    const questHeaderY = 805;
    ctx.fillStyle = '#00E5FF';
    ctx.font = 'bold 38px "Orbitron", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚔️ QUÊTES DU JOUR', 80, questHeaderY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 30px "Rajdhani", sans-serif';
    ctx.fillText('OBJECTIF : 100 PTS', W - 80, questHeaderY);

    // Ligne séparatrice néon
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, questHeaderY + 22);
    ctx.lineTo(W - 80, questHeaderY + 22);
    ctx.stroke();

    // Liste des quêtes (jusqu'à 7 quêtes affichées proprement)
    const displayedQuests = questsForWallpaper.slice(0, 7);
    const startQuestY = questHeaderY + 60;
    const rowHeight = 96;

    displayedQuests.forEach((q, idx) => {
      const y = startQuestY + idx * rowHeight;

      // Fond de la ligne de quête
      ctx.fillStyle = q.completed
        ? 'rgba(0, 229, 255, 0.12)'
        : 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = q.completed ? '#00E5FF' : 'rgba(148, 163, 184, 0.28)';
      ctx.lineWidth = 2;
      ctx.fillRect(80, y, W - 160, 78);
      ctx.strokeRect(80, y, W - 160, 78);

      // Case à cocher [ ] ou [✓]
      const checkX = 104;
      const checkY = y + 19;
      ctx.strokeStyle = q.completed ? '#00E5FF' : '#64748B';
      ctx.lineWidth = 3;
      ctx.strokeRect(checkX, checkY, 40, 40);

      if (q.completed) {
        ctx.fillStyle = '#00E5FF';
        ctx.font = 'bold 34px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✓', checkX + 20, checkY + 32);
      }

      // Titre de la quête
      ctx.textAlign = 'left';
      ctx.fillStyle = q.completed ? '#E2E8F0' : '#FFFFFF';
      ctx.font = 'bold 32px "Rajdhani", sans-serif';
      const maxTitle =
        q.title.length > 36 ? q.title.slice(0, 35) + '…' : q.title;
      ctx.fillText(maxTitle, 168, y + 50);

      // Badge de points à gagner à droite (+XX PTS)
      const badgeW = 165;
      const badgeX = W - 80 - badgeW - 16;
      const badgeY = y + 14;
      ctx.fillStyle = q.completed
        ? 'rgba(255, 215, 0, 0.2)'
        : 'rgba(0, 229, 255, 0.15)';
      ctx.strokeStyle = q.completed ? '#FFD700' : '#00E5FF';
      ctx.lineWidth = 2;
      ctx.fillRect(badgeX, badgeY, badgeW, 50);
      ctx.strokeRect(badgeX, badgeY, badgeW, 50);

      ctx.textAlign = 'center';
      ctx.fillStyle = q.completed ? '#FFD700' : '#00E5FF';
      ctx.font = '900 28px "Orbitron", sans-serif';
      ctx.fillText(`+${q.points} PTS`, badgeX + badgeW / 2, badgeY + 35);
    });

    // 7. ZONE BASSE : BARRE DE SCORE DU JOUR & CITATION (Y: 1540 -> 1840)
    const footerY = 1550;
    ctx.fillStyle = 'rgba(13, 19, 33, 0.95)';
    ctx.strokeStyle = scoreForWallpaper >= 100 ? '#FFD700' : '#00E5FF';
    ctx.lineWidth = 3;
    ctx.fillRect(80, footerY, W - 160, 155);
    ctx.strokeRect(80, footerY, W - 160, 155);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 28px "Orbitron", sans-serif';
    ctx.fillText('SCORE QUOTIDIEN ACTUEL', 115, footerY + 52);

    ctx.textAlign = 'right';
    ctx.fillStyle = scoreForWallpaper >= 100 ? '#FFD700' : '#00E5FF';
    ctx.font = '900 44px "Orbitron", sans-serif';
    ctx.fillText(`${scoreForWallpaper} / 100 PTS`, W - 115, footerY + 56);

    // Barre de jauge
    const gaugeX = 115;
    const gaugeY = footerY + 85;
    const gaugeW = W - 230;
    const gaugeH = 38;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(gaugeX, gaugeY, gaugeW, gaugeH);

    const fillW = Math.min(1, scoreForWallpaper / 100) * gaugeW;
    if (fillW > 0) {
      const barGrad = ctx.createLinearGradient(gaugeX, 0, gaugeX + gaugeW, 0);
      barGrad.addColorStop(0, '#00E5FF');
      barGrad.addColorStop(1, scoreForWallpaper >= 100 ? '#FFD700' : '#8A2BE2');
      ctx.fillStyle = barGrad;
      ctx.fillRect(gaugeX, gaugeY, fillW, gaugeH);
    }

    // Citation de discipline en bas
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 26px "Rajdhani", sans-serif';
    ctx.fillText(`« ${wallpaperQuote.toUpperCase()} »`, W / 2, 1775);
  }, [
    level,
    rankInfo,
    currentStreak,
    requiredDays,
    consecutiveFailures,
    questsForWallpaper,
    scoreForWallpaper,
    wallpaperQuote,
  ]);

  useEffect(() => {
    drawWallpaperCanvas();
  }, [drawWallpaperCanvas, activeTab]);

  const downloadWallpaper = () => {
    drawWallpaperCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `SYSTEM-LEVEL-${level}-${rankInfo.shortRank}-WALLPAPER.png`;
    link.href = dataUrl;
    link.click();
  };

  // ==========================================
  // 7. SANCTUAIRE DE MOTIVATION
  // ==========================================
  const addMotivationVideo = (e) => {
    e.preventDefault();
    if (!newVideoTitle.trim() || !newVideoUrl.trim()) return;
    setVideos((prev) => [
      {
        id: `vid_${Date.now()}`,
        title: newVideoTitle.trim(),
        url: newVideoUrl.trim(),
        tag: newVideoTag,
        note:
          newVideoNote.trim() ||
          'Booster de discipline enregistré dans le Système.',
      },
      ...prev,
    ]);
    setNewVideoTitle('');
    setNewVideoUrl('');
    setNewVideoNote('');
  };

  const deleteVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const filteredVideos = useMemo(() => {
    if (selectedVideoTag === 'Tous') return videos;
    return videos.filter((v) => v.tag === selectedVideoTag);
  }, [videos, selectedVideoTag]);

  // ==========================================
  // 8. SYNCHRONISATION PC <-> MOBILE
  // ==========================================
  const generateSyncCode = () => {
    const payload = {
      level,
      currentStreak,
      consecutiveFailures,
      maxDaysCap,
      totalPerfectDays,
      todayQuests,
      tomorrowQuests,
      templates,
      videos,
      historyLogs,
      wallpaperQuote,
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    setSyncString(encoded);
    navigator.clipboard?.writeText(encoded);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const importFromSyncCode = () => {
    if (!syncString.trim()) return;
    try {
      const decoded = JSON.parse(
        decodeURIComponent(escape(atob(syncString.trim())))
      );
      if (typeof decoded.level === 'number') {
        setLevel(decoded.level);
        setCurrentStreak(decoded.currentStreak || 0);
        setConsecutiveFailures(decoded.consecutiveFailures || 0);
        setMaxDaysCap(decoded.maxDaysCap || 20);
        setTotalPerfectDays(decoded.totalPerfectDays || 0);
        if (Array.isArray(decoded.todayQuests))
          setTodayQuests(decoded.todayQuests);
        if (Array.isArray(decoded.tomorrowQuests))
          setTomorrowQuests(decoded.tomorrowQuests);
        if (Array.isArray(decoded.templates)) setTemplates(decoded.templates);
        if (Array.isArray(decoded.videos)) setVideos(decoded.videos);
        if (Array.isArray(decoded.historyLogs))
          setHistoryLogs(decoded.historyLogs);
        setImportFeedback({
          type: 'success',
          message:
            'Synchronisation Système réussie ! Toutes vos données sont à jour.',
        });
      } else {
        throw new Error('Format invalide');
      }
    } catch {
      setImportFeedback({
        type: 'error',
        message: 'Code de synchronisation invalide ou corrompu.',
      });
    }
  };

  const exportJsonFile = () => {
    const payload = {
      level,
      currentStreak,
      consecutiveFailures,
      maxDaysCap,
      totalPerfectDays,
      todayQuests,
      tomorrowQuests,
      templates,
      videos,
      historyLogs,
      wallpaperQuote,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-levelup-backup-lvl${level}.json`;
    a.click();
  };

  // ==========================================
  // RENDU UI PRINCIPAL
  // ==========================================
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Import Google Fonts & Styles Holographiques */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Orbitron:wght@600;700;800;900&family=Rajdhani:wght@500;600;700&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-rajdhani { font-family: 'Rajdhani', sans-serif; }
        .font-chakra { font-family: 'Chakra Petch', sans-serif; }
        .hud-panel {
          background: linear-gradient(145deg, rgba(15, 20, 32, 0.92) 0%, rgba(7, 9, 14, 0.96) 100%);
          box-shadow: 0 0 25px rgba(0, 229, 255, 0.06), inset 0 0 15px rgba(0, 229, 255, 0.04);
        }
        .hud-grid-bg {
          background-image: 
            linear-gradient(to right, rgba(0, 229, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.04) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        iframe[title*="Netlify"], [data-netlify-deploy-id], #netlify-identity-widget {
          display: none !important;
          pointer-events: none !important;
        }
      `}</style>

      {/* ==========================================
          MODALE D'ALERTE SYSTÈME (LEVEL UP / PENALTY)
          ========================================== */}
      {systemAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div
            className={`max-w-md w-full p-6 rounded-xl border-2 relative overflow-hidden shadow-2xl ${
              systemAlert.type === 'LEVEL_UP'
                ? 'bg-slate-950 border-[#00E5FF] shadow-[0_0_50px_rgba(0,229,255,0.45)]'
                : systemAlert.type === 'RANK_DOWN'
                ? 'bg-red-950/90 border-[#FF1E42] shadow-[0_0_50px_rgba(255,30,66,0.6)]'
                : systemAlert.type === 'STREAK_RESET'
                ? 'bg-slate-950 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.4)]'
                : 'bg-slate-950 border-cyan-400 shadow-[0_0_35px_rgba(0,229,255,0.3)]'
            }`}
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-current mx-auto">
                {systemAlert.type === 'LEVEL_UP' && (
                  <Crown className="w-9 h-9 text-[#FFD700] animate-bounce" />
                )}
                {systemAlert.type === 'RANK_DOWN' && (
                  <Skull className="w-9 h-9 text-[#FF1E42] animate-pulse" />
                )}
                {systemAlert.type === 'STREAK_RESET' && (
                  <AlertTriangle className="w-9 h-9 text-amber-400" />
                )}
                {systemAlert.type === 'INFO' && (
                  <Sparkles className="w-9 h-9 text-[#00E5FF]" />
                )}
              </div>

              <div className="text-xs font-orbitron tracking-widest uppercase text-cyan-400">
                [ NOTIFICATION DU SYSTÈME ]
              </div>

              <h3 className="text-2xl font-orbitron font-black tracking-wide text-white">
                {systemAlert.title}
              </h3>

              <div
                className={`text-lg font-rajdhani font-bold py-1.5 px-3 rounded border inline-block ${
                  systemAlert.type === 'RANK_DOWN'
                    ? 'bg-red-900/50 border-red-500 text-red-200'
                    : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200'
                }`}
              >
                {systemAlert.subtitle}
              </div>

              <p className="text-sm text-slate-300 font-rajdhani leading-relaxed">
                {systemAlert.details}
              </p>

              <button
                onClick={() => setSystemAlert(null)}
                className="w-full mt-4 py-3 font-orbitron font-bold text-sm uppercase tracking-wider rounded bg-[#00E5FF] text-slate-950 hover:bg-cyan-300 transition shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                Accepter & Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODALE FOCUS VIDÉO IMMERSIF
          ========================================== */}
      {focusedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <div className="max-w-4xl w-full space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <div>
                <span className="text-xs font-orbitron text-[#00E5FF] uppercase tracking-widest">
                  ⚡ MODE FOCUS IMMERSIF • {focusedVideo.tag}
                </span>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {focusedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setFocusedVideo(null)}
                className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="aspect-video w-full bg-slate-950 rounded-lg overflow-hidden border-2 border-[#00E5FF]/50 shadow-[0_0_40px_rgba(0,229,255,0.2)]">
              {getEmbedUrl(focusedVideo.url) ? (
                <iframe
                  src={getEmbedUrl(focusedVideo.url)}
                  className="w-full h-full rounded-xl border border-cyan-500/30"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={focusedVideo.title || 'Lecteur Motivation'}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Film className="w-12 h-12 text-cyan-400 mb-3" />
                  <p className="text-slate-300 mb-4">
                    Lien vidéo externe prêt :
                  </p>
                  <a
                    href={focusedVideo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-[#00E5FF] text-black font-orbitron font-bold rounded"
                  >
                    Ouvrir la vidéo ↗
                  </a>
                </div>
              )}
            </div>

            <div className="p-4 rounded bg-slate-900/90 border-l-4 border-[#FFD700] text-slate-200 font-rajdhani text-lg">
              « {focusedVideo.note} »
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SIDEBAR NAVIGATION (PC)
          ========================================== */}
      <aside className="hidden md:flex md:w-72 md:flex-col bg-[#0A0E17] border-r border-cyan-500/20 p-5 justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo Système */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center border-2 shadow-lg"
              style={{
                borderColor: rankInfo.color,
                boxShadow: `0 0 15px ${rankInfo.borderGlow}`,
              }}
            >
              <span
                className="font-orbitron font-black text-lg"
                style={{ color: rankInfo.color }}
              >
                {rankInfo.shortRank}
              </span>
            </div>
            <div>
              <div className="text-[10px] font-orbitron tracking-widest text-[#00E5FF]">
                PLAYER SYSTEM v2.5
              </div>
              <h1 className="text-lg font-orbitron font-black tracking-wider text-white">
                LEVEL UP
              </h1>
            </div>
          </div>

          {/* Mini Carte Statut Joueur */}
          <div
            className={`p-3.5 rounded-lg border bg-gradient-to-br ${rankInfo.bgGrad}`}
            style={{ borderColor: rankInfo.color }}
          >
            <div className="flex items-center justify-between text-xs font-rajdhani text-slate-300">
              <span>RANG ACTUEL</span>
              <span
                className="font-orbitron font-bold"
                style={{ color: rankInfo.color }}
              >
                {rankInfo.rank}
              </span>
            </div>
            <div className="text-2xl font-orbitron font-black text-white mt-0.5">
              NIVEAU {level}
            </div>
            <div className="text-xs font-rajdhani text-slate-300 mb-2">
              {rankInfo.title}
            </div>

            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-[#00E5FF] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (currentStreak / requiredDays) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-rajdhani text-slate-300 mt-1">
              <span>
                Série : {currentStreak}/{requiredDays} j
              </span>
              <span>Score : {todayScore}/100</span>
            </div>
          </div>

          {/* Menu Liens */}
          <nav className="space-y-1.5">
            {[
              {
                id: 'dashboard',
                label: 'QG du Joueur',
                icon: Sword,
                badge: `${todayScore}/100`,
              },
              {
                id: 'planner',
                label: 'Planificateur J-1',
                icon: Calendar,
                badge: `${tomorrowTotalPoints} pts`,
              },
              {
                id: 'wallpaper',
                label: 'Fond d’Écran HD',
                icon: Smartphone,
                badge: '9:16',
              },
              {
                id: 'sanctuary',
                label: 'Sanctuaire Vidéo',
                icon: Flame,
                badge: videos.length,
              },
              {
                id: 'sync',
                label: 'Sync PC/Tel & Rang',
                icon: RefreshCw,
                badge: null,
              },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-rajdhani font-bold text-base transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-[#00E5FF] border border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`text-xs font-orbitron px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#00E5FF] text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bouton Simulateur / Test Mode en bas de sidebar */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className="w-full py-2.5 px-3 rounded-lg border border-purple-500/50 bg-purple-950/30 hover:bg-purple-900/40 text-purple-300 font-orbitron text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <Terminal className="w-4 h-4" />
            {showSimulator ? 'Masquer Simulateur' : 'Mode Test Système'}
          </button>
          <div className="text-[11px] text-center text-slate-500 font-rajdhani">
            Courbe active : Plafond {maxDaysCap}j/niv (~5 ans)
          </div>
        </div>
      </aside>

      {/* ==========================================
          ZONE PRINCIPALE DE CONTENU
          ========================================== */}
      <main className="flex-1 hud-grid-bg pb-28 md:pb-10 overflow-y-auto">
        {/* Barre supérieure Mobile + Simulateur Rapide */}
        <header className="sticky top-0 z-30 bg-[#07090E]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded font-orbitron font-black text-xs border"
              style={{
                borderColor: rankInfo.color,
                color: rankInfo.color,
                backgroundColor: '#0F1420',
              }}
            >
              {rankInfo.rank}
            </span>
            <div>
              <span className="font-orbitron font-bold text-sm text-white">
                NIVEAU {level}
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 font-rajdhani ml-2">
                • {rankInfo.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {consecutiveFailures > 0 && (
              <span className="px-2.5 py-1 rounded bg-red-950/90 border border-red-500 text-red-300 font-orbitron text-[11px] font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" /> DANGER (1/2 ÉCHEC)
              </span>
            )}
            <button
              onClick={() => setShowSimulator(!showSimulator)}
              className="md:hidden px-2.5 py-1 rounded border border-purple-500/50 bg-purple-950/40 text-purple-300 font-orbitron text-[11px]"
            >
              Simulateur
            </button>
            <div className="px-3 py-1 rounded bg-slate-900 border border-cyan-500/40 font-orbitron text-xs text-[#00E5FF] font-bold">
              {todayScore} / 100 PTS
            </div>
          </div>
        </header>

        {/* PANNEAU SIMULATEUR SYSTÈME (MODE TEST) */}
        {showSimulator && (
          <div className="mx-4 mt-4 p-4 rounded-xl bg-purple-950/30 border-2 border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.2)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-300 font-orbitron text-xs font-bold uppercase">
                <Terminal className="w-4 h-4" /> Panneau de Simulation & Test
                des Rangs (Debug Système)
              </div>
              <button
                onClick={() => setShowSimulator(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => evaluateDayOutcome(100, false)}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-orbitron text-xs font-bold flex items-center gap-1.5"
              >
                <FastForward className="w-3.5 h-3.5" /> Simuler +1 Jour Parfait
                (100/100)
              </button>
              <button
                onClick={() => evaluateDayOutcome(65, false)}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-orbitron text-xs font-bold flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Simuler +1 Jour Échec
                (65/100)
              </button>
              <button
                onClick={() => {
                  setTodayQuests((prev) =>
                    prev.map((q) => ({ ...q, completed: true }))
                  );
                }}
                className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-orbitron text-xs font-bold"
              >
                Tout Cocher (100 pts)
              </button>
            </div>

            <div className="pt-2 border-t border-purple-500/30 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-rajdhani text-purple-200 mr-2">
                Tester directement un Niveau / Rang :
              </span>
              {[
                { lvl: 1, label: 'Niv.1 (E)' },
                { lvl: 19, label: 'Niv.19 (E)' },
                { lvl: 20, label: 'Niv.20 (D)' },
                { lvl: 40, label: 'Niv.40 (C)' },
                { lvl: 60, label: 'Niv.60 (B)' },
                { lvl: 80, label: 'Niv.80 (A)' },
                { lvl: 100, label: 'Niv.100 (S)' },
                { lvl: 125, label: 'Niv.125 (S+)' },
                { lvl: 150, label: 'Niv.150 (Monarque)' },
              ].map((preset) => (
                <button
                  key={preset.lvl}
                  onClick={() => {
                    setLevel(preset.lvl);
                    setCurrentStreak(0);
                    setConsecutiveFailures(0);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-orbitron border transition ${
                    level === preset.lvl
                      ? 'bg-purple-400 text-slate-950 border-white font-bold'
                      : 'bg-slate-900/90 text-purple-200 border-purple-500/40 hover:border-purple-400'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
          {/* ==========================================
              ÉCRAN 1 : QG DU JOUEUR (DASHBOARD)
              ========================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* EN-TÊTE HUD DU SYSTÈME */}
              <div
                className={`p-5 md:p-6 rounded-xl border-2 bg-gradient-to-r ${rankInfo.bgGrad} relative overflow-hidden`}
                style={{
                  borderColor: rankInfo.color,
                  boxShadow: `0 0 35px ${rankInfo.borderGlow}`,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  {/* Colonne 1 : Niveau & Badge de Rang */}
                  <div className="space-y-2">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded border text-xs font-orbitron font-bold uppercase tracking-wider bg-black/50"
                      style={{
                        borderColor: rankInfo.color,
                        color: rankInfo.color,
                      }}
                    >
                      <Award className="w-4 h-4" /> {rankInfo.rank} •{' '}
                      {rankInfo.title}
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-orbitron font-black text-white tracking-tight">
                        NIVEAU {level}
                      </span>
                    </div>
                    <p className="text-sm font-rajdhani text-slate-300">
                      Prochain Rang ({progressionStats.nextRankName}) dans{' '}
                      <strong className="text-[#00E5FF]">
                        {progressionStats.daysToNextRank} jours
                      </strong>{' '}
                      parfaits.
                    </p>
                  </div>

                  {/* Colonne 2 : Progression du Niveau (Jours à 100/100) */}
                  <div className="space-y-2 bg-black/40 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center text-xs font-orbitron">
                      <span className="text-cyan-400">
                        PROGRESSION NIVEAU {level + 1}
                      </span>
                      <span className="text-white font-bold">
                        {currentStreak} / {requiredDays} JOURS (100/100)
                      </span>
                    </div>

                    {/* Segments de jours */}
                    <div
                      className="grid gap-1"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(
                          20,
                          requiredDays
                        )}, minmax(0, 1fr))`,
                      }}
                    >
                      {Array.from({ length: Math.min(20, requiredDays) }).map(
                        (_, idx) => {
                          const active = idx < currentStreak;
                          return (
                            <div
                              key={idx}
                              className={`h-3.5 rounded-sm transition-all ${
                                active
                                  ? 'bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]'
                                  : 'bg-slate-800/90 border border-slate-700'
                              }`}
                            />
                          );
                        }
                      )}
                    </div>

                    <div className="flex justify-between items-center text-xs font-rajdhani text-slate-400 pt-1">
                      <span>
                        Échecs consécutifs :{' '}
                        <strong
                          className={
                            consecutiveFailures > 0
                              ? 'text-red-400'
                              : 'text-emerald-400'
                          }
                        >
                          {consecutiveFailures} / 2
                        </strong>
                      </span>
                      <span>
                        Rang S dans :{' '}
                        <strong className="text-amber-300">
                          {progressionStats.daysToRankS} j
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Colonne 3 : Jauge Circulaire du Score du Jour */}
                  <div className="flex items-center justify-between lg:justify-end gap-5 bg-black/40 p-4 rounded-lg border border-slate-800">
                    <div>
                      <div className="text-xs font-orbitron text-slate-400 uppercase">
                        SCORE DU JOUR
                      </div>
                      <div
                        className={`text-3xl font-orbitron font-black ${
                          todayScore >= 100
                            ? 'text-[#FFD700]'
                            : 'text-[#00E5FF]'
                        }`}
                      >
                        {todayScore}{' '}
                        <span className="text-base text-slate-400">/ 100</span>
                      </div>
                      <div className="text-xs font-rajdhani text-slate-300 mt-1">
                        {todayScore >= 100
                          ? '✨ Quête journalière 100% complète !'
                          : `Encore ${100 - todayScore} pts requis aujourd'hui`}
                      </div>
                    </div>

                    {/* Jauge SVG Néon */}
                    <div className="relative w-20 h-20 shrink-0">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 80 80"
                      >
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke="#1E293B"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke={todayScore >= 100 ? '#FFD700' : '#00E5FF'}
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 34}
                          strokeDashoffset={
                            2 *
                            Math.PI *
                            34 *
                            (1 - Math.min(100, todayScore) / 100)
                          }
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-orbitron font-bold text-sm text-white">
                        {todayScore}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LISTE DES QUÊTES DU JOUR + CLÔTURE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 hud-panel rounded-xl border border-cyan-500/30 p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sword className="w-5 h-5 text-[#00E5FF]" />
                      <h2 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider">
                        Quêtes Actives du Jour
                      </h2>
                    </div>
                    <span
                      className={`text-xs font-orbitron px-2.5 py-1 rounded border ${
                        todayTotalPlanned === 100
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                          : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                      }`}
                    >
                      Total programmé : {todayTotalPlanned} / 100 PTS
                    </span>
                  </div>

                  {/* Quêtes */}
                  <div className="space-y-2.5">
                    {todayQuests.map((quest) => {
                      const catObj =
                        CATEGORIES.find((c) => c.id === quest.category) ||
                        CATEGORIES[0];
                      return (
                        <div
                          key={quest.id}
                          onClick={() => toggleTodayQuest(quest.id)}
                          className={`group cursor-pointer p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                            quest.completed
                              ? 'bg-cyan-950/30 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                              : 'bg-slate-900/75 border-slate-800 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <button
                              type="button"
                              className={`w-6 h-6 rounded flex items-center justify-center border-2 transition ${
                                quest.completed
                                  ? 'bg-[#00E5FF] border-[#00E5FF] text-slate-950'
                                  : 'border-slate-500 text-transparent group-hover:border-cyan-400'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                            </button>
                            <div className="min-w-0">
                              <div
                                className={`font-rajdhani font-bold text-base md:text-lg truncate ${
                                  quest.completed
                                    ? 'line-through text-slate-400'
                                    : 'text-white'
                                }`}
                              >
                                {quest.title}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-rajdhani">
                                <span
                                  className="px-2 py-0.5 rounded bg-slate-950 border"
                                  style={{
                                    borderColor: `${catObj.color}66`,
                                    color: catObj.color,
                                  }}
                                >
                                  {quest.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`px-3 py-1 rounded font-orbitron font-bold text-xs border ${
                                quest.completed
                                  ? 'bg-amber-500/20 border-[#FFD700] text-[#FFD700]'
                                  : 'bg-cyan-500/10 border-cyan-500/40 text-[#00E5FF]'
                              }`}
                            >
                              +{quest.points} PTS
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTodayQuest(quest.id);
                              }}
                              className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                              title="Supprimer cette quête"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Formulaire d'ajout rapide pour aujourd'hui */}
                  <form
                    onSubmit={addTodayQuest}
                    className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ajouter une quête imprévue aujourd'hui..."
                      value={newTodayTitle}
                      onChange={(e) => setNewTodayTitle(e.target.value)}
                      className="flex-1 min-w-[180px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-rajdhani text-white focus:outline-none focus:border-[#00E5FF]"
                    />
                    <select
                      value={newTodayCategory}
                      onChange={(e) => setNewTodayCategory(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-sm font-rajdhani text-slate-200"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      step="5"
                      value={newTodayPoints}
                      onChange={(e) => setNewTodayPoints(e.target.value)}
                      className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-sm font-orbitron text-[#00E5FF]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-orbitron text-xs font-bold flex items-center gap-1 border border-cyan-500/30"
                    >
                      <Plus className="w-4 h-4" /> Ajouter
                    </button>
                  </form>
                </div>

                {/* Panneau de Clôture & Rappel des Règles */}
                <div className="hud-panel rounded-xl border border-cyan-500/30 p-5 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#FFD700] font-orbitron text-sm font-bold uppercase">
                      <Zap className="w-4 h-4" /> Validation du Jour
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800 space-y-2 text-xs font-rajdhani text-slate-300">
                      <div className="flex justify-between">
                        <span>Score actuel :</span>
                        <strong className="text-white font-orbitron">
                          {todayScore} / 100 PTS
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Statut si clôturé :</span>
                        {todayScore >= 100 ? (
                          <strong className="text-emerald-400">
                            {currentStreak + 1 >= requiredDays
                              ? `LEVEL UP (Niv. ${level + 1}) !`
                              : `Jour validé (${
                                  currentStreak + 1
                                }/${requiredDays})`}
                          </strong>
                        ) : (
                          <strong className="text-rose-400">
                            {consecutiveFailures + 1 >= 2
                              ? `RÉTROGRADATION (Niv. ${Math.max(
                                  0,
                                  level - 1
                                )})`
                              : 'Série remise à 0 (Alerte 1/2)'}
                          </strong>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Quêtes de demain prêtes :</span>
                        <strong
                          className={
                            tomorrowTotalPoints === 100
                              ? 'text-cyan-400'
                              : 'text-amber-400'
                          }
                        >
                          {tomorrowQuests.length} quêtes ({tomorrowTotalPoints}{' '}
                          pts)
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => evaluateDayOutcome(todayScore, true)}
                        className={`w-full py-3.5 px-4 rounded-lg font-orbitron font-black text-sm uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 ${
                          todayScore >= 100
                            ? 'bg-gradient-to-r from-[#00E5FF] to-[#FFD700] text-slate-950 hover:opacity-95 shadow-[0_0_25px_rgba(0,229,255,0.4)]'
                            : 'bg-rose-950/80 border-2 border-rose-500 text-rose-200 hover:bg-rose-900'
                        }`}
                      >
                        <CheckSquare className="w-5 h-5" />
                        Clôturer la Journée ({todayScore}/100)
                      </button>

                      <button
                        onClick={() => setActiveTab('wallpaper')}
                        className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-orbitron text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <Smartphone className="w-4 h-4" /> Générer Fond d’Écran
                        Mobile
                      </button>
                    </div>
                  </div>

                  {/* Loi du Système */}
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-xs font-rajdhani text-slate-300 space-y-1">
                    <div className="font-orbitron font-bold text-rose-400 text-[11px] uppercase flex items-center gap-1">
                      <Skull className="w-3.5 h-3.5" /> Loi Hardcore (Option B)
                    </div>
                    <p>
                      Moins de 100/100 réinitialise les jours validés du niveau
                      en cours. Deux échecs consécutifs entraînent la perte
                      immédiate d’un Niveau.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              ÉCRAN 2 : PLANIFICATEUR J-1 ("PRÉPARER DEMAIN")
              ========================================== */}
          {activeTab === 'planner' && (
            <div className="space-y-6">
              <div className="hud-panel rounded-xl border border-cyan-500/30 p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-orbitron text-[#00E5FF] uppercase tracking-widest">
                      PROTOCOLE D’ANTICIPATION J-1
                    </span>
                    <h2 className="text-2xl font-orbitron font-black text-white">
                      PRÉPARER LES QUÊTES DE DEMAIN
                    </h2>
                    <p className="text-sm font-rajdhani text-slate-400">
                      Définissez vos actions du lendemain. Le total doit
                      atteindre exactement 100 points.
                    </p>
                  </div>

                  {/* Validateur 100 PTS */}
                  <div
                    className={`px-4 py-3 rounded-xl border-2 flex items-center gap-3 ${
                      tomorrowTotalPoints === 100
                        ? 'bg-emerald-950/50 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-amber-950/50 border-amber-500 text-amber-300'
                    }`}
                  >
                    {tomorrowTotalPoints === 100 ? (
                      <Unlock className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Lock className="w-6 h-6 text-amber-400" />
                    )}
                    <div>
                      <div className="text-[10px] font-orbitron uppercase">
                        TOTAL PROGRAMMÉ
                      </div>
                      <div className="text-xl font-orbitron font-black">
                        {tomorrowTotalPoints} / 100 PTS
                      </div>
                    </div>
                    {tomorrowTotalPoints !== 100 &&
                      tomorrowQuests.length > 0 && (
                        <button
                          onClick={autoBalanceTomorrowTo100}
                          className="ml-2 px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-orbitron text-[11px] font-bold hover:bg-amber-300"
                        >
                          Équilibrer à 100
                        </button>
                      )}
                  </div>
                </div>

                {/* Formulaire Nouvelle Quête pour Demain */}
                <form
                  onSubmit={addTomorrowQuest}
                  className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-3"
                >
                  <input
                    type="text"
                    placeholder="Intitulé de la quête pour demain (ex: 2h Code / Musculation)..."
                    value={newTomorrowTitle}
                    onChange={(e) => setNewTomorrowTitle(e.target.value)}
                    className="sm:col-span-6 bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm font-rajdhani text-white focus:border-[#00E5FF] focus:outline-none"
                  />
                  <select
                    value={newTomorrowCategory}
                    onChange={(e) => setNewTomorrowCategory(e.target.value)}
                    className="sm:col-span-3 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm font-rajdhani text-slate-200"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        Catégorie : {c.label}
                      </option>
                    ))}
                  </select>
                  <div className="sm:col-span-3 flex gap-2">
                    <input
                      type="number"
                      min="5"
                      max="100"
                      step="5"
                      value={newTomorrowPoints}
                      onChange={(e) => setNewTomorrowPoints(e.target.value)}
                      className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm font-orbitron text-[#00E5FF] text-center"
                    />
                    <button
                      type="submit"
                      className="flex-1 bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs rounded-lg px-3 py-2.5 flex items-center justify-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Ajouter
                    </button>
                  </div>
                </form>

                {/* Liste des quêtes prévues pour demain */}
                <div className="mt-5 space-y-2.5">
                  {tomorrowQuests.map((q) => {
                    const catObj =
                      CATEGORIES.find((c) => c.id === q.category) ||
                      CATEGORIES[0];
                    return (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2.5 h-8 rounded-full"
                            style={{ backgroundColor: catObj.color }}
                          />
                          <div>
                            <div className="font-rajdhani font-bold text-base text-white">
                              {q.title}
                            </div>
                            <span className="text-xs font-rajdhani text-slate-400">
                              {q.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded bg-cyan-950 border border-cyan-500/40 font-orbitron text-xs font-bold text-[#00E5FF]">
                            +{q.points} PTS
                          </span>
                          <button
                            onClick={() => deleteTomorrowQuest(q.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions rapides */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Nom du modèle (ex: Journée Examen)..."
                      value={templateNameInput}
                      onChange={(e) => setTemplateNameInput(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-rajdhani text-white"
                    />
                    <button
                      onClick={saveCurrentTomorrowAsTemplate}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-orbitron text-xs font-bold flex items-center gap-1.5 border border-cyan-500/30"
                    >
                      <Save className="w-3.5 h-3.5" /> Sauvegarder Modèle
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setTodayQuests(
                        tomorrowQuests.map((q, idx) => ({
                          ...q,
                          id: `now_${Date.now()}_${idx}`,
                          completed: false,
                        }))
                      );
                      setActiveTab('dashboard');
                    }}
                    className="px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-orbitron text-xs font-bold flex items-center gap-2"
                  >
                    Appliquer immédiatement à Aujourd’hui{' '}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bibliothèque de Modèles */}
              <div className="hud-panel rounded-xl border border-slate-800 p-5 space-y-3">
                <h3 className="text-sm font-orbitron font-bold text-slate-300 uppercase flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#00E5FF]" /> Modèles de
                  Journées Types (100 PTS)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 transition flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="font-orbitron font-bold text-sm text-white mb-2">
                          {tpl.name}
                        </div>
                        <ul className="space-y-1 text-xs font-rajdhani text-slate-400">
                          {tpl.quests.map((tq, i) => (
                            <li key={i} className="flex justify-between">
                              <span className="truncate pr-2">
                                • {tq.title}
                              </span>
                              <span className="text-cyan-400 font-bold">
                                +{tq.points}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => loadTemplateToTomorrow(tpl)}
                        className="w-full py-2 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-[#00E5FF] font-orbitron text-xs font-bold"
                      >
                        Charger ce modèle
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              ÉCRAN 3 : GÉNÉRATEUR DE FOND D'ÉCRAN MOBILE
              ========================================== */}
          {activeTab === 'wallpaper' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Contrôles à gauche */}
              <div className="lg:col-span-6 hud-panel rounded-xl border border-cyan-500/30 p-5 md:p-6 space-y-5">
                <div>
                  <span className="text-xs font-orbitron text-[#00E5FF] uppercase tracking-widest">
                    WALLPAPER ENGINE • 1080x1920 HD
                  </span>
                  <h2 className="text-2xl font-orbitron font-black text-white mt-1">
                    FOND D’ÉCRAN DE VERROUILLAGE
                  </h2>
                  <p className="text-sm font-rajdhani text-slate-300 mt-1">
                    Génère une image haute définition calibrée pour votre
                    téléphone : le quart supérieur est laissé libre pour l’heure
                    système, avec votre Niveau, votre Rang et vos quêtes avec
                    points juste en dessous.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-orbitron text-slate-400 uppercase mb-2">
                      Source des Quêtes à afficher sur l’écran :
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWallpaperSource('today')}
                        className={`py-2.5 px-3 rounded-lg font-orbitron text-xs font-bold border transition ${
                          wallpaperSource === 'today'
                            ? 'bg-cyan-500/20 border-[#00E5FF] text-[#00E5FF]'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Quêtes d’Aujourd’hui ({todayScore}/100)
                      </button>
                      <button
                        onClick={() => setWallpaperSource('tomorrow')}
                        className={`py-2.5 px-3 rounded-lg font-orbitron text-xs font-bold border transition ${
                          wallpaperSource === 'tomorrow'
                            ? 'bg-cyan-500/20 border-[#00E5FF] text-[#00E5FF]'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Quêtes de Demain ({tomorrowTotalPoints} pts)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-orbitron text-slate-400 uppercase mb-1.5">
                      Citation de discipline en bas d’écran :
                    </label>
                    <input
                      type="text"
                      value={wallpaperQuote}
                      onChange={(e) => setWallpaperQuote(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm font-rajdhani text-white focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-xs font-rajdhani text-slate-300">
                      Simuler l’horloge du téléphone sur l’aperçu (non incluse
                      dans le PNG téléchargé)
                    </span>
                    <button
                      onClick={() =>
                        setShowPhoneClockOverlay(!showPhoneClockOverlay)
                      }
                      className={`px-3 py-1 rounded font-orbitron text-xs font-bold ${
                        showPhoneClockOverlay
                          ? 'bg-[#00E5FF] text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {showPhoneClockOverlay ? 'OUI' : 'NON'}
                    </button>
                  </div>

                  <button
                    onClick={downloadWallpaper}
                    className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-purple-500 hover:opacity-95 text-slate-950 font-orbitron font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2.5"
                  >
                    <Download className="w-5 h-5" /> Télécharger le Fond d’Écran
                    (PNG HD)
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 space-y-1.5 text-xs font-rajdhani text-slate-400">
                  <div className="font-orbitron font-bold text-cyan-400 uppercase">
                    💡 Astuce Utilisation Rapide sur Téléphone :
                  </div>
                  <p>
                    1. Cochez une tâche ou préparez votre journée du lendemain.
                    <br />
                    2. Cliquez sur{' '}
                    <strong>Télécharger le Fond d’Écran</strong> et
                    définissez-le sur votre écran de verrouillage en 2 secondes.
                  </p>
                </div>
              </div>

              {/* Maquette Smartphone Temps Réel à droite */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="relative w-[310px] sm:w-[340px] rounded-[42px] p-3 bg-slate-900 border-4 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                  {/* Encoche téléphone */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20" />

                  {/* Horloge simulée de l'écran de verrouillage */}
                  {showPhoneClockOverlay && (
                    <div className="absolute top-14 inset-x-0 z-10 text-center pointer-events-none select-none">
                      <div className="text-xs font-sans text-slate-300/90 tracking-wide">
                        Mardi 10 Novembre
                      </div>
                      <div className="text-5xl font-bold text-white/90 tracking-tight leading-none mt-1">
                        07:30
                      </div>
                    </div>
                  )}

                  {/* Canvas HTML5 réel redimensionné en CSS */}
                  <canvas
                    ref={canvasRef}
                    width={1080}
                    height={1920}
                    className="w-full h-auto rounded-[32px] block bg-[#05070B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              ÉCRAN 4 : SANCTUAIRE DE MOTIVATION (VIDÉOS)
              ========================================== */}
          {activeTab === 'sanctuary' && (
            <div className="space-y-6">
              <div className="hud-panel rounded-xl border border-cyan-500/30 p-5 md:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-orbitron text-[#FF1E42] uppercase tracking-widest">
                      PROTOCOLE D’URGENCE MENTALE
                    </span>
                    <h2 className="text-2xl font-orbitron font-black text-white">
                      SANCTUAIRE DE MOTIVATION
                    </h2>
                    <p className="text-sm font-rajdhani text-slate-400">
                      La discipline prime sur la motivation, mais dans les
                      moments de doute, utilisez ces catalyseurs pour relancer
                      la machine.
                    </p>
                  </div>

                  {/* Filtres par Tag */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Tous',
                      'Discipline',
                      'Mental',
                      'Entraînement',
                      'Anime',
                    ].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedVideoTag(tag)}
                        className={`px-3 py-1.5 rounded-lg font-orbitron text-xs font-bold border transition ${
                          selectedVideoTag === tag
                            ? 'bg-[#00E5FF] text-slate-950 border-[#00E5FF]'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formulaire Ajout Vidéo */}
                <form
                  onSubmit={addMotivationVideo}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800"
                >
                  <input
                    type="text"
                    placeholder="Titre de la vidéo inspirante..."
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="md:col-span-4 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-rajdhani text-white"
                  />
                  <input
                    type="text"
                    placeholder="Lien YouTube (vidéo, shorts) ou Instagram (reel, post)..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="md:col-span-4 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-rajdhani text-white"
                  />
                  <select
                    value={newVideoTag}
                    onChange={(e) => setNewVideoTag(e.target.value)}
                    className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-rajdhani text-slate-200"
                  >
                    <option value="Discipline">Discipline</option>
                    <option value="Mental">Mental</option>
                    <option value="Entraînement">Entraînement</option>
                    <option value="Anime">Anime</option>
                  </select>
                  <button
                    type="submit"
                    className="md:col-span-2 bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs rounded-lg px-3 py-2 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                  <input
                    type="text"
                    placeholder="Note personnelle : Pourquoi cette vidéo me réveille dans les moments durs ?"
                    value={newVideoNote}
                    onChange={(e) => setNewVideoNote(e.target.value)}
                    className="md:col-span-12 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-rajdhani text-slate-200"
                  />
                </form>

                {/* Grille des vidéos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredVideos.map((vid) => {
                    const embedUrl = getEmbedUrl(vid.url);
                    return (
                      <div
                        key={vid.id}
                        className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 transition group"
                      >
                        <div>
                          <div className="aspect-video bg-black relative">
                            {embedUrl ? (
                              <iframe
                                src={embedUrl}
                                title={vid.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500">
                                <Film className="w-10 h-10" />
                              </div>
                            )}
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-orbitron uppercase px-2 py-0.5 rounded bg-cyan-500/15 text-[#00E5FF] border border-cyan-500/30">
                                {vid.tag}
                              </span>
                              <button
                                onClick={() => deleteVideo(vid.id)}
                                className="text-slate-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <h3 className="font-orbitron font-bold text-base text-white line-clamp-1">
                              {vid.title}
                            </h3>
                            <p className="text-xs font-rajdhani text-slate-300 italic bg-slate-900/90 p-2.5 rounded border-l-2 border-[#FFD700]">
                              « {vid.note} »
                            </p>
                          </div>
                        </div>

                        <div className="p-4 pt-0">
                          <button
                            onClick={() => setFocusedVideo(vid)}
                            className="w-full py-2 rounded-lg bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-orbitron text-xs font-bold flex items-center justify-center gap-2 transition"
                          >
                            <Maximize2 className="w-3.5 h-3.5" /> Mode Focus
                            Immersif
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              ÉCRAN 5 : SYNC PC/MOBILE, RANGS & HISTORIQUE
              ========================================== */}
          {activeTab === 'sync' && (
            <div className="space-y-6">
              {/* Calibration 5 ans & Table des Rangs */}
              <div className="hud-panel rounded-xl border border-cyan-500/30 p-5 md:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-orbitron text-[#00E5FF] uppercase tracking-widest">
                      ALGORITHME DE PROGRESSION SUR 5 ANS
                    </span>
                    <h2 className="text-xl font-orbitron font-black text-white">
                      HIÉRARCHIE DES RANGS & CALIBRAGE
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setMaxDaysCap(20)}
                      className={`px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold border transition ${
                        maxDaysCap === 20
                          ? 'bg-[#00E5FF] text-slate-950 border-[#00E5FF]'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      Rang S en 5 ans (Plafond 20j/niv)
                    </button>
                    <button
                      onClick={() => setMaxDaysCap(13)}
                      className={`px-3.5 py-2 rounded-lg font-orbitron text-xs font-bold border transition ${
                        maxDaysCap === 13
                          ? 'bg-purple-500 text-white border-purple-400'
                          : 'bg-slate-900 text-slate-300 border-slate-700'
                      }`}
                    >
                      Monarque Niv.150 en 5 ans (Plafond 13j/niv)
                    </button>
                  </div>
                </div>

                {/* Grille des paliers de Rangs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {RANKS_CONFIG.map((r) => {
                    const isCurrent = level >= r.min && level <= r.max;
                    return (
                      <div
                        key={r.rank}
                        className={`p-3.5 rounded-lg border transition ${
                          isCurrent
                            ? 'bg-slate-900/95 scale-[1.02]'
                            : 'bg-slate-950/70 opacity-75'
                        }`}
                        style={{
                          borderColor: isCurrent ? r.color : '#1E293B',
                          boxShadow: isCurrent
                            ? `0 0 20px ${r.borderGlow}`
                            : 'none',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="font-orbitron font-black text-sm"
                            style={{ color: r.color }}
                          >
                            {r.rank}
                          </span>
                          <span className="text-[11px] font-orbitron text-slate-400">
                            Niv. {r.min === 150 ? '150+' : `${r.min}-${r.max}`}
                          </span>
                        </div>
                        <div className="text-xs font-rajdhani text-slate-200 font-bold mt-1">
                          {r.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Module de Synchronisation PC <-> Téléphone */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="hud-panel rounded-xl border border-cyan-500/30 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-[#00E5FF] font-orbitron text-sm font-bold uppercase">
                    <RefreshCw className="w-4 h-4" /> Relier PC & Téléphone
                    (Synchronisation)
                  </div>
                  <p className="text-xs font-rajdhani text-slate-300 leading-relaxed">
                    Générez votre code de sauvegarde chiffré en 1 clic ou
                    téléchargez le fichier JSON pour transférer instantanément
                    votre Niveau, vos quêtes et vos vidéos entre votre PC et
                    votre smartphone.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={generateSyncCode}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-orbitron text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copiedCode
                        ? 'Code Copié !'
                        : 'Générer & Copier Code Sync'}
                    </button>
                    <button
                      onClick={exportJsonFile}
                      className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                    >
                      <Download className="w-4 h-4" /> Export JSON
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Collez ici un code de synchronisation provenant de votre autre appareil..."
                    value={syncString}
                    onChange={(e) => setSyncString(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-cyan-300 focus:border-[#00E5FF] focus:outline-none"
                  />

                  <button
                    onClick={importFromSyncCode}
                    className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-orbitron text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Charger le Code de
                    Synchronisation
                  </button>

                  {importFeedback && (
                    <div
                      className={`p-3 rounded-lg text-xs font-rajdhani border ${
                        importFeedback.type === 'success'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-500 text-rose-300'
                      }`}
                    >
                      {importFeedback.message}
                    </div>
                  )}
                </div>

                {/* Historique des 30 derniers jours */}
                <div className="hud-panel rounded-xl border border-cyan-500/30 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#FFD700] font-orbitron text-sm font-bold uppercase">
                      <History className="w-4 h-4" /> Journal Système (
                      {historyLogs.length} entrées)
                    </div>
                    <span className="text-xs font-rajdhani text-slate-400">
                      Total 100/100 :{' '}
                      <strong className="text-white">
                        {totalPerfectDays} j
                      </strong>
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {historyLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3 text-xs font-rajdhani"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-orbitron font-bold text-slate-300">
                              {log.date}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded font-orbitron text-[10px] font-bold ${
                                log.status === 'LEVEL_UP'
                                  ? 'bg-amber-500/20 text-[#FFD700] border border-[#FFD700]'
                                  : log.status === 'PERFECT'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                              }`}
                            >
                              {log.score}/100
                            </span>
                            <span className="text-slate-400">
                              Niv.{log.levelAfter}
                            </span>
                          </div>
                          <p className="text-slate-400 mt-1">{log.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ==========================================
          BOTTOM NAVIGATION BAR (MOBILE)
          ========================================== */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0E17]/95 backdrop-blur-lg border-t border-cyan-500/30 flex items-center justify-around pt-2 pb-6 px-1">
        {[
          { id: 'dashboard', label: 'QG', icon: Sword },
          { id: 'planner', label: 'Demain', icon: Calendar },
          { id: 'wallpaper', label: 'Wallpaper', icon: Smartphone },
          { id: 'sanctuary', label: 'Motivation', icon: Flame },
          { id: 'sync', label: 'Rang/Sync', icon: RefreshCw },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg font-orbitron text-[10px] transition ${
                isActive ? 'text-[#00E5FF] font-bold' : 'text-slate-400'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? 'drop-shadow-[0_0_8px_#00E5FF]' : ''
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
