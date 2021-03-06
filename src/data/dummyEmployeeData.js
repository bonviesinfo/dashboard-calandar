import { getZeroTime } from '../utils/timeUtils'

export const getSomeDateTimeMs = (num, minuteNum) => {
  const date = getZeroTime()
  date.setHours(date.getHours() + num)
  minuteNum && date.setMinutes(date.getMinutes() + minuteNum)
  return date.getTime()
}

export const getOtherDateTimeMs = (dayGap, num, minuteNum) => {
  const date = getZeroTime()
  date.setDate(date.getDate() + dayGap)
  date.setHours(date.getHours() + num)
  minuteNum && date.setMinutes(date.getMinutes() + minuteNum)
  return date.getTime()
}

export const dummyEmployeeData = [
  {
    id: 'cm1',
    name: '정진우',
  },
  {
    id: 'cm2',
    name: '曉華',
  },
  {
    id: 'cm3',
    name: '小美',
  },
  {
    id: 'cm4',
    name: '阿明',
  },
  {
    id: 'cm5',
    name: '瑞華',
  },
  {
    id: 'cm6',
    name: '卡比',
  },
  {
    id: 'cm7',
    name: '波波',
  },
  {
    id: 'cm8',
    name: '波波2',
  },
  {
    id: 'cm9',
    name: '周休二日',
  },
]

