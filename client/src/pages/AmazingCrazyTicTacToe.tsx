/* The Amazing Crazy Tic Tac Toe
   - Pick your own emoji for each player
   - Choose grid size from 3x3 up to 9x9
   - Board rendered with CSS 3D transforms and draggable rotation
*/
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ArrowLeft, RotateCcw, Sparkles, Settings2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

type Player = 0 | 1;
type Cell = Player | null;

const EMOJI_PRESETS = [
  '🦖', '🐉', '🦄', '🐙', '🦊', '🐼', '🐸', '🐵',
  '🔥', '❄️', '⚡', '🌈', '🌀', '💎', '🌟', '🍕',
  '🍩', '🧠', '👻', '🤖', '👾', '🎃', '💣', '🚀',
  '⚽', '🏀', '🎲', '🎯', '🪐', '🗿', '🧸', '🦑',
];

const GRID_SIZES = [3, 4, 5, 6, 7, 8, 9] as const;

function defaultWinLength(size: number): number {
  if (size <= 3) return 3;
  if (size <= 5) return 4;
  return 5;
}

function getWinLengthOptions(size: number): number[] {
  const opts: number[] = [];
  for (let k = 3; k <= size; k++) opts.push(k);
  return opts;
}

type WinLine = { cells: number[]; player: Player } | null;

function checkWinner(board: Cell[], size: number, winLen: number): WinLine {
  const idx = (r: number, c: number) => r * size + c;
  const dirs = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal \
    [1, -1],  // diagonal /
  ];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const start = board[idx(r, c)];
      if (start === null) continue;
      for (const [dr, dc] of dirs) {
        const endR = r + dr * (winLen - 1);
        const endC = c + dc * (winLen - 1);
        if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
        const line: number[] = [];
        let ok = true;
        for (let k = 0; k < winLen; k++) {
          const cell = board[idx(r + dr * k, c + dc * k)];
          if (cell !== start) {
            ok = false;
            break;
          }
          line.push(idx(r + dr * k, c + dc * k));
        }
        if (ok) return { cells: line, player: start as Player };
      }
    }
  }
  return null;
}

type GameConfig = {
  emojis: [string, string];
  size: number;
  winLen: number;
};

type ScreenState =
  | { screen: 'setup' }
  | { screen: 'playing'; config: GameConfig };

function EmojiPicker({
  value,
  onChange,
  label,
  accent,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  accent: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white/90 uppercase tracking-wider">
          {label}
        </div>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
          style={{
            background: accent,
            boxShadow: `0 10px 30px -5px ${accent}`,
          }}
        >
          {value || '❓'}
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {EMOJI_PRESETS.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => onChange(e)}
            className={cn(
              'aspect-square rounded-lg text-xl flex items-center justify-center transition-all',
              'bg-white/5 hover:bg-white/15 hover:scale-110',
              value === e && 'ring-2 ring-white bg-white/20 scale-110',
            )}
          >
            {e}
          </button>
        ))}
      </div>
      <Input
        value={value}
        onChange={(ev) => {
          const chars = Array.from(ev.target.value);
          onChange(chars.slice(-2).join(''));
        }}
        placeholder="Or type your own emoji"
        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        maxLength={4}
      />
    </div>
  );
}

