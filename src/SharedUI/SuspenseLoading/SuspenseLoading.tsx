import styles from './SuspenseLoading.module.scss'
import Logo from '@assets/only-logo.svg?react'

const SuspenseLoading = () => {
  return (
    <div className={styles['suspense-loading']}>
      <div className={styles['suspense-loading-content']}>
        <Logo width={70} />
        {/*<span>Loading</span>*/}
        <span className={styles['loader']}></span>
      </div>
    </div>
  )
}

export default SuspenseLoading
