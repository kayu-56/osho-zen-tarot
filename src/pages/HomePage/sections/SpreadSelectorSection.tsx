import { memo } from 'react';
import { motion } from 'framer-motion';
import { Layers, Diamond, Bird, Key, Split, Cross, Sparkles } from 'lucide-react';
import { SPREAD_LIST, type SpreadType, type ISpreadDefinition } from '@/data/spreads';

interface SpreadSelectorSectionProps {
  selectedSpread: SpreadType;
  onSelectSpread: (type: SpreadType) => void;
}

const ICONS: Record<SpreadType, typeof Sparkles> = {
  single: Sparkles,
  'three-card': Layers,
  'celtic-cross': Cross,
  diamond: Diamond,
  'flying-bird': Bird,
  key: Key,
  mirror: Split,
};

export default memo(function SpreadSelectorSection({
  selectedSpread,
  onSelectSpread,
}: SpreadSelectorSectionProps) {
  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-4 text-center">
          <h3 className="text-sm font-medium text-foreground/70">选择牌阵</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            不同牌阵适合不同深度的问题，从单牌到十二牌镜子阵，随你探索
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {SPREAD_LIST.map((spread: ISpreadDefinition, i) => {
            const Icon = ICONS[spread.type];
            const isActive = selectedSpread === spread.type;
            return (
              <motion.button
                key={spread.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectSpread(spread.type)}
                className={
                  'relative flex flex-col items-center gap-2 rounded-xl border p-4 text-left transition-all ' +
                  (isActive
                    ? 'border-primary/50 bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-border/30 bg-card/30 hover:border-border/60 hover:bg-card/50')
                }
              >
                <div
                  className={
                    'flex size-9 items-center justify-center rounded-lg ' +
                    (isActive ? 'bg-primary/20 text-primary' : 'bg-secondary/40 text-muted-foreground')
                  }
                >
                  <Icon className="size-5" />
                </div>
                <div className="w-full">
                  <p
                    className={
                      'text-sm font-medium ' + (isActive ? 'text-foreground' : 'text-foreground/80')
                    }
                  >
                    {spread.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {spread.cardCount} 张牌
                  </p>
                </div>
                {isActive && (
                  <div className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* 当前牌阵说明 */}
        <motion.div
          key={selectedSpread}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mt-4 max-w-2xl rounded-xl border border-border/20 bg-card/20 px-4 py-3 text-center"
        >
          <p className="text-xs text-foreground/70">
            {SPREAD_LIST.find((s) => s.type === selectedSpread)?.description}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            适合：{SPREAD_LIST.find((s) => s.type === selectedSpread)?.scenarios.join(' · ')}
          </p>
        </motion.div>
      </div>
    </section>
  );
});
