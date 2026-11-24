import { scopedStorage } from '@lark-apaas/client-toolkit-lite';
import type { IOshoCard } from '@/data/osho_cards';
import type { SpreadType } from '@/data/spreads';

export type InterpretationStyle = 'direct' | 'philosophical';

export interface ISpreadCardSlot {
  /** 牌位序号（从 1 开始） */
  positionIndex: number;
  /** 牌位名称 */
  positionName: string;
  /** 抽到的牌 */
  card: IOshoCard;
}

export interface IDrawRecord {
  id: string;
  timestamp: number;
  question: string;
  /** 牌阵类型 */
  spreadType: SpreadType;
  /** 牌阵名称（快照，便于展示） */
  spreadName: string;
  /** 抽到的牌（单牌时数组长度为 1） */
  cards: ISpreadCardSlot[];
  /** AI 解读风格 */
  style: InterpretationStyle;
  /** AI 解读内容 */
  aiInterpretation: string;
  /** 追问历史（可选，新增字段，旧记录为空数组） */
  followUps?: { question: string; answer: string }[];
}

const STORAGE_KEY = 'osho_zen_draw_history';
const MAX_RECORDS = 20;

export function getHistory(): IDrawRecord[] {
  try {
    const raw = scopedStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // 旧格式迁移：card 单牌对象 → cards 数组 + spreadType + style
    const migrated = parsed.map((r: any) => {
      if (r.cards && Array.isArray(r.cards)) {
        // 确保有 followUps 字段
        return {
          ...r,
          followUps: r.followUps ?? [],
        } as IDrawRecord;
      }
      // 旧格式：只有 card 单牌
      if (r.card && typeof r.card === 'object') {
        return {
          id: r.id,
          timestamp: r.timestamp,
          question: r.question || '',
          spreadType: 'single' as SpreadType,
          spreadName: '单牌抽卡',
          cards: [
            {
              positionIndex: 1,
              positionName: '当下指引',
              card: r.card as IOshoCard,
            },
          ],
          style: 'philosophical' as InterpretationStyle,
          aiInterpretation: r.aiInterpretation || '',
        } satisfies IDrawRecord;
      }
      return null;
    }).filter(Boolean) as IDrawRecord[];
    // 如果有迁移，写回新格式
    if (migrated.length !== parsed.length || migrated.some((r, i) => r !== parsed[i])) {
      scopedStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return [];
  }
}

export function saveRecord(record: IDrawRecord): void {
  try {
    const history = getHistory();
    history.unshift(record);
    const trimmed = history.slice(0, MAX_RECORDS);
    scopedStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // storage 写入失败静默处理
  }
}

export function clearHistory(): void {
  try {
    scopedStorage.removeItem(STORAGE_KEY);
  } catch {
    // 静默处理
  }
}

export function deleteRecord(id: string): void {
  try {
    const history = getHistory();
    const filtered = history.filter((r) => r.id !== id);
    scopedStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // 静默处理
  }
}

/**
 * 更新一条已有记录（用于追加追问回答等），找不到则静默返回
 */
export function updateRecord(id: string, patch: Partial<IDrawRecord>): void {
  try {
    const history = getHistory();
    const idx = history.findIndex((r) => r.id === id);
    if (idx === -1) return;
    history[idx] = { ...history[idx], ...patch };
    scopedStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // 静默处理
  }
}
