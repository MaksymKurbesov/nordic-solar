import styles from './WideButton.module.scss'
import ArrowIcon from '@assets/icons/arrow.svg?react'
import PlusIcon from '@assets/icons/plus.svg?react'
import CheckIcon from '@assets/icons/check.svg?react'

interface IWideButton {
  text: string
  type?: string
  onClickHandler: () => void
  isTransparent?: boolean
  isCancelButton?: boolean
  isCheckButton?: boolean
  isDisabled?: boolean
}

const WideButton = ({
  text,
  type,
  onClickHandler = () => {},
  isTransparent,
  isCancelButton,
  isCheckButton,
  isDisabled,
}: IWideButton) => {
  return (
    <button
      onClick={onClickHandler}
      className={`${styles.wideButton} ${isTransparent ? styles['transparent'] : ''} ${isDisabled ? styles['disabled'] : ''}`}
      type={type === 'submit' ? type : 'button'}
    >
      {text}
      {isCancelButton && <PlusIcon className={styles['plus-icon']} />}
      {isCheckButton && <CheckIcon />}
      {!isCheckButton && !isCancelButton && <ArrowIcon />}
    </button>
  )
}

export default WideButton
