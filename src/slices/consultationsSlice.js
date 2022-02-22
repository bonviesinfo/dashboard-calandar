import { createSlice } from '@reduxjs/toolkit'

// 在諮詢資料加入是否展開的資料
const insertIsExpanded = consultations => {
  return consultations.map(consultation => ({ ...consultation, isExpanded: consultation.isCompleted ? false : true }))
}

const getSerialText = numb => {
  return `寺躲讀眼枝星草神叫學怎包沒寺老原物意聲自戶。游雨苦只文共力自能虎百書師。聲穴葉父問服穴支洋美眼馬哭巾牛，都房穿往朱陽，反五哭村喜小毛畫們爪背卜波巴山弓連個吹毛入。
珠夕經老荷加花，枝她隻由像她雞抄錯借金色大屋、女古美拍來法員旦瓜對要游主苦助能波立動，乞很生玉種年耍後。

家他明像它次害古還黃汁節，新布和停，英哪王像百跑回，高助做寫海面氣封內馬金乾許花；升習十能書意足放一完${numb}。`
}

const dummyData = [
  {
    id: 't1',
    isCompleted: false,
    text: getSerialText(1),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    remindEnd: 1643103000000,
    member: {
      id: 'mb57875847222',
      name: '劉淑華',
      mobile: '0967892255',
      address: '台北市大安區建國南路二段125號',
    },
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
    propertyTags: [
      {
        id: 'pt1',
        name: '急',
      },
      {
        id: 'pt2',
        name: '重要',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
      {
        id: 'bvd234',
        name: '自訂',
      },
    ],
  },
  {
    id: 't2',
    isCompleted: false,
    text: getSerialText(2),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    member: {
      id: 'mb5787584',
      name: '陳玉枝',
      mobile: '0933445566',
      address: '台北市士林區中山北路七段16巷28號',
    },
    principal: {
      id: 'p2',
      name: '林昱梅',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
    propertyTags: [
      {
        id: 'pt1',
        name: '急',
      },
      {
        id: 'pt3',
        name: '一般',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
    ],
  },
  {
    id: 'c3',
    isCompleted: true,
    completedAt: 1641196284569,
    text: getSerialText(3),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    remindEnd: 1643103000000,
    member: {
      name: '童琦瑤',
      mobile: '0955555555',
      address: '111台北市士林區至善路二段221號',
      pets: [
        {
          id: 'pp1234',
          name: '呱吉',
          breed: 'Shiba',
        },
        {
          id: 'pp5674',
          name: '關關',
          breed: 'Corgi',
        },
      ],
    },
    pet: {
      id: 'pp5674',
      name: '關關',
      breed: 'Corgi',
    },
    principal: {
      id: 'p3',
      name: '沈明傑',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
    propertyTags: [
      {
        id: 'pt4',
        name: '次要',
      },
      {
        id: 'bvd234',
        name: '自訂',
      },
    ],
  },
  {
    id: 'c4',
    isCompleted: false,
    text: getSerialText(4),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    member: {
      name: '何麗恩',
      mobile: '0922222222',
      pets: [
        {
          id: 'pp1674',
          name: '咪咪',
          breed: 'Persian cat',
        },
      ]
    },
    pet: {
      id: 'pp1674',
      name: '咪咪',
      breed: 'Persian cat',
    },
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
    propertyTags: [
      {
        id: 'pt3',
        name: '一般',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
    ],
  },
  {
    id: 'a678d019-c287-4c32-83d1-aee804362222',
    text: 'It is an Expired Consultation.\n\n它是個超時提醒。\n\n',
    isExpanded: true,
    recordedAt: 1628553600000,
    remindStart: 1641276613000,
    remindEnd: 1641363019000,
    member: {
      name: '曾浩銘',
      mobile: '0933333333'
    },
    propertyTags: [
      {
        id: 'bvd234',
        name: '自訂',
      },
      {
        id: 'pt4',
        name: '次要'
      },
      {
        id: 'pt1',
        name: '急'
      }
    ],
    principal: {
      id: 'p1',
      name: '金小城'
    },
    category: {
      id: 't1',
      name: '商品諮詢'
    },
  },
  {
    id: 'c5',
    isCompleted: true,
    completedAt: 1641196284569,
    text: getSerialText(5),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    member: {
      id: 'mb57875847222',
      name: '劉淑華',
      mobile: '0967892255',
      address: '台北市大安區建國南路二段125號',
    },
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
    propertyTags: [
      {
        id: 'pt1',
        name: '急',
      },
      {
        id: 'pt3',
        name: '一般',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
    ],
  },
  {
    id: 'c6',
    isCompleted: true,
    completedAt: 1641196284569,
    text: getSerialText(6),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    member: {
      id: 'mb57875847222',
      name: '劉淑華',
      mobile: '0967892255',
      address: '台北市大安區建國南路二段125號',
    },
    principal: {
      id: 'p2',
      name: '林昱梅',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
    propertyTags: [
      {
        id: 'pt1',
        name: '急',
      },
      {
        id: 'pt3',
        name: '一般',
      },
      {
        id: 'bvd234',
        name: '自訂',
      },
    ],
  },
  {
    id: 'c7',
    isCompleted: true,
    completedAt: 1641094284569,
    transferredAt: 1641094284569,
    text: getSerialText(7),
    recordedAt: 1628553600000,
    remindStart: 1641465360000,
    member: {
      id: 'mb57875847222',
      name: '劉淑華',
      mobile: '0967892255',
      address: '台北市大安區建國南路二段125號',
    },
    principal: {
      id: 'p1',
      name: '金小城',
    },
    category: {
      id: 't1',
      name: '商品諮詢',
    },
    propertyTags: [
      {
        id: 'pt4',
        name: '次要',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
    ],
  },
  {
    id: 'c8',
    isCompleted: true,
    completedAt: 1640996284569,
    text: getSerialText(8),
    recordedAt: 1628553600000,
    remindStart: 1640865360000,
    member: {
      id: 'mb57875847222',
      name: '劉淑華',
      mobile: '0967892255',
      address: '台北市大安區建國南路二段125號',
    },
    principal: {
      id: 'p2',
      name: '林昱梅',
    },
    category: {
      id: 't2',
      name: '客訴案件',
    },
    propertyTags: [
      {
        id: 'pt3',
        name: '一般',
      },
      {
        id: 'cdf556',
        name: '派發工單',
      },
    ],
  },
]

const consultationsSlice = createSlice({
  name: 'consultations',
  initialState: insertIsExpanded(dummyData),
  reducers: {
    'createConsultation': (state, action) => {
      return [action.payload, ...state]
    },
    'deleteConsultation': (state, action) => {
      return state.filter(consultation => consultation.id !== action.payload)
    },
    'updateConsultation': (state, action) => {
      return state.map(consultation => {
        return consultation.id === action.payload.id
          ? {
            ...consultation,
            ...action.payload,
          }
          : consultation
      })
    },
    'toggleConsultationExpanded': (state, action) => {
      return state.map(consultation => {
        return consultation.id === action.payload.id ? { ...consultation, isExpanded: action.payload.isEditing ? true : !consultation.isExpanded } : consultation
      })
    },
    'toggleConsultationCompleted': (state, action) => {
      return state.map(consultation => {
        return consultation.id === action.payload
          ? {
            ...consultation,
            ...((!consultation.isCompleted && !consultation.transferredAt) && { completedAt: new Date().getTime() }),
            ...(consultation.isCompleted && { isExpanded: true }),
            isCompleted: !consultation.isCompleted,
            // 下行可以在完成時順便縮合
            // isExpanded: consultation.isCompleted,
          }
          : consultation
      })
    },
    'transferConsultationPrincipal': (state, action) => {
      // const { e, editingItem, principalMapping } = action.payload
      // const newEditingItem = {
      //   ...editingItem,
      //   id: uuidv4(),
      //   principal: {
      //     ...editingItem.principal,
      //     id: e.target.value,
      //     name: principalMapping[e.target.value]
      //   },
      //   ...(editingItem.remindEnd && { remindEnd: new Date(editingItem.remindEnd).getTime() }),
      //   remindStart: new Date(editingItem.remindStart).getTime(),
      // }
      const { newConsultation, id } = action.payload
      const modifiedConsultations = state.map(consultation => {
        return consultation.id === id
          ? {
            ...consultation,
            isCompleted: true,
            completedAt: new Date().getTime(),
            transferredAt: new Date().getTime(),
          }
          : consultation
      })
      return [newConsultation, ...modifiedConsultations]
    }
  },
});

export const {
  createConsultation,
  updateConsultation,
  deleteConsultation,
  toggleConsultationExpanded,
  toggleConsultationCompleted,
  transferConsultationPrincipal,
} = consultationsSlice.actions

export const selectConsultations = state => state.consultations

export default consultationsSlice.reducer;