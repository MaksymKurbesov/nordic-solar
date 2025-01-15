import styles from './Referrals.module.scss'
import { useUser } from '@/hooks/useUser'
import { useEffect, useState } from 'react'
import { referralService } from '@/main'
import LevelAccordion from '@/pages/Cabinet/Referrals/LevelAccordion/LevelAccordion'
import Statistic from '@/pages/Cabinet/Referrals/Statistic/Statistic.tsx'

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
          return (
            acc +
            array.filter((item) => {
              if (!item) return

              return item.invested > 0
            }).length
          )
        },
        0,
      )
      const totalDeposited = Object.values(currentUserReferrals).reduce(
        (acc, array) => {
          return (
            acc +
            array.reduce((sum, item) => {
              if (!item) return

              return sum + item.invested // Добавляем только если есть поле deposited
            }, 0)
          )
        },
        0,
      )

      setReferralsCount(refsCount)
      setReferrals(currentUserReferrals)
      setActiveReferralsCount(activeRefsCount)
      setTotalIncome(totalDeposited)
    }

    fetchActiveReferrals()
  }, [user])

  if (!user) return

  return (
    <>
      <h1 className={styles['title']}>Рефералы</h1>
      <Statistic
        referralsCount={referralsCount}
        activeReferralsCount={activeReferralsCount}
        totalIncome={totalIncome}
      />
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
