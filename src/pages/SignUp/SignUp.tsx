import styles from './SignUp.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import SuccessModal from '@/pages/SignUp/SuccessModal/SuccessModal'
import axios from 'axios'
import Rules from '@/pages/SignUp/Rules/Rules.tsx'
import SignUpForm from '@/pages/SignUp/SignUpForm/SignUpForm.tsx'
import { BACKEND_URL } from '@/utils/const.tsx'

export type IUserData = {
  nickname: string
  email: string
  referredBy: string
  password: string
  agreement: boolean
}

const SignUp = () => {
  const { search } = useLocation()
  const methods = useForm<IUserData>({
    defaultValues: {
      referredBy: new URLSearchParams(search).get('referral') || '',
    },
  })

  const [isAgreementOpen, setIsAgreementOpen] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const openModal = () => {
    setIsSuccessModalVisible(true)
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }

  const onSubmitHandler: SubmitHandler<IUserData> = async (data) => {
    setIsFormLoading(true)

    const trimmedData = {
      nickname: data.nickname.trim(),
      email: data.email.trim(),
      password: data.password,
      referredBy: methods.getValues('referredBy'),
    }

    await axios.post(`${BACKEND_URL}/auth/register`, trimmedData)

    openModal()
    setIsFormLoading(false)
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [search])

  return (
    <div className={`${styles['sign-up']} container`}>
      <h2>Регистрация</h2>
      <div className={styles['form-wrapper']}>
        <div className={styles['new-user']}>
          <p>Уже зарегистрированы?</p>
          <NavLink className={styles['sign-in-link']} to={'/sign-in'}>
            Войти
          </NavLink>
        </div>
        <FormProvider {...methods}>
          <SignUpForm<IUserData>
            onSubmit={onSubmitHandler}
            handleOpenAgreement={() => setIsAgreementOpen(true)}
            isLoading={isFormLoading}
          />
          <Rules
            open={isAgreementOpen}
            handleClose={() => setIsAgreementOpen(false)}
          />
        </FormProvider>
      </div>
      {isSuccessModalVisible && <SuccessModal />}
    </div>
  )
}

export default SignUp