export const dummyEventData = [
  {
    id: 'ev1',
    employeeId: 'cm2',
    reserveType: 'tt2',
    remark: '我是一些提醒事項，可能也不會太長，大概兩三行左右 你說什麼你說什麼你說什麼你說什麼你說什麼你說什麼你說什麼',
    start: getSomeDateTimeMs(10),
    end: getSomeDateTimeMs(11),
    pet: {
      id: 'p1',
      petName: '純正法國血統 英國皇家訓練畢業 大家的小工舉 凱特琳十八世 -  Bobby·J·McArthur',
      petAge: 2,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/70/226625536_551abc895a_n.jpg',
    },
    isPayed: true,
  },
  {
    id: 'ev2',
    employeeId: 'cm1',
    reserveType: 'tt1',
    remark: '吃韓式炸雞',
    start: getSomeDateTimeMs(10, 30),
    end: getSomeDateTimeMs(12),
    pet: {
      id: 'p2',
      petName: 'Cochi',
      petAge: 7,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/7075/7058942935_d29b5c4778_n.jpg',
    },
  },
  {
    id: 'ev3',
    employeeId: 'cm5',
    reserveType: 'tt2',
    remark: '拿魚叉抓章魚',
    start: getSomeDateTimeMs(9),
    end: getSomeDateTimeMs(11),
    pet: {
      id: 'p8',
      petName: 'Karin',
      petAge: 9,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/8586/16253422823_83c8fca8fc_h.jpg',
    },
    isCheckIn: true,
  },
  {
    id: 'ev4',
    employeeId: 'cm1',
    reserveType: 'tt2',
    remark: '看Netflix',
    start: getOtherDateTimeMs(-1, 9, 15),
    end: getOtherDateTimeMs(-1, 11, 15),
    pet: {
      id: 'p3',
      petName: 'Mimi',
      petAge: 6,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2833/11998821256_ed10ca5d83_n.jpg',
    },
  },
  {
    id: 'ev5',
    employeeId: 'cm5',
    reserveType: 'tt2',
    remark: '喝CASA啤酒',
    start: getSomeDateTimeMs(12, 45),
    end: getSomeDateTimeMs(14, 15),
    pet: {
      id: 'p4',
      petName: 'Chi Chi',
      petAge: 3,
      petCategory: 'Dog',
    },
  },
  {
    id: 'ev6',
    employeeId: 'cm2',
    reserveType: 'tt2',
    remark: '去Lady M吃蛋糕',
    start: getSomeDateTimeMs(12, 15),
    end: getSomeDateTimeMs(16),
    pet: {
      id: 'p5',
      petName: 'Micky',
      petAge: 2,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/4821/40438716093_4a7905c3e7_n.jpg',
    },
  },
  {
    id: 'ev7',
    employeeId: 'cm1',
    reserveType: 'tt2',
    remark: '這個是有跨日的預約，所以當日跟隔日都會有相同的事件',
    start: getOtherDateTimeMs(1, 7),
    end: getOtherDateTimeMs(1, 9, 45),
    pet: {
      id: 'p6',
      petName: 'Sachima',
      petAge: 9,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2851/33522734484_655cb6c80c_n.jpg',
    },
  },
  {
    id: 'ev8',
    employeeId: 'cm3',
    reserveType: 'tt2',
    remark: 'CCCCCC562',
    start: getOtherDateTimeMs(1, 9, 45),
    end: getOtherDateTimeMs(1, 12, 15),
    pet: {
      id: 'p5',
      petName: 'Micky',
      petAge: 2,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/4821/40438716093_4a7905c3e7_n.jpg',
    },
  },
  {
    id: 'ev9',
    employeeId: 'cm2',
    reserveType: 'tt2',
    remark: 'CCCCCC912',
    start: getOtherDateTimeMs(1, 9),
    end: getOtherDateTimeMs(1, 10, 45),
    pet: {
      id: 'p1',
      petName: '純正法國血統 英國皇家訓練畢業 大家的小工舉 凱特琳十八世 -  Bobby·J·McArthur',
      petAge: 2,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/70/226625536_551abc895a_n.jpg',
    },
  },
  {
    id: 'ev10',
    employeeId: 'cm5',
    reserveType: 'tt2',
    remark: 'CCCCCC837',
    start: getOtherDateTimeMs(2, 9, 30),
    end: getOtherDateTimeMs(2, 12, 30),
    pet: {
      id: 'p2',
      petName: 'Cochi',
      petAge: 7,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/7075/7058942935_d29b5c4778_n.jpg',
    },
  },
  {
    id: 'ev11',
    employeeId: 'cm1',
    reserveType: 'tt2',
    remark: '沒事',
    start: getSomeDateTimeMs(9, 15),
    end: getSomeDateTimeMs(10, 15),
    pet: {
      id: 'p6',
      petName: 'Sachima',
      petAge: 9,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2851/33522734484_655cb6c80c_n.jpg',
    },
    isCheckIn: true,
    isPayed: true,
    isMeeting: true,
  },
  {
    id: 'ev12',
    employeeId: 'cm5',
    reserveType: 'tt2',
    remark: '怕高度三格有點空',
    start: getSomeDateTimeMs(11, 15),
    end: getSomeDateTimeMs(12),
    pet: {
      id: 'p4',
      petName: 'Chi Chi',
      petAge: 3,
      petCategory: 'Dog',
    },
  },
  {
    id: 'ev13',
    employeeId: 'cm3',
    reserveType: 'tt2',
    remark: '試試看最小的兩格',
    start: getSomeDateTimeMs(15),
    end: getSomeDateTimeMs(15, 30),
    pet: {
      id: 'p1',
      petName: '純正法國血統 英國皇家訓練畢業 大家的小工舉 凱特琳十八世 -  Bobby·J·McArthur',
      petAge: 2,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/70/226625536_551abc895a_n.jpg',
    },
  },
  {
    id: 'ev14',
    reserveType: 'tt3',
    remark: '這是一個未分派的事件 1',
    start: getSomeDateTimeMs(11),
    end: getSomeDateTimeMs(12, 15),
    pet: {
      id: 'p4',
      petName: 'Chi Chi',
      petAge: 3,
      petCategory: 'Dog',
    },
  },
  {
    id: 'ev15',
    reserveType: 'tt3',
    remark: '這是一個未分派的事件 2',
    start: getSomeDateTimeMs(12),
    end: getSomeDateTimeMs(13),
    pet: {
      id: 'p7',
      petName: 'Ba Ha',
      petAge: 9,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/2610/3682417399_71259837d3_b.jpg',
    },
  },
  {
    id: 'ev16',
    reserveType: 'tt400',
    remark: '這是一個未分派的事件 3',
    start: getSomeDateTimeMs(10),
    end: getSomeDateTimeMs(12, 30),
    pet: {
      id: 'p8',
      petName: 'Karin',
      petAge: 9,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/8586/16253422823_83c8fca8fc_h.jpg',
    },
  },
  {
    id: 'ev17',
    reserveType: 'tt3',
    remark: '這是一個未分派的事件 4',
    start: getOtherDateTimeMs(1, 12),
    end: getOtherDateTimeMs(1, 13, 30),
    pet: {
      id: 'p7',
      petName: 'Ba Ha',
      petAge: 9,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/2610/3682417399_71259837d3_b.jpg',
    },
  },
  {
    id: 'ev18',
    reserveType: 'tt3',
    remark: '這是一個未分派的事件 5',
    start: getOtherDateTimeMs(2, 11, 30),
    end: getOtherDateTimeMs(2, 12),
    pet: {
      id: 'p3',
      petName: 'Mimi',
      petAge: 6,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2833/11998821256_ed10ca5d83_n.jpg',
    },
  },
  {
    id: 'ev19',
    reserveType: 'tt3',
    remark: '這是一個未分派的事件 6',
    start: getOtherDateTimeMs(1, 10, 15),
    end: getOtherDateTimeMs(1, 11, 15),
    pet: {
      id: 'p6',
      petName: 'Sachima',
      petAge: 9,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2851/33522734484_655cb6c80c_n.jpg',
    },
  },

]



