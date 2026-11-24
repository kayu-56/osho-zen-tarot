// ---- plugin:osho_zen_interpretation_1 ----
// ============================================================
// 插件 osho_zen_interpretation_1 (奥修禅卡AI解读) 的类型定义
// 由 get_plugin_ai_json 自动生成
// ============================================================

export type OshoZenInterpretationOneInput = {
  /** 完整的解读 prompt，包含风格指令、牌信息、用户问题等，由前端组装 */
  prompt: string;
};

/**
 * const input: OshoZenInterpretationOneInput = { prompt };
 * capabilityClient.load('osho_zen_interpretation_1').callStream<OshoZenInterpretationOneOutput>('textGenerate', input)
 * 每个 chunk 就是下面这个扁平对象，字段名与 OshoZenInterpretationOneOutput 一致，外面没有 data / choices / message 包装：
 *   {"content":"示例文本","response":"示例文本"}
 * 返回值可能是 AsyncIterable<chunk>，也可能是 { output: AsyncIterable<chunk> }，取流前先归一化。
 * 逐段累加：
 *   for await (const chunk of stream) { result += chunk.content ?? ''; }
 */
export type OshoZenInterpretationOneOutput = {
  content: string;
  response?: string;
};
// ---- end:osho_zen_interpretation_1 ----