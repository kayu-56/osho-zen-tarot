import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 背景渐变层 */}
      <div className="absolute inset-0 -z-10 bg-radial from-primary/20 via-background to-background" />

      {/* 星点装饰 */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary/90 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            奥修禅卡 · 心灵指引
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="bg-gradient-to-r from-foreground via-primary/90 to-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl"
        >
          奥修禅卡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          静心凝神，让牌面映照你的内心。
          <br className="hidden md:block" />
          每一次抽牌，都是与自己深层意识的一次对话。
        </motion.p>
      </div>
    </section>
  );
}
