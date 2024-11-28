import styles from './Referrals.module.scss'
import LinkIcon from '@assets/icons/link.svg?react'
import PartnersIcon from '@assets/icons/partners.svg?react'
import ActivePartnersIcon from '@assets/icons/active-partners.svg?react'
import StructureAmountIcon from '@assets/icons/structure-amount.svg?react'
import DateIcon from '@assets/icons/date.svg?react'
import CopyIcon from '@assets/icons/copy.svg?react'
import { useUser } from '@/hooks/useUser'
import { parseTimestamp } from '@/utils/helpers'
import { useEffect, useState } from 'react'
import { referralService } from '@/main'
import LevelAccordion from '@/pages/Cabinet/Referrals/LevelAccordion/LevelAccordion'
import toast from 'react-hot-toast'

const Referrals = () => {
  const { user } = useUser()
  const [referrals, setReferrals] = useState({})
  const [referralsCount, setReferralsCount] = useState(0)
  const [activeReferralsCount, setActiveReferralsCount] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)

  useEffect(() => {
    if (!user) return

    const fetchActiveReferrals = async () => {
      const currentUserReferrals = await referralService.fetchReferralsData(
        user.nickname,
      )

      const refsCount = Object.values(currentUserReferrals).reduce(
        (acc, array) => {
          return acc + array.length
        },
        0,
      )
      const activeRefsCount = Object.values(currentUserReferrals).reduce(
        (acc, array) => {
          return acc + array.filter((item) => item.invested > 0).length
        },
        0,
      )
      const totalDeposited = Object.values(currentUserReferrals).reduce(
        (acc, array) => {
          return (
            acc +
            array.reduce((sum, item) => {
              return sum + item.invested // Добавляем только если есть поле deposited
            }, 0)
          )
        },
        0,
      )

      console.log(currentUserReferrals, 'currentUserReferrals')

      setReferralsCount(refsCount)
      setReferrals(currentUserReferrals)
      setActiveReferralsCount(activeRefsCount)
      setTotalIncome(totalDeposited)
    }

    fetchActiveReferrals()
  }, [user])

  const CopyNotify = () => toast.success('Скопировано!')

  if (!user) return

  return (
    <>
      <h1 className={styles['title']}>Рефералы</h1>
      <div className={styles['referrals']}>
        <div className={styles['referral-link']}>
          <div className={styles['icon-wrapper']}>
            <span className={styles['icon']}>
              <LinkIcon />
            </span>
            <p>Ссылка для приглашений</p>
          </div>
          <p
            className={styles['link']}
            onClick={() => {
              CopyNotify()
              navigator.clipboard.writeText(
                `https://nordic-solar.tech/sign-up?referral=${user.nickname}`,
              )
            }}
          >
            {`https://nordic-solar.tech/sign-up?referral=${user.nickname}`}{' '}
            <CopyIcon />
          </p>
        </div>
        <div className={styles['statistic']}>
          <span className={styles['icon']}>
            <PartnersIcon />
          </span>
          <p>Количество партнеров</p>
          <p className={styles['value']}>{referralsCount}</p>
        </div>
        <div className={styles['statistic']}>
          <span className={styles['icon']}>
            <ActivePartnersIcon />
          </span>
          <p>Количество активных партнеров</p>
          <p className={styles['value']}>{activeReferralsCount}</p>
        </div>
        <div className={styles['statistic']}>
          <span className={styles['icon']}>
            <StructureAmountIcon />
          </span>
          <p>Оборот вашей структуры</p>
          <p className={styles['value']}>${totalIncome}</p>
        </div>
        <div className={styles['statistic']}>
          <span className={styles['icon']}>
            <DateIcon />
          </span>
          <p>Дата регистрации</p>
          <p className={styles['value']}>
            {parseTimestamp(user.registrationDate, true)}
          </p>
        </div>
      </div>
      <div className={styles['referral-levels']}>
        <div className={styles['table-header']}>
          <span>Уровень</span>
          <span>Рефералов</span>
          <span>Активных</span>
          <span>Общий доход</span>
        </div>
        {Object.entries(referrals).map((item) => {
          const level = item[0]

          return (
            <LevelAccordion
              key={level}
              level={level}
              referrals={referrals[level]}
            />
          )
        })}
      </div>
    </>
  )
}

export default Referrals
