import { useRef, useState, memo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { SpreadType } from '@/data/spreads';
import { SPREADS } from '@/data/spreads';
import type { ISpreadCardSlot, InterpretationStyle } from '@/lib/history-storage';
import { Image } from '@/components/ui/image';

interface ShareCardProps {
  slots: ISpreadCardSlot[];
  question: string;
  interpretation: string;
  spreadType: SpreadType;
  style: InterpretationStyle;
  date: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default memo(function ShareCard({
  slots,
  question,
  interpretation,
  spreadType,
  style,
  date,
  open,
  onOpenChange,
}: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const spread = SPREADS[spreadType];

  const generateImage = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    try {
      const W = 800;
      const H = 1200;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 背景渐变
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#0f0f1a');
      bg.addColorStop(0.5, '#1a1528');
      bg.addColorStop(1, '#0f0f1a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 装饰光点
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const r = Math.random() * 1.5 + 0.3;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 150, 220, ${Math.random() * 0.4 + 0.1})`;
        ctx.fill();
      }

      // 顶部标题
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(180, 150, 220, 0.9)';
      ctx.font = '300 14px "Noto Sans SC", sans-serif';
      ctx.fillText('奥修禅卡 · 今日抽卡', W / 2, 50);

      ctx.fillStyle = '#fff';
      ctx.font = '600 28px "Noto Sans SC", sans-serif';
      ctx.fillText(spread.name, W / 2, 85);

      // 日期
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '300 12px "Noto Sans SC", sans-serif';
      ctx.fillText(date, W / 2, 108);

      // 牌阵区域（用缩略图展示位置）
      const spreadAreaY = 140;
      const spreadAreaH = 360;
      const spreadAreaW = 600;
      const spreadAreaX = (W - spreadAreaW) / 2;

      // 计算牌尺寸和位置
      const cardW = 60;
      const cardH = 84;
      const cardGap = 12;

      // 根据牌阵类型排列
      const positions: { x: number; y: number; slot: ISpreadCardSlot }[] = [];

      if (spreadType === 'single') {
        positions.push({
          x: W / 2 - cardW / 2,
          y: spreadAreaY + (spreadAreaH - cardH) / 2,
          slot: slots[0],
        });
      } else if (spreadType === 'three-card') {
        const totalW = 3 * cardW + 2 * cardGap;
        const startX = W / 2 - totalW / 2;
        const y = spreadAreaY + (spreadAreaH - cardH) / 2;
        slots.forEach((s, i) => {
          positions.push({ x: startX + i * (cardW + cardGap), y, slot: s });
        });
      } else if (spreadType === 'diamond') {
        const cx = W / 2;
        const cy = spreadAreaY + spreadAreaH / 2;
        const offsets = [
          [0, -cardH - cardGap], // 1 上
          [-cardW - cardGap, 0], // 2 左
          [cardW + cardGap, 0], // 3 右
          [0, cardH + cardGap], // 4 下
          [0, 0], // 5 中
        ];
        slots.forEach((s, i) => {
          positions.push({
            x: cx + offsets[i][0] - cardW / 2,
            y: cy + offsets[i][1] - cardH / 2,
            slot: s,
          });
        });
      } else {
        // 其他牌阵：按网格排列展示
        const cols = Math.min(slots.length, 4);
        const rows = Math.ceil(slots.length / cols);
        const totalW = cols * cardW + (cols - 1) * cardGap;
        const totalH = rows * cardH + (rows - 1) * cardGap;
        const startX = (W - totalW) / 2;
        const startY = spreadAreaY + (spreadAreaH - totalH) / 2;
        slots.forEach((s, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          positions.push({
            x: startX + c * (cardW + cardGap),
            y: startY + r * (cardH + cardGap),
            slot: s,
          });
        });
      }

      // 绘制牌和标签
      for (let i = 0; i < positions.length; i++) {
        const p = positions[i];
        const card = p.slot.card;

        // 牌面底色
        const grad = ctx.createLinearGradient(p.x, p.y, p.x + cardW, p.y + cardH);
        grad.addColorStop(0, '#2a2440');
        grad.addColorStop(1, '#1a1528');
        ctx.fillStyle = grad;
        ctx.strokeStyle = 'rgba(180, 150, 220, 0.3)';
        ctx.lineWidth = 1;
        roundRect(ctx, p.x, p.y, cardW, cardH, 6);
        ctx.fill();
        ctx.stroke();

        // 牌位数字
        ctx.fillStyle = 'rgba(180, 150, 220, 0.7)';
        ctx.font = '500 10px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`No.${p.slot.positionIndex}`, p.x + 6, p.y + 14);

        // 牌名（居中，两行截断）
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = '500 11px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center';
        const nameLines = wrapText(ctx, card.name, cardW - 8, 13);
        const nameStartY = p.y + cardH / 2 - (nameLines.length - 1) * 6;
        nameLines.forEach((line, li) => {
          ctx.fillText(line, p.x + cardW / 2, nameStartY + li * 13);
        });

        // 牌位名称
        ctx.fillStyle = 'rgba(180, 150, 220, 0.6)';
        ctx.font = '300 9px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center';
        const posLines = wrapText(ctx, p.slot.positionName, cardW - 4, 10);
        posLines.forEach((line, li) => {
          ctx.fillText(line, p.x + cardW / 2, p.y + cardH - 8 - (posLines.length - 1 - li) * 10);
        });
      }

      // 问题
      const questionY = spreadAreaY + spreadAreaH + 30;
      ctx.fillStyle = 'rgba(180, 150, 220, 0.7)';
      ctx.font = '400 13px "Noto Sans SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('❓ 问题', 80, questionY);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '400 14px "Noto Sans SC", sans-serif';
      const qText = question.trim() || '（未填写问题，宇宙给出当下启示）';
      const qLines = wrapText(ctx, qText, W - 160, 20);
      qLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 80, questionY + 24 + i * 20);
      });

      // 解读风格标签
      const styleY = questionY + 24 + Math.min(qLines.length, 2) * 20 + 20;
      ctx.fillStyle = 'rgba(180, 150, 220, 0.7)';
      ctx.font = '400 13px "Noto Sans SC", sans-serif';
      ctx.fillText(style === 'direct' ? '🔥 倪师式犀利直断' : '✨ 奥修式哲思启发', 80, styleY);

      // AI解读摘要
      const summaryY = styleY + 28;
      ctx.fillStyle = 'rgba(180, 150, 220, 0.7)';
      ctx.font = '400 13px "Noto Sans SC", sans-serif';
      ctx.fillText('💫 解读摘要', 80, summaryY);

      // 提取纯文本解读（去掉markdown符号）并截取摘要
      const plainText = interpretation
        .replace(/^#+\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/^\s*[-•]\s/gm, '• ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const summaryText = plainText.slice(0, 200) + (plainText.length > 200 ? '...' : '');
      const sumLines = wrapText(ctx, summaryText, W - 160, 20);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '400 13px "Noto Sans SC", sans-serif';
      sumLines.slice(0, 8).forEach((line, i) => {
        ctx.fillText(line, 80, summaryY + 24 + i * 20);
      });

      // 底部水印
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(180, 150, 220, 0.4)';
      ctx.font = '300 11px "Noto Sans SC", sans-serif';
      ctx.fillText('奥修禅卡 · 来自内心的指引', W / 2, H - 30);

      // 转换为图片URL
      const url = canvas.toDataURL('image/png');
      setImgUrl(url);
    } catch (e) {
      toast.error('生成分享图失败');
    } finally {
      setIsGenerating(false);
    }
  }, [slots, question, interpretation, spreadType, style, date, spread.name]);

  // 打开时生成
  useEffect(() => {
    if (open && !imgUrl) {
      generateImage();
    }
  }, [open, imgUrl, generateImage]);

  // 关闭时清理
  const handleClose = useCallback(() => {
    onOpenChange(false);
    setImgUrl('');
  }, [onOpenChange]);

  const handleDownload = useCallback(() => {
    if (!imgUrl) return;
    const link = document.createElement('a');
    link.download = `奥修禅卡-${spread.name}-${date}.png`;
    link.href = imgUrl;
    link.click();
    toast.success('分享图已保存');
  }, [imgUrl, spread.name, date]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-border/40 bg-card/95 p-6 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="size-4 text-primary" />
            生成分享卡
          </DialogTitle>
          <DialogDescription>保存为图片，分享给朋友或自己珍藏</DialogDescription>
        </DialogHeader>

        <div className="relative mt-4 flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-xl border border-border/30 bg-card/50">
          <canvas ref={canvasRef} className="hidden" />

          {isGenerating && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-7 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">正在生成分享卡片...</p>
            </div>
          )}

          {imgUrl && !isGenerating && (
            <Image
              src={imgUrl}
              alt="分享卡片"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            关闭
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!imgUrl || isGenerating}
            className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/70 text-primary-foreground"
          >
            <Download className="size-4" />
            保存图片
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

// ===== 辅助函数 =====
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number,
): string[] {
  const lines: string[] = [];
  let current = '';
  for (const char of text) {
    const test = current + char;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
