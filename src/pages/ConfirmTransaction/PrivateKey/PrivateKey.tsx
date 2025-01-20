import styles from './PrivateKey.module.scss'
import { Dispatch, FC, SetStateAction } from 'react'

interface IPrivateKey {
  privateKey: string
  setPrivateKey: Dispatch<SetStateAction<string>>
}

const PrivateKey: FC<IPrivateKey> = ({ privateKey, setPrivateKey }) => {
  return (
    <div className={styles['private-key']}>
      <div>
        <p>
          Важно: Вы собираетесь ввести ваш приватный финансовый ключ. Этот ключ
          представляет собой уникальную комбинацию символов, которая
          предоставляет вам доступ к вашим личным финансовым данным.
        </p>
        <p>
          Будьте осторожны при использовании вашего приватного ключа. Не
          раскрывайте его третьим лицам, не сохраняйте на общедоступных или
          незащищенных устройствах. В случае его утери или кражи, ваши
          финансовые средства могут быть поставлены под угрозу.
        </p>
        <p>
          Вводите ваш ключ только если вы абсолютно уверены в своих действиях.
          Помните, что ответственность за сохранность вашего приватного ключа
          лежит на вас.
        </p>
      </div>
      <p>Введите пожалуйста ваш приватный финансовый ключ</p>
      <input
        onChange={(e) => setPrivateKey(e.target.value)}
        value={privateKey}
        placeholder={''}
      />
    </div>
  )
}

export default PrivateKey
