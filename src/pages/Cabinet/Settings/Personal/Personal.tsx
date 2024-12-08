import styles from './Personal.module.scss'
import Input from '@SharedUI/Input/Input.tsx'
import { useFormContext } from 'react-hook-form'
import UserAvatar from '@assets/images/user.png'
import { useUser } from '@/hooks/useUser.ts'
import UploadIcon from '@assets/icons/upload.svg?react'

const Personal = () => {
  const { register, trigger } = useFormContext()
  const { user } = useUser()

  return (
    <>
      <div className={styles['avatar']}>
        <img src={UserAvatar} alt={''} />
        <div>
          <p className={styles['nickname']}>{user.nickname}</p>
          <div className={styles['avatar-buttons']}>
            <button>
              <UploadIcon width={15} /> Изменить
            </button>
            <button>Удалить</button>
          </div>
        </div>
      </div>
      <div className={styles['inputs']}>
        <Input
          label={'Имя'}
          name={'name'}
          register={register}
          trigger={trigger}
        />
        <Input
          label={'Фамилия'}
          name={'surname'}
          register={register}
          trigger={trigger}
        />
        <Input
          label={'Email'}
          name={'email'}
          register={register}
          trigger={trigger}
          disabled
        />
        <Input
          label={'Телефон'}
          name={'phone'}
          register={register}
          trigger={trigger}
        />
        <Input
          label={'Социальная сеть'}
          name={'social'}
          register={register}
          trigger={trigger}
        />
        <Input
          label={'Страна'}
          name={'country'}
          register={register}
          trigger={trigger}
        />
      </div>
    </>
  )
}

export default Personal
