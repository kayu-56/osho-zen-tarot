import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { capabilityClient, logger } from '@lark-apaas/client-toolkit-lite';

import HeroSection from './sections/HeroSection';
import SpreadSelectorSection from './sections/SpreadSelectorSection';
import DrawPanelSection from './sections/DrawPanelSection';
import AiInterpretationSection from './sections/AiInterpretationSection';
import LibrarySection from './sections/LibrarySection';
import HistorySection from './sections/HistorySection';
import ShareCardSection from './sections/ShareCardSection';

import { MOCK_OSHO_CARDS, type IOshoCard } from '@/data/osho_cards';
import { SPREADS, type SpreadType } from '@/data/spreads';
import {
  getHistory,
  saveRecord,
  updateRecord,
  type IDrawRecord,
  type ISpreadCardSlot,
  type InterpretationStyle,
} from '@/lib/history-storage';

interface FollowUpItem {
  question: string;
  answer: string;
}

const PLUGIN_ID = 'osho_zen_interpretation_1';

export default function HomePage() {
  // 牌阵类型
  const [spreadType, setSpreadType] = useState<SpreadType>('single');

  // 问题
  const [question, setQuestion] = useState('');

  // 抽卡状态
  const [cards, setCards] = useState<ISpreadCardSlot[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  // AI 解读
  const [style, setStyle] = useState<InterpretationStyle>('philosophical');
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretError, setInterpretError] = useState<string | null>(null);

  // 追问
  const [followUps, setFollowUps] = useState<FollowUpItem[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);
  const [followUpError, setFollowUpError] = useState<string | null>(null);

  // 历史记录
  const [history, setHistory] = useState<IDrawRecord[]>([]);

  // 分享弹窗
  const [shareOpen, setShareOpen] = useState(false);

  // 当前记录 ID（用于保存时判断是否已保存）
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null);

  // 初始化历史
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // 追踪最新 spreadType（用于洗牌中校验是否被切换）
  const spreadTypeRef = useRef(spreadType);
  useEffect(() => {
    spreadTypeRef.current = spreadType;
  }, [spreadType]);

  // 逐张翻牌的定时器 id 列表（用于重置时清理）
  const revealTimeoutsRef = useRef<number[]>([]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      revealTimeoutsRef.current.forEach((id) => clearTimeout(id));
      revealTimeoutsRef.current = [];
    };
  }, []);

  // 切换牌阵时清空当前抽牌结果，避免牌数与牌位不匹配
  useEffect(() => {
    setCards([]);
    setRevealedCount(0);
    setInterpretation('');
    setInterpretError(null);
    setFollowUps([]);
    setIsFollowUpLoading(false);
    setFollowUpError(null);
    setCurrentRecordId(null);
  }, [spreadType]);

  // Fisher-Yates 洗牌，抽取 n 张不同的牌
  const drawCards = useCallback(
    (n: number): ISpreadCardSlot[] => {
      const shuffled = [...MOCK_OSHO_CARDS];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const spread = SPREADS[spreadType];
      const count = Math.min(n, spread.positions.length);
      return shuffled.slice(0, count).map((card, i) => ({
        positionIndex: i + 1,
        positionName: spread.positions[i]?.name || `牌位${i + 1}`,
        card,
      }));
    },
    [spreadType],
  );

  // 抽牌
  const handleDraw = useCallback(async () => {
    if (isDrawing) return;

    // 先清理上一轮可能残留的翻牌定时器
    revealTimeoutsRef.current.forEach((id) => clearTimeout(id));
    revealTimeoutsRef.current = [];

    setIsDrawing(true);
    setCards([]);
    setRevealedCount(0);
    setInterpretation('');
    setCurrentRecordId(null);

    try {
      // 洗牌动画 1.5s
      await new Promise((r) => setTimeout(r, 1500));

      // 如果中途牌阵被用户切换了，放弃本次抽卡结果
      if (spreadTypeRef.current !== spreadType) return;

      const spread = SPREADS[spreadType];
      const drawn = drawCards(spread.cardCount);

      if (drawn.length === 0) {
        toast.error('牌库数据异常，请刷新页面重试');
        return;
      }

      setCards(drawn);

      // 单牌模式自动翻开
      if (spread.cardCount === 1) {
        setRevealedCount(1);
      } else {
        // 多牌模式：逐张翻开
        const timeouts: number[] = [];
        for (let i = 0; i < drawn.length; i++) {
          const id = window.setTimeout(() => {
            setRevealedCount((prev) => Math.min(prev + 1, drawn.length));
          }, 300 + i * 350);
          timeouts.push(id);
        }
        revealTimeoutsRef.current = timeouts;
      }
    } catch (e) {
      logger.error('抽卡失败:', String(e));
      toast.error('抽卡失败，请重试');
      setCards([]);
      setRevealedCount(0);
    } finally {
      setIsDrawing(false);
    }
  }, [isDrawing, spreadType, drawCards]);

  // 重置
  const handleReset = useCallback(() => {
    // 清理逐张翻牌的定时器，防止重置后回调继续触发
    revealTimeoutsRef.current.forEach((id) => clearTimeout(id));
    revealTimeoutsRef.current = [];
    setCards([]);
    setRevealedCount(0);
    setInterpretation('');
    setInterpretError(null);
    setFollowUps([]);
    setIsFollowUpLoading(false);
    setFollowUpError(null);
    setCurrentRecordId(null);
  }, []);

  // 全部翻开
  const handleRevealAll = useCallback(() => {
    setRevealedCount(cards.length);
  }, [cards.length]);

  // 生成 AI 解读
  const handleGenerate = useCallback(
    async (targetStyle: InterpretationStyle, prompt: string) => {
      setIsInterpreting(true);
      setStyle(targetStyle);
      setInterpretation('');
      setInterpretError(null);
      setFollowUps([]);
      setIsFollowUpLoading(false);
      setFollowUpError(null);

      try {
        const stream = capabilityClient
          .load(PLUGIN_ID)
          .callStream('textGenerate', { prompt });
        let full = '';
        for await (const chunk of stream) {
          const c = chunk as { content?: string };
          if (c.content) {
            full += c.content;
            setInterpretation(full);
          }
        }

        // 解读完成后自动保存记录
        const record: IDrawRecord = {
          id: `draw_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          timestamp: Date.now(),
          question,
          spreadType,
          spreadName: SPREADS[spreadType].name,
          cards,
          style: targetStyle,
          aiInterpretation: full,
          followUps: [],
        };
        saveRecord(record);
        setCurrentRecordId(record.id);
        setHistory(getHistory());
        toast.success('解读完成，已保存到历史记录');
      } catch (e) {
        const errMsg = String(e);
        logger.error('AI 解读失败:', errMsg);

        // 按错误类型给出用户友好的提示
        let userMsg = '解读生成失败，请稍后重试';
        let isQuotaError = false;
        if (errMsg.includes('RateLimitError') || errMsg.includes('额度') || errMsg.includes('quota')) {
          userMsg = '今日 AI 解读额度已用完，请明天再来';
          isQuotaError = true;
        } else if (errMsg.includes('network') || errMsg.includes('Network') || errMsg.includes('超时')) {
          userMsg = '网络连接不稳定，请检查网络后重试';
        }

        setInterpretError(userMsg);
        // 额度耗尽只在解读区显示错误卡片，不弹 toast 反复打扰
        if (!isQuotaError) {
          toast.error(userMsg);
        }
      } finally {
        setIsInterpreting(false);
      }
    },
    [question, spreadType, cards],
  );

  // 追问回答
  const handleFollowUp = useCallback(
    async (questionText: string, prompt: string) => {
      if (isFollowUpLoading) return;
      setIsFollowUpLoading(true);
      setFollowUpError(null);

      try {
        const stream = capabilityClient
          .load(PLUGIN_ID)
          .callStream('textGenerate', { prompt });
        let full = '';
        for await (const chunk of stream) {
          const c = chunk as { content?: string };
          if (c.content) {
            full += c.content;
            // 实时更新最后一条追问的回答
            setFollowUps((prev) => {
              const next = [...prev];
              // 如果最后一条的问题就是当前问题，更新回答；否则追加
              if (next.length > 0 && next[next.length - 1].question === questionText) {
                next[next.length - 1] = { ...next[next.length - 1], answer: full };
              } else {
                next.push({ question: questionText, answer: full });
              }
              return next;
            });
          }
        }

        // 回答完成后更新记录（已有记录则更新，没有则先保存）
        const finalAnswer = full;
        setFollowUps((prev) => {
          const next = [...prev];
          if (next.length > 0 && next[next.length - 1].question === questionText) {
            next[next.length - 1] = { ...next[next.length - 1], answer: finalAnswer };
          } else {
            next.push({ question: questionText, answer: finalAnswer });
          }

          // 写回历史记录
          if (currentRecordId) {
            updateRecord(currentRecordId, { followUps: next });
            setHistory(getHistory());
          } else if (interpretation.length > 0) {
            // 尚未保存的记录，先保存主解读 + 追问
            const record: IDrawRecord = {
              id: `draw_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
              timestamp: Date.now(),
              question,
              spreadType,
              spreadName: SPREADS[spreadType].name,
              cards,
              style,
              aiInterpretation: interpretation,
              followUps: next,
            };
            saveRecord(record);
            setCurrentRecordId(record.id);
            setHistory(getHistory());
          }

          return next;
        });
      } catch (e) {
        const errMsg = String(e);
        logger.error('AI 追问失败:', errMsg);

        let userMsg = '追问失败，请稍后重试';
        if (errMsg.includes('RateLimitError') || errMsg.includes('额度') || errMsg.includes('quota')) {
          userMsg = '今日 AI 解读额度已用完，请明天再来';
        } else if (errMsg.includes('network') || errMsg.includes('Network') || errMsg.includes('超时')) {
          userMsg = '网络连接不稳定，请检查网络后重试';
        }

        setFollowUpError(userMsg);
        // 额度耗尽不弹 toast
        if (!errMsg.includes('RateLimitError') && !errMsg.includes('额度') && !errMsg.includes('quota')) {
          toast.error(userMsg);
        }
      } finally {
        setIsFollowUpLoading(false);
      }
    },
    [isFollowUpLoading, currentRecordId, interpretation, question, spreadType, cards, style],
  );

  // 点击历史记录，载入该次抽卡
  const handleRecordClick = useCallback((record: IDrawRecord) => {
    setSpreadType(record.spreadType);
    setQuestion(record.question);
    setCards(record.cards);
    setRevealedCount(record.cards.length);
    setStyle(record.style);
    setInterpretation(record.aiInterpretation);
    setInterpretError(null);
    setFollowUps(record.followUps ?? []);
    setIsFollowUpLoading(false);
    setFollowUpError(null);
    setCurrentRecordId(record.id);

    // 滚动到抽卡区
    setTimeout(() => {
      document.getElementById('draw-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  // 从牌库选一张牌直接展示（单牌模式，不走随机洗牌）
  const handlePickCard = useCallback(
    (card: IOshoCard) => {
      // 清理上一轮状态
      revealTimeoutsRef.current.forEach((id) => clearTimeout(id));
      revealTimeoutsRef.current = [];

      setSpreadType('single');
      // 等 spreadType effect 清空后再设置新牌
      setTimeout(() => {
        const slot: ISpreadCardSlot = {
          positionIndex: 1,
          positionName: '当下指引',
          card,
        };
        setCards([slot]);
        setRevealedCount(1);
        setInterpretation('');
        setInterpretError(null);
        setFollowUps([]);
        setIsFollowUpLoading(false);
        setFollowUpError(null);
        setCurrentRecordId(null);

        // 滚动到抽卡区
        setTimeout(() => {
          document.getElementById('draw-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }, 50);
    },
    [],
  );
  const handleHistoryDelete = useCallback(() => {
    setHistory(getHistory());
  }, []);

  // 检查是否有完整结果可分享
  const hasFullResult = cards.length > 0 && interpretation.length > 0 && !isInterpreting;
  const allRevealed = revealedCount >= cards.length && cards.length > 0;

  // 分享卡片的日期文本
  const shareDate = currentRecordId
    ? formatFullDate(
        history.find((r) => r.id === currentRecordId)?.timestamp ?? Date.now(),
      )
    : formatFullDate(Date.now());

  return (
    <div className="min-h-screen bg-background">
      {/* 背景装饰 */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <main className="space-y-4 md:space-y-6">
        <HeroSection />

        <div id="draw-section">
          <SpreadSelectorSection
            selectedSpread={spreadType}
            onSelectSpread={setSpreadType}
          />

          <DrawPanelSection
            question={question}
            onQuestionChange={setQuestion}
            spreadType={spreadType}
            cards={cards}
            isDrawing={isDrawing}
            revealedCount={revealedCount}
            onDraw={handleDraw}
            onReset={handleReset}
            onRevealAll={handleRevealAll}
          />
        </div>

        {/* AI 解读区 */}
        {allRevealed && (
          <AiInterpretationSection
            slots={cards}
            question={question}
            spreadType={spreadType}
            style={style}
            onStyleChange={setStyle}
            hasResult={interpretation.length > 0}
            interpretation={interpretation}
            isLoading={isInterpreting}
            error={interpretError}
            followUps={followUps}
            isFollowUpLoading={isFollowUpLoading}
            followUpError={followUpError}
            onGenerate={handleGenerate}
            onFollowUp={handleFollowUp}
          />
        )}

        {/* 分享按钮（有完整结果时显示） */}
        {hasFullResult && (
          <section className="w-full">
            <div className="mx-auto max-w-3xl px-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center"
              >
                <Button
                  onClick={() => setShareOpen(true)}
                  variant="outline"
                  className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Share2 className="size-4" />
                  生成分享卡片
                </Button>
              </motion.div>
            </div>
          </section>
        )}

        <LibrarySection onPickCard={handlePickCard} />

        <HistorySection
          records={history}
          onRecordClick={handleRecordClick}
          onDelete={handleHistoryDelete}
        />

        {/* 页脚 */}
        <footer className="w-full py-8">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-xs text-muted-foreground/60">
              奥修禅卡共 79 张 · 牌义仅供参考 · 答案永远在你心里
            </p>
          </div>
        </footer>
      </main>

      {/* 分享卡片弹窗 */}
      <ShareCardSection
        slots={cards}
        question={question}
        interpretation={interpretation}
        spreadType={spreadType}
        style={style}
        date={shareDate}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />
    </div>
  );
}

function formatFullDate(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}年${m}月${day}日`;
}
