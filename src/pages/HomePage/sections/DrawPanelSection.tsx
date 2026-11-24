import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, RotateCcw, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';
import type { IOshoCard } from '@/data/osho_cards';
import { SPREADS, type SpreadType, type ISpreadPosition } from '@/data/spreads';
import type { ISpreadCardSlot } from '@/lib/history-storage';

interface DrawPanelSectionProps {
  question: string;
  onQuestionChange: (q: string) => void;
  spreadType: SpreadType;
  cards: ISpreadCardSlot[];
  isDrawing: boolean;
  revealedCount: number;
  onDraw: () => void;
  onReset: () => void;
  onRevealAll: () => void;
}

export default memo(function DrawPanelSection({
  question,
  onQuestionChange,
  spreadType,
  cards,
  isDrawing,
  revealedCount,
  onDraw,
  onReset,
  onRevealAll,
}: DrawPanelSectionProps) {
  const [selectedCard, setSelectedCard] = useState<ISpreadCardSlot | null>(null);
  const spread = SPREADS[spreadType];
  const isSingle = spreadType === 'single';
  const allRevealed = revealedCount >= cards.length && cards.length > 0;

  // 单牌模式下直接拿第一张
  const singleCard = cards.length > 0 ? cards[0].card : null;

  return (
    <section className="w-full py-8 md:py-10">
      <div className="mx-auto max-w-5xl px-4">
        {/* 问题输入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="mx-auto mb-8 max-w-3xl"
        >
          <label className="mb-2 block text-sm font-medium text-foreground/80">
            你当下的问题或情境（可选）
          </label>
          <div className="relative">
            <Textarea
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              placeholder="静心片刻，在心中默念你的问题...比如：我目前的工作该如何选择？"
              className="min-h-[90px] resize-none bg-card/50 pr-20 text-base backdrop-blur-sm transition-colors placeholder:text-muted-foreground/60 focus:bg-card/80"
              maxLength={200}
              disabled={isDrawing}
            />
            <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {question.length}/200
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground/70">
            不填也可以抽牌，让宇宙给你当下最需要的讯息
          </p>
        </motion.div>

        {/* 抽卡交互区 */}
        <div className="relative min-h-[380px] md:min-h-[440px]">
          <AnimatePresence mode="wait">
            {/* 状态 1: 牌堆（未抽） */}
            {!isDrawing && cards.length === 0 && (
              <motion.div
                key="deck"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <DeckVisual spreadName={spread.name} cardCount={spread.cardCount} onClick={onDraw} />

                <Button
                  onClick={onDraw}
                  size="lg"
                  className="group gap-2 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Shuffle className="size-4 transition-transform group-hover:rotate-180" />
                  开始抽牌
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  点击牌堆或按钮，从 79 张牌中抽取 {spread.cardCount} 张
                </p>
              </motion.div>
            )}

            {/* 状态 2: 洗牌中 */}
            {isDrawing && (
              <motion.div
                key="shuffling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex h-48 items-center justify-center"
              >
                <div className="relative h-32 w-64">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2"
                      initial={{
                        x: '-50%',
                        y: '-50%',
                        rotate: 0,
                        scale: 0.8,
                        opacity: 0,
                      }}
                      animate={{
                        x: `calc(-50% + ${(i - 4) * 50}px)`,
                        y: `calc(-50% + ${Math.sin(i * 1.2) * 25}px)`,
                        rotate: (i - 4) * 18,
                        scale: [0.8, 1, 0.95],
                        opacity: [0, 1, 0.7],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.06,
                        ease: 'easeInOut',
                      }}
                      style={{ zIndex: i }}
                    >
                      <CardBack small />
                    </motion.div>
                  ))}
                </div>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                  洗牌中，感受能量流动...
                </p>
              </motion.div>
            )}

            {/* 状态 3: 牌阵揭晓 */}
            {!isDrawing && cards.length > 0 && (
              <motion.div
                key="spread-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SpreadLayout
                  spreadType={spreadType}
                  slots={cards}
                  revealedCount={revealedCount}
                  onCardClick={setSelectedCard}
                />

                {/* 操作栏 */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  {!allRevealed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onRevealAll}
                      className="gap-2"
                    >
                      <Sparkles className="size-3" />
                      全部翻开
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
                    <RotateCcw className="size-3" />
                    重新抽牌
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 单牌模式：右侧牌义展示（保持原有体验） */}
        {isSingle && allRevealed && singleCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-8 max-w-3xl"
          >
            <SingleCardMeaningCard card={singleCard} />
          </motion.div>
        )}
      </div>

      {/* 单牌详情弹窗（牌阵模式点击用） */}
      <Dialog open={!!selectedCard} onOpenChange={(open) => !open && setSelectedCard(null)}>
        <DialogContent className="max-w-lg border-border/40 bg-card/95 p-6 backdrop-blur-md">
          {selectedCard && (
            <>
              <DialogHeader>
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                    {selectedCard.positionName}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {selectedCard.card.familyLabel}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{selectedCard.card.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex gap-4">
                <div className="shrink-0">
                  <div className="overflow-hidden rounded-lg border border-border/40 shadow-lg">
            <CardImageWithFallback
              src={selectedCard.card.imageUrl}
              alt={selectedCard.card.name}
              className="h-40 w-auto"
              fallbackText={selectedCard.card.name}
            />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCard.card.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="bg-secondary/40 text-[10px]">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2 text-xs leading-relaxed text-foreground/80">
                    {selectedCard.card.meaning.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
});

// ===== 牌堆视觉组件 =====
function DeckVisual({
  spreadName,
  cardCount,
  onClick,
}: {
  spreadName: string;
  cardCount: number;
  onClick: () => void;
}) {
  return (
    <div
      className="relative mb-8 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      {/* 牌堆底层 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          animate={{
            y: [0, -6, 0],
            rotate: [-i * 2, -i * 2 + 1, -i * 2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transform: `translate(-50%, -50%) translateY(${i * 6}px) rotate(${i * 3}deg)`,
            zIndex: 10 - i,
          }}
        >
          <CardBack offset={i} />
        </motion.div>
      ))}

      {/* 顶层牌 */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.98 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <CardBack />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
          <Sparkles className="size-7 text-primary/60" />
          <span className="text-xs font-medium text-primary/70">{spreadName}</span>
          <span className="text-[10px] text-primary/50">{cardCount} 张牌</span>
        </div>
      </motion.div>
    </div>
  );
}

