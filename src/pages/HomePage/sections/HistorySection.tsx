import { useState, memo, useCallback, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2, ChevronRight, Layers, Sparkles, Flame, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  getHistory,
  deleteRecord,
  type IDrawRecord,
  type InterpretationStyle,
} from '@/lib/history-storage';

interface HistorySectionProps {
  records: IDrawRecord[];
  onRecordClick: (record: IDrawRecord) => void;
  onDelete?: () => void;
}

export default memo(function HistorySection({
  records,
  onRecordClick,
  onDelete,
}: HistorySectionProps) {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleDelete = useCallback(
    (id: string) => {
      deleteRecord(id);
      onDelete?.();
      setDeleteTarget(null);
    },
    [onDelete],
  );

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <History className="size-5 text-primary/80" />
                历史记录
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                你的每一次抽卡都会保存在本地，最多 {records.length >= 20 ? '20' : '50'} 条
              </p>
            </CardHeader>
            <CardContent>
              {records.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-secondary/40">
                    <History className="size-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">还没有抽卡记录</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    每次抽卡的结果和解读都会自动保存
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {records.map((record, i) => (
                      <HistoryItem
                        key={record.id}
                        record={record}
                        index={i}
                        onClick={() => onRecordClick(record)}
                        onDelete={() => setDeleteTarget(record.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 删除确认弹窗 */}
        <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>删除记录</AlertDialogTitle>
              <AlertDialogDescription>
                确定要删除这条抽卡记录吗？删除后无法恢复。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteTarget && handleDelete(deleteTarget)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                删除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
});

function HistoryItem({
  record,
  index,
  onClick,
  onDelete,
}: {
  record: IDrawRecord;
  index: number;
  onClick: () => void;
  onDelete: () => void;
}) {
  const cards = record.cards && Array.isArray(record.cards) ? record.cards : [];
  const isSingle = cards.length <= 1;
  const styleIcon = record.style === 'direct' ? Flame : Lightbulb;
  const styleLabel = record.style === 'direct' ? '犀利直断' : '哲思启发';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group relative rounded-xl border border-border/20 bg-card/40 p-3 transition-all hover:border-primary/30 hover:bg-card/60"
    >
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 text-left"
      >
        {/* 牌数量图标 */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {isSingle ? (
            <Sparkles className="size-4" />
          ) : (
            <div className="flex items-center gap-0.5 text-xs font-medium">
              <Layers className="size-4" />
              {cards.length}
            </div>
          )}
        </div>

        {/* 内容 */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-foreground">
              {record.spreadName}
            </span>
            {cards.slice(0, 3).map((c) => (
              <Badge key={c.positionIndex} variant="outline" className="shrink-0 text-[10px]">
                {c.card.name}
              </Badge>
            ))}
            {cards.length > 3 && (
              <Badge variant="outline" className="shrink-0 text-[10px]">
                +{cards.length - 3}
              </Badge>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {record.question || '（未填写问题）'}
          </p>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground/70">
            <span className="flex items-center gap-1">
              {createElement(styleIcon, { className: 'size-3' })}
              {styleLabel}
            </span>
            <span>·</span>
            <span>{formatDate(record.timestamp)}</span>
          </div>
        </div>

        {/* 箭头 */}
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
      </button>

      {/* 删除按钮 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-md text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        aria-label="删除记录"
      >
        <Trash2 className="size-3.5" />
      </button>
    </motion.div>
  );
}

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${m}-${day} ${h}:${min}`;
}
