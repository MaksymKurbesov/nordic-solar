import styles from './SignUp.module.scss'
import Input from '@SharedUI/Input/Input.tsx'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import { NavLink, useLocation } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { referralService, userService } from '@/main.tsx'
import { useEffect, useState } from 'react'
import SuccessModal from '@/pages/SignUp/SuccessModal/SuccessModal'

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
  } = methods
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { search } = useLocation()

  const [referralNickname, setReferralNickname] = useState<string | null>('')

  useEffect(() => {
    const searchQuery = new URLSearchParams(search)
    setReferralNickname(searchQuery.get('referral'))

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  const openModal = () => {
    setIsSuccessModalVisible(true)
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
  }

  const onSubmit = async (data: IUserData) => {
    setIsLoading(true)

    const trimmedNickname = data.nickname.trim()
    const trimmedEmail = data.email.trim()

    await userService.registerUser(trimmedNickname, trimmedEmail, data.password)

    if (data.referral) {
      await referralService.addReferralToAllLevels(
        data.referral,
        trimmedNickname,
      )
    }

    openModal()
    setIsLoading(false)
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
              referralNickname={referralNickname}
            />

            <div className={styles['input-wrapper']}>
              <label className={styles['container']}>
                <input
                  type="checkbox"
                  {...register('agreement', {
                    required: 'Вы должны согласиться с правилами сайта',
                  })}
                />
                <span className={styles['checkmark']}></span>Я согласен с
                правилами сайта
              </label>
              {errors.agreement && (
                <p className={styles['error']}>{errors.agreement.message}</p>
              )}
            </div>

            <WideButton
              text={'Регистрация'}
              type={'submit'}
              isDisabled={isLoading}
            />
          </form>
        </FormProvider>
      </div>
      {isSuccessModalVisible && <SuccessModal />}
    </div>
  )
}

export default SignUp