// ===== 牌背组件 =====
function CardBack({ offset = 0, small = false }: { offset?: number; small?: boolean }) {
  const w = small ? 'w-14' : 'w-32';
  const h = small ? 'h-20' : 'h-44';
  return (
    <div
      className={`${w} ${h} rounded-lg border border-primary/30 bg-gradient-to-br from-card via-primary/20 to-card shadow-lg shadow-primary/10`}
      style={{ opacity: 1 - offset * 0.15 }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex size-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
          <Sparkles className="size-4 text-primary/60" />
        </div>
      </div>
    </div>
  );
}

// ===== 牌阵布局组件 =====
function SpreadLayout({
  spreadType,
  slots,
  revealedCount,
  onCardClick,
}: {
  spreadType: SpreadType;
  slots: ISpreadCardSlot[];
  revealedCount: number;
  onCardClick: (slot: ISpreadCardSlot) => void;
}) {
  const spread = SPREADS[spreadType];
  const isSingle = spreadType === 'single';

  if (isSingle) {
    const slot = slots[0];
    const isRevealed = revealedCount > 0;
    return (
      <div className="mx-auto flex w-48 justify-center sm:w-56 md:w-64">
        <FlipCard slot={slot} isRevealed={isRevealed} onClick={() => onCardClick(slot)} large />
      </div>
    );
  }

  // 响应式：计算容器大小
  const cardSize = `${spread.cardSizePercent}%`;

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      style={{ aspectRatio: spread.aspectRatio }}
    >
      {slots.map((slot, i) => {
        const pos = spread.positions[i];
        if (!pos || !pos.layout) return null;
        const isRevealed = i < revealedCount;
        return (
          <div
            key={slot.positionIndex}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pos.layout.x}%`,
              top: `${pos.layout.y}%`,
              width: cardSize,
            }}
          >
            <FlipCard
              slot={slot}
              isRevealed={isRevealed}
              onClick={() => isRevealed && onCardClick(slot)}
              positionLabel={`${slot.positionIndex} · ${slot.positionName}`}
              showLabel
            />
          </div>
        );
      })}
    </div>
  );
}

// ===== 可翻转的单牌 =====
function FlipCard({
  slot,
  isRevealed,
  onClick,
  large = false,
  positionLabel,
  showLabel = false,
}: {
  slot: ISpreadCardSlot;
  isRevealed: boolean;
  onClick: () => void;
  large?: boolean;
  positionLabel?: string;
  showLabel?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ perspective: 1000, aspectRatio: '3/4' }}
        onClick={onClick}
        whileHover={isRevealed ? { y: -4 } : { scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* 牌背 */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotateY: isRevealed ? 180 : 0, opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-lg border border-primary/30 bg-gradient-to-br from-card via-primary/20 to-card shadow-md shadow-primary/10">
            <div className="flex size-6 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
              <Sparkles className="size-3 text-primary/60" />
            </div>
          </div>
        </motion.div>

        {/* 牌面 */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ rotateY: isRevealed ? 0 : -180, opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-lg border border-border/50 bg-card/50 shadow-lg shadow-primary/10">
            <CardImageWithFallback
              src={slot.card.imageUrl}
              alt={slot.card.name}
              className="h-full w-full object-cover"
              fallbackText={slot.card.name}
              fullHeight
            />
            {/* 牌位角标（仅小牌） */}
            {!large && showLabel && (
              <div className="absolute left-1 top-1 rounded bg-background/70 px-1.5 py-0.5 text-[9px] font-medium text-foreground backdrop-blur-sm">
                {slot.positionIndex}
              </div>
            )}
          </div>
          {/* 光晕 */}
          {isRevealed && (
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-lg bg-primary/20 blur-md" />
          )}
        </motion.div>
      </motion.div>

      {/* 牌位名称标签 */}
      {showLabel && isRevealed && (
        <div className="text-center">
          <p className="text-[10px] font-medium text-foreground/80">{slot.card.name}</p>
          <p className="text-[9px] text-muted-foreground">{slot.positionName}</p>
        </div>
      )}
    </div>
  );
}

// ===== 单牌牌义卡片（单牌模式用） =====
function SingleCardMeaningCard({ card }: { card: IOshoCard }) {
  return (
    <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-start md:justify-center md:gap-10">
      {/* 牌面 */}
      <motion.div
        className="relative shrink-0"
        initial={{ rotateY: -180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ perspective: 1000 }}
      >
        <div className="overflow-hidden rounded-xl border border-border/50 shadow-2xl shadow-primary/10">
          <CardImageWithFallback
            src={card.imageUrl}
            alt={card.name}
            className="h-auto w-56 md:w-64"
            fallbackText={card.name}
            large
          />
        </div>
        <div className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-primary/20 blur-2xl" />
      </motion.div>

      {/* 牌义 */}
      <motion.div
        className="flex max-w-md flex-1 flex-col"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="mb-2 flex items-center gap-3">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {card.familyLabel}
          </Badge>
          <span className="text-xs text-muted-foreground">No.{card.number}</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">{card.name}</h2>
        <p className="mt-1 text-sm italic text-muted-foreground">{card.nameFr}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {card.keywords.map((kw) => (
            <Badge key={kw} variant="secondary" className="bg-secondary/50 text-xs">
              {kw}
            </Badge>
          ))}
        </div>

        <div className="mt-6 space-y-3 text-sm leading-relaxed text-foreground/80">
          {card.meaning.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ===== 带 fallback 的牌面图片组件 =====
function CardImageWithFallback({
  src,
  alt,
  className,
  fallbackText,
  fullHeight = false,
  large = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackText: string;
  fullHeight?: boolean;
  large?: boolean;
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    const h = large ? 'h-80 md:h-96' : fullHeight ? 'h-full' : 'h-40';
    const w = large ? 'w-56 md:w-64' : fullHeight ? 'w-full' : 'w-28';
    return (
      <div
        className={`flex ${h} ${w} items-center justify-center bg-card/60 text-xs text-muted-foreground`}
      >
        {fallbackText}
      </div>
    );
  }
  return (
    <div className={`relative ${fullHeight ? 'h-full w-full' : ''}`}>
      {/* 骨架占位 */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-br from-card/80 via-primary/10 to-card/80" />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          className,
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
