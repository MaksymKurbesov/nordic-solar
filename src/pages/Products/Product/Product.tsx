import styles from './Product.module.scss'
import WideButton from '@SharedUI/WideButton/WideButton'
import Questions from '@/pages/Products/Product/Questions/Questions'
import { useLocation, ScrollRestoration, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '@/utils/PRODUCTS'

const Product = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const productName = location.pathname.split('/')[2]
  const product = PRODUCTS.find((product) => product.link === productName)!

  const { title, subtitle, heroImage, mainText, subText, galleryImages } =
    product

  return (
    <div className={'container'}>
      <div className={styles['product']}>
        <button
          onClick={() => navigate('/products')}
          className={styles['back-button']}
        >
          Назад
        </button>
        <h2 className={'page-title'}>{title}</h2>
        <WideButton text={'Обсудить проект'} />
        <p className={styles['subtitle']}>{subtitle}</p>
        <img
          className={styles['hero-image']}
          src={heroImage}
          alt={''}
          width={'100%'}
        />
        <p className={styles['main-text']}>{mainText}</p>
        <p className={styles['sub-text']}>{subText}</p>
        <div className={styles['gallery']}>
          <img src={galleryImages[0]} alt={''} />
          <div>
            <img src={galleryImages[1]} alt={''} />
            <img src={galleryImages[2]} alt={''} />
          </div>
        </div>
        <Questions questions={product.questions} />
      </div>
      <ScrollRestoration />
    </div>
  )
}

export default Product
