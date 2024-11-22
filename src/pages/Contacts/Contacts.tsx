import styles from './Contacts.module.scss'
import Map from '@assets/images/map.png'
import WideButton from '@SharedUI/WideButton/WideButton.tsx'
import Input from '@SharedUI/Input/Input.tsx'
import { ScrollRestoration } from 'react-router-dom'

const Contacts = () => {
  return (
    <div className={`${styles['contacts']} container`}>
      <h2>
        Готовы обсудить
        <br /> <span>сотрудничество?</span>
      </h2>
      <p className={styles['subtitle']}>
        Мы искренне благодарим Вас за вопросы, <br /> отзывы и предложения
      </p>
      <div className={styles['wrapper']}>
        <div className={styles['office']}>
          <p className={styles['office-title']}>Офис</p>
          <p className={styles['address']}>
            Norway <br /> Oslo, Lilleakerveien 14 P.O Box 200 Lilleaker <br />{' '}
            NO-0216
          </p>
          <img src={Map} alt={''} className={styles['map']} />
        </div>
        <div className={styles['form']}>
          <Input label={'Имя*'} name={'name'} />
          <Input label={'Email*'} name={'email'} />
          <Input label={'Телефон*'} name={'phone'} />

          <div className={styles['form-input']}>
            <label htmlFor={'message'}>Сообщение*</label>
            <textarea rows={7} id={'message'} />
          </div>
          <WideButton text={'Отправить сообщение'} />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  )
}

export default Contacts
