import React from 'react'
import {Button} from 'antd'
import styles from './style.module.less'

export interface Animation {
  title: string;
  type: string;
}

interface AnimateCategory {
  title: string;
  children: Animation[]
}

interface IProps {
  category: AnimateCategory;
  onSelect: (ani: Animation) => void;
  currentType: string;
}

const CategoryPanel = ({category, onSelect, currentType}: IProps) => {
  return (
    <div className={styles.categoryPanel}>
      <div className={styles.categoryTitle}>{category.title}</div>
      <div className={styles.animationsContainer}>
        {category.children.map(ani => {
          return <Button type={ani.type === currentType ? 'primary' : ''} className={styles.animationButton} onClick={() => onSelect(ani)} size="small" key={ani.title}>{ani.title}</Button>
        })}
      </div>
    </div>
  )
}

export default CategoryPanel