function SetupScreen({ onStart }: { onStart: (cfg: GameConfig) => void }) {
  const [p1, setP1] = useState('🦖');
  const [p2, setP2] = useState('🦄');
  const [size, setSize] = useState(5);
  const [winLen, setWinLen] = useState(defaultWinLength(5));

  const handleSize = (s: number) => {
    setSize(s);
    setWinLen(defaultWinLength(s));
  };

  const canStart = p1 && p2 && p1 !== p2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-block"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-yellow-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
            The Amazing
          </h1>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            Crazy Tic Tac Toe
          </h1>
        </motion.div>
        <p className="text-white/70 mt-4 text-lg">
          Pick your emoji. Pick your grid. Rotate the 3D board. Dominate.
        </p>
      </div>

      <div className="rounded-3xl p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <EmojiPicker
            label="Player 1"
            value={p1}
            onChange={setP1}
            accent="linear-gradient(135deg,#06b6d4,#3b82f6)"
          />
          <EmojiPicker
            label="Player 2"
            value={p2}
            onChange={setP2}
            accent="linear-gradient(135deg,#ec4899,#f59e0b)"
          />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Settings2 className="w-4 h-4" /> Grid Size
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {GRID_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSize(s)}
                  className={cn(
                    'py-3 rounded-xl font-bold transition-all text-white',
                    size === s
                      ? 'bg-gradient-to-br from-cyan-400 to-pink-500 scale-105 shadow-lg'
                      : 'bg-white/5 hover:bg-white/15',
                  )}
                >
                  {s}×{s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4" /> In-a-Row to Win
            </div>
            <Select
              value={String(winLen)}
              onValueChange={(v) => setWinLen(Number(v))}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getWinLengthOptions(size).map((k) => (
                  <SelectItem key={k} value={String(k)}>
                    {k} in a row{k === defaultWinLength(size) ? ' (recommended)' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {p1 === p2 && p1 && (
          <div className="mt-4 text-center text-yellow-300 text-sm">
            Pick different emojis for each player!
          </div>
        )}

        <Button
          disabled={!canStart}
          onClick={() => onStart({ emojis: [p1, p2], size, winLen })}
          className="w-full mt-8 h-14 text-lg font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 hover:opacity-90 text-white border-0 shadow-xl disabled:opacity-40"
        >
          <Sparkles className="w-5 h-5 mr-2" /> Start The Madness
        </Button>
      </div>
    </motion.div>
  );
}

function Board3D({
  config,
  onBack,
}: {
  config: GameConfig;
  onBack: () => void;
}) {
  const { emojis, size, winLen } = config;
  const total = size * size;
  const [board, setBoard] = useState<Cell[]>(() => Array(total).fill(null));
  const [current, setCurrent] = useState<Player>(0);
  const [scores, setScores] = useState<[number, number, number]>([0, 0, 0]); // p1, p2, draws

  const winner = useMemo(() => checkWinner(board, size, winLen), [board, size, winLen]);
  const isFull = useMemo(() => board.every((c) => c !== null), [board]);
  const gameOver = winner !== null || isFull;

  const scoredRef = useRef(false);
  useEffect(() => {
    if (!gameOver) {
      scoredRef.current = false;
      return;
    }
    if (scoredRef.current) return;
    scoredRef.current = true;
    setScores((s) => {
      const next: [number, number, number] = [...s] as [number, number, number];
      if (winner) next[winner.player] += 1;
      else next[2] += 1;
      return next;
    });
  }, [gameOver, winner]);

  const handleCell = (i: number) => {
    if (gameOver || board[i] !== null) return;
    const next = board.slice();
    next[i] = current;
    setBoard(next);
    setCurrent((p) => (p === 0 ? 1 : 0));
  };

  const reset = () => {
    setBoard(Array(total).fill(null));
    setCurrent(0);
  };

  // 3D rotation controls
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(-15);
  const dragRef = useRef<{ x: number; y: number; rx: number; ry: number } | null>(
    null,
  );

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, rx: rotX, ry: rotY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setRotY(dragRef.current.ry + dx * 0.4);
    setRotX(Math.max(-75, Math.min(75, dragRef.current.rx - dy * 0.4)));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // ignore — capture may already be released
    }
    dragRef.current = null;
  };

  // Subtle auto-sway when idle
  useEffect(() => {
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.005;
      if (!dragRef.current) {
        setRotY((ry) => ry + Math.sin(t) * 0.06);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Sizing: board scales with grid size but fits the viewport
  const cellPx = size <= 4 ? 88 : size <= 6 ? 72 : size <= 8 ? 58 : 50;
  const gapPx = 6;
  const boardPx = cellPx * size + gapPx * (size - 1);

  const winSet = useMemo(
    () => new Set(winner?.cells ?? []),
    [winner],
  );

  const playerColors = [
    'from-cyan-400 to-blue-500',
    'from-pink-500 to-orange-400',
  ];
  const playerGlow = ['#06b6d4', '#ec4899'];

  const statusText = winner
    ? `${emojis[winner.player]} Player ${winner.player + 1} wins!`
    : isFull
      ? "It's a draw!"
      : `${emojis[current]} Player ${current + 1}'s turn`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto flex flex-col items-center"
    >
      {/* Top bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Change Setup
        </Button>
        <div className="flex items-center gap-2">
          <ScoreCard
            emoji={emojis[0]}
            score={scores[0]}
            gradient="from-cyan-400 to-blue-500"
            active={!gameOver && current === 0}
          />
          <div className="text-white/50 text-xs font-bold px-2">
            DRAWS: {scores[2]}
          </div>
          <ScoreCard
            emoji={emojis[1]}
            score={scores[1]}
            gradient="from-pink-500 to-orange-400"
            active={!gameOver && current === 1}
          />
        </div>
        <Button
          onClick={reset}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> New Round
        </Button>
      </div>

      {/* Status */}
      <motion.div
        key={statusText}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          'mb-6 px-6 py-3 rounded-full font-bold text-lg md:text-xl text-white shadow-xl',
          'bg-gradient-to-r',
          winner
            ? playerColors[winner.player]
            : isFull
              ? 'from-slate-500 to-slate-700'
              : playerColors[current],
        )}
        style={{
          boxShadow: winner
            ? `0 0 40px ${playerGlow[winner.player]}`
            : !isFull
              ? `0 0 30px ${playerGlow[current]}`
              : undefined,
        }}
      >
        {statusText}
      </motion.div>

      {/* 3D stage */}
      <div
        className="relative w-full flex items-center justify-center select-none touch-none"
        style={{ perspective: '1400px', minHeight: boardPx + 120 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: dragRef.current ? 'none' : 'transform 0.15s ease-out',
            width: boardPx,
            height: boardPx,
          }}
        >
          {/* Floor plate (behind grid) */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              transform: 'translateZ(-40px)',
              background:
                'linear-gradient(135deg, rgba(14,165,233,0.25), rgba(236,72,153,0.25))',
              boxShadow:
                '0 40px 80px -20px rgba(0,0,0,0.6), inset 0 0 60px rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
          {/* Grid */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${size}, ${cellPx}px)`,
              gridTemplateRows: `repeat(${size}, ${cellPx}px)`,
              gap: gapPx,
              transformStyle: 'preserve-3d',
            }}
          >
            {board.map((cell, i) => {
              const isWin = winSet.has(i);
              const owner = cell;
              return (
                <button
                  key={i}
                  onClick={() => handleCell(i)}
                  disabled={gameOver || cell !== null}
                  className={cn(
                    'relative rounded-xl flex items-center justify-center font-bold transition-all',
                    'disabled:cursor-not-allowed',
                    owner === null && !gameOver && 'hover:scale-[1.08] cursor-pointer',
                  )}
                  style={{
                    fontSize: Math.floor(cellPx * 0.55),
                    background:
                      owner === null
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))'
                        : owner === 0
                          ? 'linear-gradient(135deg,#06b6d4,#3b82f6)'
                          : 'linear-gradient(135deg,#ec4899,#f59e0b)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    transform: `translateZ(${owner !== null ? 24 : 8}px)`,
                    boxShadow: isWin
                      ? `0 0 25px 4px ${playerGlow[owner ?? 0]}, 0 12px 25px -10px rgba(0,0,0,0.6)`
                      : owner !== null
                        ? '0 14px 28px -10px rgba(0,0,0,0.6)'
                        : '0 6px 14px -6px rgba(0,0,0,0.4)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                >
                  <AnimatePresence>
                    {owner !== null && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{
                          scale: isWin ? [1, 1.25, 1] : 1,
                          rotate: 0,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                          scale: isWin
                            ? { repeat: Infinity, duration: 0.9 }
                            : undefined,
                        }}
                        className="drop-shadow-lg"
                      >
                        {emojis[owner]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-white/50 text-xs mt-6 text-center">
        Drag anywhere on the board area to rotate it in 3D space.
        <br className="md:hidden" />
        {' '}
        Need {winLen} in a row to win on a {size}×{size} grid.
      </p>

      {/* Winner overlay */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-40"
          >
            <div className="relative">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                  animate={{
                    x: Math.cos((i / 24) * Math.PI * 2) * 300,
                    y: Math.sin((i / 24) * Math.PI * 2) * 300,
                    opacity: 0,
                    scale: 1.4,
                    rotate: 360,
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.02 }}
                  className="absolute text-4xl"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  {emojis[winner.player]}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScoreCard({
  emoji,
  score,
  gradient,
  active,
}: {
  emoji: string;
  score: number;
  gradient: string;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{ scale: active ? 1.05 : 1 }}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-white bg-gradient-to-br shadow-lg',
        gradient,
        active ? 'ring-2 ring-white' : 'opacity-80',
      )}
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <span className="text-lg leading-none">{score}</span>
    </motion.div>
  );
}

export default function AmazingCrazyTicTacToe() {
  const [state, setState] = useState<ScreenState>({ screen: 'setup' });

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          'radial-gradient(1200px 600px at 20% 10%, rgba(14,165,233,0.35), transparent 60%), radial-gradient(900px 500px at 80% 90%, rgba(236,72,153,0.35), transparent 60%), radial-gradient(700px 400px at 60% 40%, rgba(245,158,11,0.22), transparent 60%), #0a0a1a',
      }}
    >
      {/* Animated backdrop orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
          <div className="text-white/50 text-xs font-mono tracking-widest">
            v1.0 · AMAZING · CRAZY
          </div>
        </div>

        {state.screen === 'setup' ? (
          <SetupScreen
            onStart={(config) => setState({ screen: 'playing', config })}
          />
        ) : (
          <Board3D
            config={state.config}
            onBack={() => setState({ screen: 'setup' })}
          />
        )}
      </div>
    </div>
  );
}
