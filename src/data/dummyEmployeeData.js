const getZeroTime = () => {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

const getSomeDateTime = (num, minuteNum) => {
  const date = getZeroTime()
  date.setHours(date.getHours() + num)
  minuteNum && date.setMinutes(date.getMinutes() + minuteNum)
  return date
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
  // {
  //   id: 'cm6',
  //   name: '卡比',
  // },
  // {
  //   id: 'cm7',
  //   name: '波波',
  // },
]

export const dummyEventData = [
  {
    dummyEmployeeId: 'cm2',
    title: '喝CASA啤酒',
    start: getSomeDateTime(6, 30),
    end: getSomeDateTime(8, 15),
    pet: {
      id: 'p1',
      petName: '純正法國血統 英國皇家訓練畢業 大家的小工舉 凱特琳十八世 -  Bobby·J·McArthur',
      petAge: 2,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/70/226625536_551abc895a_n.jpg',
    },
  },
  {
    dummyEmployeeId: 'cm1',
    title: '吃韓式炸雞',
    start: getSomeDateTime(7, 30),
    end: getSomeDateTime(9),
    pet: {
      id: 'p2',
      petName: 'Cochi',
      petAge: 7,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/7075/7058942935_d29b5c4778_n.jpg',
    },
  },
  {
    dummyEmployeeId: 'cm5',
    title: '拿魚叉抓章魚',
    start: getSomeDateTime(8),
    end: getSomeDateTime(10),
    pet: {
      id: 'p2',
      petName: 'Cochi',
      petAge: 7,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/7075/7058942935_d29b5c4778_n.jpg',
    },
  },
  {
    dummyEmployeeId: 'cm4',
    title: '看Netflix',
    start: getSomeDateTime(6, 15),
    end: getSomeDateTime(8, 15),
    pet: {
      id: 'p3',
      petName: 'Mimi',
      petAge: 6,
      petCategory: 'Cat',
      avatar: 'https://live.staticflickr.com/2833/11998821256_ed10ca5d83_n.jpg',
    },
  },
  {
    dummyEmployeeId: 'cm2',
    title: '看Youtube',
    start: getSomeDateTime(8, 30),
    end: getSomeDateTime(10, 15),
    pet: {
      id: 'p4',
      petName: 'Chi Chi',
      petAge: 3,
      petCategory: 'Dog',
    },
  },
  {
    dummyEmployeeId: 'cm3',
    title: '去Lady M吃蛋糕',
    start: getSomeDateTime(7),
    end: getSomeDateTime(11),
    pet: {
      id: 'p5',
      petName: 'Micky',
      petAge: 2,
      petCategory: 'Dog',
      avatar: 'https://live.staticflickr.com/4821/40438716093_4a7905c3e7_n.jpg',
    },
  },
]



