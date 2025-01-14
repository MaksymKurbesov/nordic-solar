import styles from './MobileFeatures.module.scss'
import { IFeature } from '@/pages/IndexPage/IndexPage.tsx'
import { FC } from 'react'

interface IMobileFeaturesProps {
  features: IFeature[]
}

const MobileFeatures: FC<IMobileFeaturesProps> = ({ features }) => {
  return (
    <div className={styles['mobile-features']}>
      <h3>Основные функции и услуги</h3>
      <ul className={styles['mobile-features-list']}>
        {features.map((feature, index) => {
          return (
            <li key={index}>
              <p className={styles['title']}>{feature.title}</p>
              <img src={feature.image} alt={''} width={528} />
              <p className={styles['description']}>{feature.description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MobileFeatures
