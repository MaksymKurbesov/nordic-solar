import styles from './Referrals.module.scss'
import { useUser } from '@/hooks/useUser'
import { useEffect, useState } from 'react'
import LevelAccordion from '@/pages/Cabinet/Referrals/LevelAccordion/LevelAccordion'
import Statistic from '@/pages/Cabinet/Referrals/Statistic/Statistic.tsx'
import axios from 'axios'
import { Timestamp } from 'firebase/firestore'
import { BACKEND_URL } from '@/utils/const.tsx'

export interface IReferrals {
  1: IReferral[]
  2: IReferral[]
  3: IReferral[]
  4: IReferral[]
}

export interface IRegistrationDate {
  _seconds: number
  _nanoseconds: number
}

export interface IReferral {
  nickname: string
  sponsor: string
  referralsCount: number
  registrationDate: IRegistrationDate
  invested: number
  referredTo: IReferrals
}

const Referrals = () => {
  const { user } = useUser()
  const [referrals, setReferrals] = useState<IReferrals | {}>({})

  useEffect(() => {
    if (!user) return

    const fetchActiveReferrals = async () => {
      const response = await axios.post(`${BACKEND_URL}/user/get-referrals`, {
        nickname: user.nickname,
      })

      const currentUserReferrals = response.data

      setReferrals(currentUserReferrals)
    }

    fetchActiveReferrals()
  }, [user])

  if (!user) return

  return (
    <>
      <h1 className={styles['title']}>Рефералы</h1>
      <Statistic referrals={referrals} />
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
              level={+level}
              referrals={referrals[level]}
            />
          )
        })}
      </div>
    </>
  )
}

export default Referrals
