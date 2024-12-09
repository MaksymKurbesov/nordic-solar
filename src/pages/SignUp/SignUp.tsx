import styles from './SignUp.module.scss'
import Input from '@SharedUI/Input/Input.tsx'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { NavLink, useLocation } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { referralService, userService } from '@/main.tsx'
import { useEffect, useState } from 'react'
import SuccessModal from '@/pages/SignUp/SuccessModal/SuccessModal'
import axios from 'axios'
import Rules from '@/pages/SignUp/Rules/Rules.tsx'

export interface IUserData {
  nickname: string
  email: string
  referral?: string
  password: string
  agreement: boolean
}

const SignUp = () => {
  const methods = useForm<IUserData>()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
  } = methods
  const { search } = useLocation()
  const [state, setState] = useState({
    isSuccessModalVisible: false,
    isLoading: false,
    referralNickname: '',
    rulesIsOpen: false,
  })

  useEffect(() => {
    const searchQuery = new URLSearchParams(search)
    setState((prevState) => ({
      ...prevState,
      referralNickname: searchQuery.get('referral') || '',
    }))

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [search])

  console.log('signup')

  const openModal = () => {
    setState((prevState) => ({ ...prevState, isSuccessModalVisible: true }))
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }

  const onSubmit = async (data: IUserData) => {
    setState((prevState) => ({ ...prevState, isLoading: true }))

    const trimmedData = {
      nickname: data.nickname.trim(),
      email: data.email.trim(),
      password: data.password,
    }

    await userService.registerUser(
      trimmedData.nickname,
      trimmedData.email,
      trimmedData.password,
    )

    await axios.post('https://apate-backend.com/send-welcome-email', {
      to: trimmedData.email,
      subject: 'Вы с нами! Спасибо за регистрацию на Nordic Solar!',
      name: trimmedData.nickname,
      email: trimmedData.email,
      password: data.password,
      action_url: 'https://nordic-solar.tech/sign-in',
    })

    if (data.referral) {
      await referralService.addReferralToAllLevels(
        data.referral,
        trimmedData.nickname,
      )
    }

    openModal()
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['input-wrapper']}>
              <Input
                name={'nickname'}
                label={'Никнейм*'}
                register={register}
                trigger={trigger}
                validation={{
                  required: 'Никнейм обязателен',
                  minLength: { value: 5, message: 'Минимум 5 символов' },
                }}
              />
              {errors.nickname && (
                <p className={styles['error']}>{errors.nickname.message}</p>
              )}
            </div>

            <div className={styles['input-wrapper']}>
              <Input
                type={'password'}
                name={'password'}
                label={'Пароль*'}
                register={register}
                validation={{
                  required: 'Пароль обязателен',
                  minLength: { value: 6, message: 'Минимум 6 символов' },
                }}
                trigger={trigger}
              />
              {errors.password && (
                <p className={styles['error']}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles['input-wrapper']}>
              <Input
                type={'password'}
                name={'confirm-password'}
                label={'Повторите пароль*'}
                register={register}
                trigger={trigger}
                validation={{
                  required: 'Подтверждение пароля обязательно',
                  validate: (value) =>
                    value === methods.getValues('password') ||
                    'Пароли не совпадают',
                }}
              />
              {errors['confirm-password'] && (
                <p className={styles['error']}>
                  {errors['confirm-password'].message}
                </p>
              )}
            </div>
            <div className={styles['input-wrapper']}>
              <Input
                name={'email'}
                label={'E-mail*'}
                register={register}
                trigger={trigger}
                validation={{
                  required: 'E-mail обязателен',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Неверный формат E-mail',
                  },
                }}
              />
              {errors.email && (
                <p className={styles['error']}>{errors.email.message}</p>
              )}
            </div>
            <Input
              name={'referral'}
              label={'Ник реферала'}
              register={register}
              trigger={trigger}
              referralNickname={state.referralNickname}
            />

            <div className={styles['input-wrapper']}>
              <label
                className={`${styles['container']} ${styles['agreement']}`}
              >
                <input
                  type="checkbox"
                  {...register('agreement', {
                    required: 'Вы должны согласиться с правилами сайта',
                  })}
                />
                <span className={styles['checkmark']}></span>Я согласен с
                правилами сайта{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setState((prevState) => ({
                      ...prevState,
                      rulesIsOpen: true,
                    }))
                  }}
                  className={styles['read-rules']}
                >
                  Читать правила
                </button>
              </label>
              {errors.agreement && (
                <p className={styles['error']}>{errors.agreement.message}</p>
              )}
            </div>

            <WideButton
              text={'Регистрация'}
              type={'submit'}
              isDisabled={state.isLoading}
            />
          </form>
          <Rules
            setValue={setValue}
            open={state.rulesIsOpen}
            handleClose={() =>
              setState((prevState) => ({ ...prevState, rulesIsOpen: false }))
            }
          />
        </FormProvider>
      </div>
      {state.isSuccessModalVisible && <SuccessModal />}
    </div>
  )
}

export default SignUp
