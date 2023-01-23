import {Spin} from 'antd'
import styles from './style.module.less'

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spin />
    </div>
  )
}

export default Loading