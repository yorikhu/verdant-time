/**
 * 时间格式化工具函数
 */

/**
 * 将秒数格式化为 MM:SS 格式
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * 将秒数分解为分钟和秒数
 */
export function parseTime(seconds: number): { minutes: number; seconds: number } {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  };
}

/**
 * 获取当前日期字符串（YYYY-MM-DD）
 */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * 计算两个时间戳之间的差值（秒）
 */
export function getSecondsDiff(timestamp: number): number {
  return Math.floor((Date.now() - timestamp) / 1000);
}

/**
 * 计算进度百分比
 */
export function getProgress(current: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, ((total - current) / total) * 100));
}

/**
 * 获取圆形进度条的偏移量
 * @param progress 0-100 的进度值
 * @param半径 圆的半径
 */
export function getCircleOffset(progress: number, radius: number): number {
  const circumference = 2 * Math.PI * radius;
  return circumference * (1 - progress / 100);
}
