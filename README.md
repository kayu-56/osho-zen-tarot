# 奥修禅卡 · 互动抽卡

一个中文界面的奥修禅卡（Osho Zen Tarot）互动抽卡 Web 应用：输入问题 → 选牌阵 → 洗牌翻牌 → 阅读中文牌义 → 获取 AI 禅意解读，支持追问、历史记录与分享卡生成。

## 功能

- **7 种牌阵**：单牌、三牌阵、凯尔特十字、钻石、飞鸟、钥匙、镜像（`src/data/spreads.ts`）
- **79 张完整牌库**：大阿卡纳 + 火 / 水 / 云 / 彩虹四大家族，含中法双语牌名、关键词与多段中文牌义（`src/data/osho_cards.ts`）
- **抽卡仪式**：洗牌、扇形展开、3D 翻牌动效，家族色光晕随牌切换
- **AI 解读**：基于牌义 + 用户问题流式生成，按固定结构输出（判词 / 牌位解读 / 人性问题 / 哲学内核 / 现实行动 / 静心），顶部锚点快速跳转
- **继续追问**：对同一次解读连续追问，问答成对追加并随记录保存
- **牌库浏览**：按家族筛选、按名称 / 关键词搜索，任意牌可直接「以这张牌解我的问题」
- **历史记录**：本地保存最近 20 次抽卡（含牌、解读、追问），可回看
- **分享卡**：将本次牌面与解读生成为可保存的图片

## 技术栈

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui (Radix) · framer-motion · react-router-dom

## 本地运行

```bash
npm install
npm run dev        # 开发服务器
npm run lint       # typecheck + eslint
npm run build      # 生产构建（需要 bash，产物在 dist/output）
```

> 依赖通过 `registry.npmmirror.com` 安装（见 `.npmrc`），海外网络可自行删除该文件改用官方源。

### 关于 AI 解读的平台依赖

本项目的 AI 解读通过妙搭（Miaoda）运行时的 `@lark-apaas/client-toolkit-lite` 调用平台内置的 `ai-text-generate` 插件（配置见 `shared/capabilities/osho_zen_interpretation_1.json`），模型与密钥由平台托管，仓库中不包含任何 API Key。

因此：

| 运行环境 | 抽卡 / 牌库 / 历史 | AI 解读 |
|---|---|---|
| 妙搭平台（导入此项目） | 可用 | 可用 |
| 本地 / 其他托管 | 可用 | 不可用，需自行接入 LLM |

想在平台外使用 AI 解读，替换 `src/pages/HomePage/HomePage.tsx` 中 `capabilityClient.load(PLUGIN_ID).callStream('textGenerate', { prompt })` 这一处调用为自己的后端接口即可，prompt 组装逻辑已在前端完成，无需改动。

## 目录结构

```
src/
├── index.tsx / app.tsx          # 入口与路由
├── tailwind-theme.css           # 主题变量（深靛夜幕 + 五大家族色）
├── data/
│   ├── osho_cards.ts            # 79 张牌库数据（中文）
│   └── spreads.ts               # 7 种牌阵定义与布局
├── lib/history-storage.ts       # 历史记录持久化
└── pages/HomePage/
    ├── HomePage.tsx             # 页面状态与抽卡 / 解读流程
    └── sections/                # 各功能区块组件
shared/
└── capabilities/                # 妙搭 AI 插件配置
AGENTS.md                        # 需求拆解与 UI 设计指南
```

## 数据与版权说明

- 牌库结构、牌面图片链接参考开源项目 [baribahl/osho-zen-tarot](https://github.com/baribahl/osho-zen-tarot)，牌义中文译文与解读结构在本仓库中重写。
- **奥修禅卡（Osho Zen Tarot）牌面图像版权归 Osho International Foundation 所有。** 本仓库不打包任何牌面图片，仅引用外链用于展示，仅供学习与非商业用途；如需商用请自行取得授权。
- AI 解读内容由大模型生成，仅供启发与自省参考，不构成任何医疗、法律、财务或人生决策建议。

## License

[MIT](./LICENSE)
