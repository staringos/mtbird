import { IComponentProps } from '@mtbird/shared/src/types/Component';
import React from 'react';
import manifest from './manifest';
import styles from './style.module.less';

const Shape = ({ node, style }: IComponentProps) => {
  const { props, data } = node;
  const borderOffset = style.borderWidth ? style.borderWidth * 2 : 0;
  return (
    <svg className={styles.shapeComponent} width={props.style.width} height={props.style.height}>
      <g
        transform={`scale(${(props.style.width - borderOffset) / data.viewBox[0]}, ${
          (props.style.height - borderOffset) / data.viewBox[1]
        }) translate(0,0) matrix(1,0,0,1,0,0)`}
      >
        <path
          className={data.outlined ? 'outlined' : ''}
          d={data.path}
          vector-effect="non-scaling-stroke"
          stroke-linecap="butt"
          stroke-miterlimit="8"
          fill={style.backgroundColor}
          stroke={style.borderColor}
          stroke-width={style.borderWidth}
        ></path>
      </g>
    </svg>
  );
};

Shape.manifest = manifest;

export default Shape;
