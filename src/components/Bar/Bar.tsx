import React, { useMemo } from 'react';
import styles from './bar.less';
import pointerIcon from '@/assets/pointer-down.svg';
import { color } from '@/utils/config';

export default ({ value, min, max, target, status, precision }: BarProps) => {
  const scale = [
    min,
    (3 * min + target) / 4,
    (min + target) / 2,
    (min + 3 * target) / 4,
    target,
    (max + 3 * target) / 4,
    (max + target) / 2,
    (3 * max + target) / 4,
    max,
  ];
  const width =
    value - min > 0
      ? value - max > 0
        ? 100
        : ((value - min) / (max - min)) * 100
      : 0;

  return (
    <div className={styles.barContainer}>
      <div
        className={styles.bar}
        style={{
          width: `${width}%`,
          backgroundColor: color[status],
        }}
      />
      {precision ? (
        <div
          className={styles.precision}
          style={{
            width: `${((precision[1] - precision[0] - min) / (max - min)) *
              100}%`,
            left: `${((precision[0] - min) / (max - min)) * 100}%`,
          }}
        />
      ) : null}
      {scale.map((item, index) => (
        <div
          key={item}
          className={styles.scale}
          style={{ left: `${((item - min) / (max - min)) * 100}%` }}
        >
          <div
            className={`${styles.dash} ${index % 2 ? styles.shortDash : ''}`}
          />
          <div className={styles.name}>{item.toFixed(1)}</div>
        </div>
      ))}
      <img
        className={`${styles.pointer} ${styles[status]}`}
        style={{
          left: `${width}%`,
        }}
        src={pointerIcon}
        alt=""
      />
    </div>
  );
};
