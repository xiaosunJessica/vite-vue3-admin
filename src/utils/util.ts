import dayjs from 'dayjs'
// 获取星期几
const mapDay = {
  0: '星期天',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}
export const getDay = (day: string) => {
  return mapDay[dayjs(day).day()]
}