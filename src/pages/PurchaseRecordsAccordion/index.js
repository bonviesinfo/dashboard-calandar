import React, { useState, useEffect } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { useTheme, alpha } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Pagination from '@mui/material/Pagination'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MemberInfo from '../../components/UI/MemberInfo'
import orderData from '../../data/dummyOrderData'
import { dummyMember } from '../../data/dummyConsultationData'

function ConsultationAccordion() {
  // const [expanded, setExpanded] = useState('panel1')
  const theme = useTheme()
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(orderData)
  }, [])

  // const handleChange = panel => (e, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false)
  // }

  const renderDetail = list => {
    return list.map((item, index) => {
      return (
        <div className="table-item" key={item.id}>
          <div className="serial-sec">{index + 1}</div>
          <div className="name-sec">{item.name}</div>
          <div className="clerk-sec">{item.clerk}</div>
          <div className="price-sec">{item.price}</div>
          <div className="quantity-sec">{item.quantity}</div>
          <div className="discount-sec">{item.discount}</div>
          <div className="total-sec">{item.total}</div>
        </div>
      )
    })
  }

  const renderAccordion = data => {
    return data && data.map((item, index) => (
      <Collapse key={item.id} timeout={500}>
        <Accordion
          disableGutters
          elevation={0}
          defaultExpanded={true}
        // expanded={expanded === `panel${index + 1}`}
        // onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon />}>
            <Box className="order-info-wrapper">
              <div className="order-info">
                <div className="serial-sec">{index + 1}</div>

                <div className="info-sec-container">
                  <div className="info-sec-wrapper">
                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        日期 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        2021/12/20
                      </Typography>
                    </div>
                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        門市 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        老先覺旁邊的寵物店
                      </Typography>
                    </div>
                  </div>

                  <div className="info-sec-wrapper">
                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        會員 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        王大美 | 0912345678
                      </Typography>
                    </div>
                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        發票 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        SR19356154
                      </Typography>
                    </div>
                  </div>

                  <div className="info-sec-wrapper">
                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        銷售員 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        王小明
                      </Typography>
                    </div>
                    <div className="info-sec">
                      <Typography className="info-title" variant="subtitle1" component="span">
                        服務員 :&nbsp;
                      </Typography>
                      <Typography className="info-content" variant="subtitle1" component="span">
                        李小美
                      </Typography>
                    </div>
                  </div>

                </div>
              </div>

              <div className="order-id">
                CV12378374897
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="order-table">
              <div className="table-header">
                <div className="serial-sec">項次</div>
                <div className="name-sec">商品名稱</div>
                <div className="clerk-sec">服務員</div>
                <div className="price-sec">定價</div>
                <div className="quantity-sec">數量</div>
                <div className="discount-sec">折數</div>
                <div className="total-sec">合計</div>
              </div>

              <div className="table-list">
                {renderDetail(item.content)}
              </div>
            </Box>
            <Box
              className="order-detail"
            >
              <div className="credit-info">
                <div className="last-yard">
                  <span>信用卡號末四碼 : </span>
                  <span>1234</span>
                </div>
                <div className="auth-yard">
                  <span>授權碼 : </span>
                  <span>558735</span>
                </div>
              </div>

              <div className="received-info">
                <div className="received-list">
                  <div className="received-sec">
                    <span>整筆折扣 : </span>
                    <span>1000</span>
                  </div>
                  <div className="received-sec">
                    <span>現金 : </span>
                    <span>1000</span>
                  </div>
                  <div className="received-sec">
                    <span>匯款 : </span>
                    <span>1000</span>
                  </div>
                  <div className="received-sec">
                    <span>信用卡 : </span>
                    <span>3580</span>
                  </div>
                </div>

                <div className="total-sum">
                  <span>總金額 :&nbsp;</span>
                  <span>7200元</span>
                </div>
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Collapse>
    ))
  }

  return (
    <Box
      sx={{
        py: { xs: 2, sm: 5 },
        px: { xs: 2, sm: 4, lg: 10 },
        '& .accordion-list div.MuiAccordion-root': {
          mb: 1,
          overflow: 'auto',
          border: `1px solid ${theme.palette.divider}`,
          borderTop: 0,
          '&:before': {
            display: 'none',
          },
          // '&:first-of-type': {
          //   borderTop: 0,
          // },
          '&:last-of-type': {
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          },
        },
        '& .MuiAccordionSummary-root': {
          pl: 0,
          backgroundColor: 'primary.text',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
          '& .MuiAccordionSummary-expandIconWrapper svg': {
            fontSize: '0.9rem',
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
        },
        '& .MuiAccordionDetails-root': {
          padding: 0,
        },
        '& .MuiPagination-root': {
          paddingTop: theme.spacing(4),
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: alpha(theme.palette.secondary.light, 0.2),
          },
        },
        '& .order-info-wrapper': {
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          '& .order-info': {
            flexGrow: 1,
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          },
          '& .serial-sec': {
            flex: '0 0 4rem',
            display: 'inline-flex',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'text.light',
            padding: '0 1em',
            minWidth: 0,
          },
          '& .info-sec-container': {
            flex: '0 0 calc(100% - 4rem)',
            display: 'inline-flex',
            flexWrap: 'wrap',
            padding: '0.25em 0',
          },
          '& .info-sec-wrapper': {
            flex: '0 0 100%',
            display: 'inline-flex',
            flexWrap: 'wrap',
            paddingRight: '1.75em',
          },
          '& .info-sec': {
            flex: '0 0 50%',
            paddingTop: '0.125em',
            paddingBottom: '0.125em',
          },
          '& .info-title': {
            fontWeight: 'bold',
            color: (theme) => theme.palette.secondary.darkText,
          },
          '& .info-content': {
            fontWeight: 'bold',
            color: 'text.light',
          },
          '& .order-id': {
            color: 'text.light',
            padding: '0.5em 1.5em',
          },
        },
        '& .order-table': {
          p: 0,
          '& .table-header': {
            display: 'flex',
            color: 'text.light',
            backgroundColor: '#a4a4a4',
            '& > div': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25em 0',
              borderRight: `1px solid ${theme.palette.text.light}`,
            },
            '& > div:last-child': {
              borderRight: 'none',
            },
            '& .name-sec': {
              justifyContent: 'flex-start',
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
            },
          },
          '& .table-item': {
            display: 'flex',
            color: '#3e414f',
            backgroundColor: '#efefef',
            '&:nth-of-type(2n)': {
              backgroundColor: '#fafafa',
            },
            '& > div': {
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5em 0',
              borderRight: `1px solid ${theme.palette.text.light}`,
            },
            '& > div:last-of-type': {
              borderRight: 'none',
            },
            '& .name-sec': {
              justifyContent: 'flex-start',
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
            },
          },
          '& .serial-sec': {
            flex: '0 0 5%'
          },
          '& .name-sec': {
            flex: '0 0 45%',
          },
          '& .clerk-sec': {
            flex: '0 0 10%'
          },
          '& .price-sec': {
            flex: '0 0 10%'
          },
          '& .quantity-sec': {
            flex: '0 0 10%'
          },
          '& .discount-sec': {
            flex: '0 0 10%'
          },
          '& .total-sec': {
            flex: '0 0 10%'
          },
        },
        '& .order-detail': {
          display: 'flex',
          justifyContent: 'space-between',
          color: '#505877',
          backgroundColor: '#ffffff',
          padding: '0.5em 1em',
          '& .credit-info': {
            display: 'inline-flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          },
          '& .credit-info > div': {
            fontSize: '0.9rem',
            flex: '0 0 100%',
            display: 'inline-block',
            paddingRight: '1em',
          },
          '& .received-info': {
            display: 'inline-flex',
            alignItems: 'center',
          },
          '& .received-info > div': {
            display: 'inline-flex',
            alignItems: 'center',
          },
          '& .received-list > div': {
            display: 'inline-block',
            paddingRight: '1em',
          },
          '& .total-sum': {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#3e414f',
          },
        },
        '@media (min-width: 600px)': {
          '& .order-info-wrapper .info-sec-wrapper': {
            flexDirection: 'column',
            flex: 'unset',
          },
          '& .order-info-wrapper .info-sec-wrapper:last-child': {
            paddingRight: 0,
          },
          '& .order-info-wrapper .info-sec': {
            flex: 'unset',
          },
        },
      }}
    >
      <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', pb: 1 }}>
        購買紀錄
      </Typography>
      <MemberInfo member={dummyMember} />
      <Box className="accordion-list" sx={{ borderRadius: '0.5rem', overflow: 'auto' }}>
        <TransitionGroup>
          {renderAccordion(data)}
        </TransitionGroup>
      </Box>
      <Pagination count={10} shape="rounded" />
    </Box>
  )
}


export default ConsultationAccordion
