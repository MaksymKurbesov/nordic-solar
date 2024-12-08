import styles from './Input.module.scss'
import { IUserData } from '@/pages/SignUp/SignUp'
import { UseFormRegister } from 'react-hook-form'
import { FC } from 'react'

interface InputProps {
  name: keyof IUserData
  label: string
  type?: string
  register: UseFormRegister<IUserData>
  validation?: object
  trigger: (name: keyof IUserData) => Promise<boolean>
  referralNickname?: string
  placeholder?: string
  disabled?: boolean
}

const Input: FC<InputProps> = ({
  label,
  name,
  type = 'text',
  register = () => {},
  validation,
  trigger,
  referralNickname = '',
  placeholder,
  disabled = false,
}) => {
  return (
    <div className={styles['input']}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        placeholder={placeholder}
        id={name}
        type={type}
        disabled={disabled}
        {...(referralNickname ? { value: referralNickname } : {})}
        {...register(name, {
          ...validation,
          onBlur: () => {
            console.log('triggered')
            trigger(name)
          },
        })}
      />
    </div>
  )
}

export default Input
