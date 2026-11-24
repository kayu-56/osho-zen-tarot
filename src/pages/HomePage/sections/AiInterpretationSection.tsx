import { useState, useCallback, memo, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Sparkles,
  Loader2,
  Wand2,
  Flame,
  RefreshCw,
  AlertCircle,
  RotateCcw,
  Send,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { SpreadType } from '@/data/spreads';
import { SPREADS } from '@/data/spreads';
import type { ISpreadCardSlot, InterpretationStyle } from '@/lib/history-storage';

interface FollowUpItem {
  question: string;
  answer: string;
}

interface AiInterpretationSectionProps {
  slots: ISpreadCardSlot[];
  question: string;
  spreadType: SpreadType;
  style: InterpretationStyle;
  onStyleChange: (style: InterpretationStyle) => void;
  hasResult: boolean;
  interpretation: string;
  isLoading: boolean;
  error: string | null;
  followUps: FollowUpItem[];
  isFollowUpLoading: boolean;
  followUpError: string | null;
  onGenerate: (style: InterpretationStyle, text: string) => void;
  onFollowUp: (question: string, prompt: string) => void;
}

// 固定的二级锚点标题（用于 chip 导航）
const BASE_ANCHORS: { key: string; label: string }[] = [
  { key: '一句话判词', label: '判词' },
  { key: '人性问题', label: '人性' },
  { key: '哲学内核', label: '哲学' },
  { key: '现实行动', label: '行动' },
];

// 单牌模式：中间是「牌面在说什么」
const SINGLE_MID_ANCHOR = { key: '牌面在说什么', label: '牌面' };
// 牌阵模式：中间是「牌位解读」+「牌与牌的张力」
const SPREAD_MID_ANCHORS = [
  { key: '牌位解读', label: '牌位' },
  { key: '牌与牌的张力', label: '张力' },
];
// 风格附加：直断 → 直断；哲思 → 一句静心
const DIRECT_ANCHOR = { key: '直断', label: '直断' };
const PHILO_ANCHOR = { key: '一句静心', label: '静心' };

function buildAnchorList(
  isSingle: boolean,
  style: InterpretationStyle,
  content: string,
): { key: string; label: string }[] {
  const midAnchors = isSingle ? [SINGLE_MID_ANCHOR] : SPREAD_MID_ANCHORS;
  const styleAnchor = style === 'direct' ? DIRECT_ANCHOR : PHILO_ANCHOR;
  const all = [BASE_ANCHORS[0], ...midAnchors, ...BASE_ANCHORS.slice(1), styleAnchor];
  // 只有当内容里实际包含该标题时才显示（兼容旧历史记录）
  return all.filter((a) => content.includes(`## ${a.key}`));
}

function slugify(text: string): string {
  // 中文直接当 id，去掉特殊字符
  return text.replace(/\s+/g, '-').replace(/[.#/\\?[\]<>"]/g, '');
}

export default memo(function AiInterpretationSection({
  slots,
  question,
  spreadType,
  style,
  onStyleChange,
  hasResult,
  interpretation,
  isLoading,
  error,
  followUps,
  isFollowUpLoading,
  followUpError,
  onGenerate,
  onFollowUp,
}: AiInterpretationSectionProps) {
  const spread = SPREADS[spreadType];
  const isSingle = spreadType === 'single';
  const hasTriggeredRef = useRef(false);
  const prevStyleRef = useRef<InterpretationStyle>(style);

  const [followUpInput, setFollowUpInput] = useState('');
  const followUpInputRef = useRef<HTMLTextAreaElement>(null);

  // 构建主解读 prompt（四维结构）
  const buildPrompt = useCallback(() => {
    const q = question.trim() || '求问者当下最需要知道的启示';
    const hasQuestion = question.trim().length > 0;

    const styleDesc =
      style === 'direct'
        ? '【倪师式犀利直断风格】请直接、犀利、一针见血地给出明确判断和行动指引，不绕弯子、不打太极、不说废话。风格像一位经验丰富的人生导师。'
        : '【奥修式哲思启发风格】请以禅意、哲学性的方式给出启发，引导求问者内观和觉察，不下绝对判断，温柔而有深度。风格像一位充满智慧的禅师。';

    const questionNote = hasQuestion
      ? `解读必须紧紧扣住求问者的问题，所有分析和建议都要回到他的具体处境。`
      : `求问者未填写具体问题，请按「当下最需要看见的」来解读，避免假装知道具体处境。`;

    const structureReq =
      style === 'direct'
        ? `最后必须有「## 直断」段落：给明确结论与方向，不打太极。`
        : `最后必须有「## 一句静心」段落：一句可反复默念的短句，简短有力，有禅意。`;

    if (isSingle) {
      const card = slots[0].card;
      return `${styleDesc}\n\n请为抽到的奥修禅卡结合问题给出解读。\n\n【所抽牌名】：${card.name}（${card.nameFr}）\n【所属家族】：${card.familyLabel}\n【关键词】：${card.keywords.join('、')}\n【牌义】：${card.meaning}\n\n【求问者的问题/情境】：${q}\n${questionNote}\n\n请严格用 Markdown 格式输出，二级标题顺序固定为以下六个，不要增减、不要改标题文字：\n\n1. ## 一句话判词（不超过 40 字）\n2. ## 牌面在说什么（用你自己的话讲这张牌的意象和能量，不要照搬牌义原文，2-3 段）\n3. ## 人性问题（点出求问者真正卡住的人性层面：恐惧、执念、自欺、欲望等，要具体到他的问题，不空泛）\n4. ## 哲学内核（这张牌背后的哲学洞见，联系奥修禅的思想方向：当下、觉察、放下自我等。如需提及奥修只能概括其思想方向，禁止编造逐字引语和出处）\n5. ## 现实行动（分「今天」「这一周」两条，每条必须是可直接执行的具体动作，不是空泛道理）\n6. ${style === 'direct' ? '## 直断' : '## 一句静心'}\n\n${structureReq}\n\n注意：牌义只是参考，你要基于牌义但用自己的语言表达，不要照搬原文。`;
    }

    // 牌阵模式
    const cardsInfo = slots
      .map(
        (s, i) =>
          `第${i + 1}张牌【牌位：${s.positionName}】——${s.card.name}（${s.card.familyLabel}，关键词：${s.card.keywords.join('、')}）。牌义：${s.card.meaning}`,
      )
      .join('\n\n');
    return `${styleDesc}\n\n请对以下奥修禅卡牌阵进行综合解读。\n\n【牌阵名称】：${spread.name}\n【牌阵简介】：${spread.description}\n【牌阵共】${spread.cardCount}张牌，各牌位含义如下：\n${spread.positions.map((p, i) => `  ${i + 1}. ${p.name}：${p.meaning}`).join('\n')}\n\n【实际抽到的牌】：\n${cardsInfo}\n\n【求问者的问题/情境】：${q}\n${questionNote}\n\n请严格用 Markdown 格式输出，二级标题顺序固定为以下七个，不要增减、不要改标题文字：\n\n1. ## 一句话判词（不超过 40 字，概括整个牌阵的能量）\n2. ## 牌位解读（按牌位顺序逐张解读，每张 2-3 句，结合牌位含义与问题）\n3. ## 牌与牌的张力（分析牌与牌之间的关联、冲突、呼应与流动）\n4. ## 人性问题（点出求问者真正卡住的人性层面：恐惧、执念、自欺、欲望等，要具体到他的问题，不空泛）\n5. ## 哲学内核（这组牌背后的哲学洞见，联系奥修禅的思想方向。如需提及奥修只能概括其思想方向，禁止编造逐字引语和出处）\n6. ## 现实行动（分「今天」「这一周」两条，每条必须是可直接执行的具体动作）\n7. ${style === 'direct' ? '## 直断' : '## 一句静心'}\n\n${structureReq}\n\n解读要将牌义、牌位、问题三者紧密结合，不能泛泛而谈。`;
  }, [isSingle, slots, question, style, spread]);

  // 构建追问 prompt
  const buildFollowUpPrompt = useCallback(
    (followQuestion: string, history: FollowUpItem[]) => {
      const q = question.trim() || '求问者当下最需要知道的启示';
      const styleLabel = style === 'direct' ? '倪师式犀利直断' : '奥修式哲思启发';

      let cardsBlock: string;
      if (isSingle) {
        const card = slots[0].card;
        cardsBlock = `【所抽牌】：${card.name}（${card.nameFr}）\n【家族】：${card.familyLabel}\n【关键词】：${card.keywords.join('、')}\n【牌义】：${card.meaning}`;
      } else {
        cardsBlock = `【牌阵】：${spread.name}（${spread.cardCount}张）\n【各牌】：\n${slots.map((s, i) => `  ${i + 1}. ${s.positionName} — ${s.card.name}，牌义：${s.card.meaning}`).join('\n')}`;
      }

      const followHistory =
        history.length > 0
          ? `【此前追问历史】：\n${history.map((f, i) => `  追问${i + 1}：${f.question}\n  回答${i + 1}：${f.answer}`).join('\n\n')}`
          : '';

      return `【风格】：保持${styleLabel}风格\n\n${cardsBlock}\n\n【原问题】：${q}\n\n【已有完整解读】：\n${interpretation}\n\n${followHistory}${followHistory ? '\n\n' : ''}【本次追问】：${followQuestion}\n\n请基于以上全部信息，针对本次追问给出回答。要求：\n- 保持${styleLabel}风格\n- 不脱离牌义与原问题\n- 回答 200-400 字\n- 用 Markdown 格式，段落清晰\n- 直接回答问题，不要重复已有的解读内容`;
    },
    [isSingle, slots, question, style, spread, interpretation],
  );

  const handleGenerate = useCallback(() => {
    if (isLoading) return;
    const prompt = buildPrompt();
    onGenerate(style, prompt);
  }, [isLoading, buildPrompt, style, onGenerate]);

  const handleFollowUpSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const q = followUpInput.trim();
      if (!q || isFollowUpLoading) return;
      const prompt = buildFollowUpPrompt(q, followUps);
      setFollowUpInput('');
      onFollowUp(q, prompt);
    },
    [followUpInput, isFollowUpLoading, buildFollowUpPrompt, followUps, onFollowUp],
  );

  const handleFollowUpKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleFollowUpSubmit(e as unknown as FormEvent);
      }
    },
    [handleFollowUpSubmit],
  );

  // 翻牌后自动触发解读（首次入场且无结果时）
  useEffect(() => {
    if (slots.length === 0) {
      hasTriggeredRef.current = false;
      return;
    }
    // 有错误时不自动触发，让用户手动点击重试（避免额度耗尽等场景反复弹错）
    if (!hasResult && !isLoading && !error && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      // 稍等 600ms，让翻牌动画先完成，营造仪式感
      const timer = setTimeout(() => {
        handleGenerate();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [slots.length, hasResult, isLoading, error, handleGenerate]);

  // 风格切换：已有结果时自动重新生成；有错误时让用户手动点击
  useEffect(() => {
    if (prevStyleRef.current !== style && hasResult && !isLoading && !error) {
      prevStyleRef.current = style;
      handleGenerate();
    } else {
      prevStyleRef.current = style;
    }
  }, [style, hasResult, isLoading, error, handleGenerate]);

  // 锚点列表（只有内容中实际包含的标题才显示）
  const visibleAnchors = hasResult ? buildAnchorList(isSingle, style, interpretation) : [];

  const handleAnchorClick = useCallback((key: string) => {
    const id = slugify(key);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // 无牌时不渲染
  if (slots.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Card className="border-primary/20 bg-card/40 backdrop-blur-sm shadow-xl shadow-primary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wand2 className="size-5 text-primary" />
                  AI 解读
                </CardTitle>
                {hasResult && !isLoading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerate}
                    className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="size-3" />
                    重新解读
                  </Button>
                )}
              </div>

              {/* 风格切换 */}
              <div className="mt-3 flex gap-2">
                <StyleButton
                  active={style === 'direct'}
                  onClick={() => onStyleChange('direct')}
                  icon={<Flame className="size-3.5" />}
                  label="倪师式犀利直断"
                  sub="一针见血"
                  disabled={isLoading}
                />
                <StyleButton
                  active={style === 'philosophical'}
                  onClick={() => onStyleChange('philosophical')}
                  icon={<Sparkles className="size-3.5" />}
                  label="奥修式哲思启发"
                  sub="禅意内观"
                  disabled={isLoading}
                />
              </div>

              {/* 锚点 chip 导航 */}
              {visibleAnchors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {visibleAnchors.map((a) => (
                    <button
                      key={a.key}
                      onClick={() => handleAnchorClick(a.key)}
                      className="rounded-full border border-border/40 bg-background/40 px-2.5 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 错误状态（主解读失败） */}
              {error && !isLoading && !hasResult && (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="size-6 text-destructive" />
                  </div>
                  <p className="mb-1 text-sm font-medium text-destructive">解读生成失败</p>
                  <p className="mb-4 text-xs text-muted-foreground">{error}</p>
                  <Button
                    onClick={handleGenerate}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <RotateCcw className="size-3.5" />
                    重新尝试
                  </Button>
                </div>
              )}

              {/* 未生成：生成按钮 */}
              {!hasResult && !isLoading && !error && (
                <div className="py-8 text-center">
                  <p className="mb-4 text-sm text-muted-foreground">
                    {isSingle
                      ? '让 AI 结合牌义与你的问题，给出专属解读'
                      : `让 AI 结合${spread.name}的全部 ${spread.cardCount} 张牌，给出综合解读`}
                  </p>
                  <Button
                    onClick={handleGenerate}
                    className="group gap-2 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Sparkles className="size-4 transition-transform group-hover:rotate-180" />
                    生成{style === 'direct' ? '犀利直断' : '哲思启发'}解读
                  </Button>
                  <p className="mt-3 text-[11px] text-muted-foreground/60">
                    AI 实时生成，非预置文案，每次解读都不一样
                  </p>
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="size-7 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {style === 'direct' ? '倪师正在直断...' : '禅师正在沉思...'}
                    </p>
                  </div>
                </div>
              )}

              {/* 主解读结果 */}
              {hasResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="interpretation-content prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/85 prose-strong:text-foreground prose-li:text-foreground/80 prose-a:text-primary"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children, ...props }) => {
                        const text = String(children);
                        const id = slugify(text);
                        return (
                          <h2
                            id={id}
                            {...props}
                            className="relative mt-8 mb-4 pl-4 font-['Noto_Serif_SC'] text-lg font-semibold text-foreground first:mt-0"
                            style={{ paddingLeft: 0 }}
                          >
                            <span
                              className="absolute -left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"
                              aria-hidden
                            />
                            <span className="pl-3">{children}</span>
                          </h2>
                        );
                      },
                    }}
                  >
                    {interpretation}
                  </ReactMarkdown>
                  {isLoading && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-middle" />
                  )}
                </motion.div>
              )}

              {/* 继续追问区（有结果才显示） */}
              {hasResult && (
                <div className="border-t border-border/30 pt-5">
                  {/* 追问历史 */}
                  {followUps.length > 0 && (
                    <div className="mb-4 space-y-3">
                      <AnimatePresence initial={false}>
                        {followUps.map((f, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2"
                          >
                            {/* 问：求问者气泡 */}
                            <div className="flex justify-end">
                              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary/20 px-3 py-2 text-sm text-foreground/90">
                                {f.question}
                              </div>
                            </div>
                            {/* 答：解读正文样式 */}
                            <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/85 prose-li:text-foreground/80">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {f.answer}
                              </ReactMarkdown>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* 追问加载中 */}
                      {isFollowUpLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Loader2 className="size-3.5 animate-spin text-primary" />
                          正在回应追问...
                        </motion.div>
                      )}

                      {/* 追问错误 */}
                      {followUpError && !isFollowUpLoading && (
                        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                          <AlertCircle className="size-3.5 shrink-0" />
                          <span className="flex-1">{followUpError}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // 重新发送最后一个追问（需调用上一次的 prompt）
                              // 这里由父组件处理更合适，暂时只给个提示
                              const lastQ = followUps[followUps.length - 1]?.question;
                              if (lastQ) {
                                const prompt = buildFollowUpPrompt(lastQ, followUps.slice(0, -1));
                                onFollowUp(lastQ, prompt);
                              }
                            }}
                            className="h-6 gap-1 px-2 text-[11px] text-destructive hover:bg-destructive/20 hover:text-destructive"
                          >
                            <RotateCcw className="size-3" />
                            重试
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 追问输入框 */}
                  <form onSubmit={handleFollowUpSubmit} className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MessageCircle className="size-3.5 text-primary" />
                      继续追问
                    </div>
                    <div className="relative">
                      <Textarea
                        ref={followUpInputRef}
                        value={followUpInput}
                        onChange={(e) => setFollowUpInput(e.target.value.slice(0, 200))}
                        onKeyDown={handleFollowUpKeyDown}
                        placeholder="就这次解读继续问，例如：我具体该先做哪一步？"
                        className="min-h-[64px] resize-none bg-card/50 pr-16 text-sm backdrop-blur-sm transition-colors placeholder:text-muted-foreground/60 focus:bg-card/80"
                        maxLength={200}
                        disabled={isLoading || isFollowUpLoading}
                      />
                      <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground/60">
                          {followUpInput.length}/200
                        </span>
                        <Button
                          type="submit"
                          size="icon"
                          variant="secondary"
                          disabled={!followUpInput.trim() || isLoading || isFollowUpLoading}
                          className="h-7 w-7"
                        >
                          <Send className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground/60">
                      Enter 发送 · Shift+Enter 换行
                    </p>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
});

function StyleButton({
  active,
  onClick,
  icon,
  label,
  sub,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-left transition-all',
        active
          ? 'border-primary/50 bg-primary/10 text-foreground shadow-sm shadow-primary/10'
          : 'border-border/30 bg-card/30 text-muted-foreground hover:border-border/60 hover:bg-card/50 hover:text-foreground/80',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <span className={active ? 'text-primary' : 'text-muted-foreground'}>{icon}</span>
      <div className="min-w-0">
        <div className="text-xs font-medium">{label}</div>
        <div className="text-[10px] opacity-70">{sub}</div>
      </div>
    </button>
  );
}
