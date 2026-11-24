import { useState, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronDown,
  Search,
  X,
  Sparkles,
  Flame,
  Droplets,
  Cloud,
  Rainbow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';
import { MOCK_OSHO_CARDS, type IOshoCard, type CardFamily } from '@/data/osho_cards';

interface LibrarySectionProps {
  onPickCard: (card: IOshoCard) => void;
}

const FAMILY_OPTIONS: { key: CardFamily | 'all'; label: string; color: string }[] = [
  { key: 'all', label: '全部', color: 'hsl(270 70% 65%)' },
  { key: 'major', label: '大阿卡纳', color: 'hsl(45 80% 65%)' },
  { key: 'fire', label: '火', color: 'hsl(22 85% 60%)' },
  { key: 'water', label: '水', color: 'hsl(200 80% 60%)' },
  { key: 'cloud', label: '云', color: 'hsl(220 15% 70%)' },
  { key: 'rainbow', label: '彩虹', color: 'hsl(320 75% 65%)' },
];

function FamilyIcon({ family, className }: { family: CardFamily; className?: string }) {
  const cls = className || 'size-3.5';
  switch (family) {
    case 'major':
      return <Sparkles className={cls} />;
    case 'fire':
      return <Flame className={cls} />;
    case 'water':
      return <Droplets className={cls} />;
    case 'cloud':
      return <Cloud className={cls} />;
    case 'rainbow':
      return <Rainbow className={cls} />;
  }
}

function getFamilyColor(family: CardFamily): string {
  const found = FAMILY_OPTIONS.find((f) => f.key === family);
  return found?.color || 'hsl(270 70% 65%)';
}

export default memo(function LibrarySection({ onPickCard }: LibrarySectionProps) {
  const [open, setOpen] = useState(false);
  const [family, setFamily] = useState<CardFamily | 'all'>('all');
  const [keyword, setKeyword] = useState('');
  const [selectedCard, setSelectedCard] = useState<IOshoCard | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return MOCK_OSHO_CARDS.filter((c) => {
      if (family !== 'all' && c.family !== family) return false;
      if (!kw) return true;
      return (
        c.name.toLowerCase().includes(kw) ||
        c.familyLabel.includes(kw) ||
        c.keywords.some((k) => k.toLowerCase().includes(kw))
      );
    });
  }, [family, keyword]);

  const handlePick = useCallback(
    (card: IOshoCard) => {
      setSelectedCard(null);
      setOpen(false);
      onPickCard(card);
    },
    [onPickCard],
  );

  const handleImgError = useCallback((id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  }, []);

  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-card/40"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-primary/80" />
                <span className="text-sm font-medium text-foreground/90">
                  浏览全部 79 张牌库
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'size-4 text-muted-foreground transition-transform duration-300',
                  open && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <CardContent className="space-y-4 border-t border-border/20 pt-4">
                    {/* 家族筛选 + 搜索 */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {FAMILY_OPTIONS.map((f) => (
                          <button
                            key={f.key}
                            onClick={() => setFamily(f.key)}
                            className={cn(
                              'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all',
                              family === f.key
                                ? 'border-primary/50 bg-primary/10 text-foreground'
                                : 'border-border/30 bg-card/40 text-muted-foreground hover:border-border/60 hover:text-foreground/80',
                            )}
                          >
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: f.color }}
                            />
                            {f.label}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder="搜索牌名或关键词..."
                          className="bg-card/50 pl-9 text-sm"
                        />
                        {keyword && (
                          <button
                            onClick={() => setKeyword('')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="size-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      共 {filtered.length} 张牌
                    </div>

                    {/* 牌网格 */}
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                      {filtered.map((card, i) => (
                        <motion.button
                          key={card.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.015 }}
                          whileHover={{ y: -3 }}
                          onClick={() => setSelectedCard(card)}
                          className="group flex flex-col items-center gap-1.5"
                        >
                          <div
                            className="relative w-full overflow-hidden rounded-lg border border-border/30 bg-card/50 shadow-sm transition-all group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10"
                            style={{ aspectRatio: '2 / 3' }}
                          >
                            {imgError[card.id] ? (
                              <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-primary/5 text-[10px] text-muted-foreground">
                                <Sparkles className="size-5 text-primary/50" />
                                牌背
                              </div>
                            ) : (
                              <Image
                                src={card.imageUrl}
                                alt={card.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={() => handleImgError(card.id)}
                              />
                            )}
                          </div>
                          <div className="flex w-full items-center justify-center gap-1">
                            <FamilyIcon
                              family={card.family}
                              className="size-2.5 shrink-0"
                            />
                            <span className="truncate text-[11px] text-foreground/80">
                              {card.name}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {filtered.length === 0 && (
                      <div className="py-8 text-center text-xs text-muted-foreground">
                        没有找到匹配的牌
                      </div>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 牌详情 Dialog */}
        <Dialog open={!!selectedCard} onOpenChange={(o) => !o && setSelectedCard(null)}>
          <DialogContent className="max-w-lg border-primary/20 bg-card/90 p-0 backdrop-blur-md">
            {selectedCard && (
              <>
                <DialogHeader className="px-5 pt-5">
                  <DialogTitle className="flex items-center gap-2 font-['Noto_Serif_SC'] text-lg">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: getFamilyColor(selectedCard.family) }}
                    />
                    {selectedCard.name}
                    <span className="ml-1 text-xs font-normal text-muted-foreground">
                      {selectedCard.nameFr}
                    </span>
                  </DialogTitle>
                </DialogHeader>

                <div className="max-h-[60vh] overflow-y-auto px-5 pb-5">
                  <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                    <div className="relative w-32 shrink-0 overflow-hidden rounded-lg border border-border/30 shadow-lg shadow-primary/10">
                      <div style={{ aspectRatio: '2 / 3' }}>
                        {imgError[selectedCard.id] ? (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-primary/10 text-xs text-muted-foreground">
                            <Sparkles className="size-6 text-primary/50" />
                            牌背
                          </div>
                        ) : (
                          <Image
                            src={selectedCard.imageUrl}
                            alt={selectedCard.name}
                            className="h-full w-full object-cover"
                            onError={() => handleImgError(selectedCard.id)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-start">
                        <Badge variant="outline" className="text-[11px]">
                          {selectedCard.familyLabel}
                        </Badge>
                        <Badge variant="outline" className="text-[11px]">
                          No.{selectedCard.number}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedCard.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary/90"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
                    {selectedCard.meaning.split('\n\n').map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                <DialogFooter className="border-t border-border/20 px-5 py-3">
                  <Button
                    onClick={() => handlePick(selectedCard)}
                    className="gap-2 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Sparkles className="size-4" />
                    以这张牌解我的问题
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
});
