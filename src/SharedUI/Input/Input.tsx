import styles from './Input.module.scss'
import { IUserData } from '@/pages/SignUp/SignUp'
import { UseFormRegister } from 'react-hook-form'
import { FC } from 'react'

interface InputProps {
  name: keyof IUserData // Это укажет, что имя должно соответствовать ключам интерфейса IUserData
  label: string
  type?: string
  register: UseFormRegister<IUserData> // Правильная типизация для register
  validation?: object
  trigger: (name: keyof IUserData) => Promise<boolean>
  value?: string
}

const Input: FC<InputProps> = ({
  label,
  name,
  type = 'text',
  register = () => {},
  validation,
  trigger,
  value = '',
}) => {
  return (
    <div className={styles['input']}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        value={value}
        type={type}
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
