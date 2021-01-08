import React, { useMemo } from 'react';
import Bar from './Bar';
import styles from './bar.less';

export default ({
  value,
  precisionPerc,
  rulerEndFactor,
  target,
  status,
}: GraphProps) => {
  const angles = useMemo(() => {
    const height = 40;
    const left =
      ((target - (target * precisionPerc) / 100) / (target * rulerEndFactor)) *
      231;
    const right =
      ((target * rulerEndFactor - (target + (target * precisionPerc) / 100)) /
        (target * rulerEndFactor)) *
      231;
    const angle1 = (Math.atan(height / left) * 90) / 1.57;
    const angle2 = (Math.atan(height / right) * 90) / 1.57;
    return [angle1, angle2];
  }, []);

  return (
    <>
      <Bar
        value={value}
        min={0}
        max={target * rulerEndFactor}
        target={target}
        status={status}
        precision={[
          target - (target * precisionPerc) / 100,
          target + (target * precisionPerc) / 100,
        ]}
      />
      <div className={styles.slashContainer}>
        <div
          className={styles.triangleline}
          style={{
            transform: `rotate(-${angles[0]}deg)`,
            transformOrigin: 'left bottom',
          }}
        />
        <div
          className={styles.triangleline}
          style={{
            transform: `rotate(${angles[1]}deg)`,
            transformOrigin: 'right bottom',
          }}
        />
      </div>
      <Bar
        value={value}
        min={target - (target * precisionPerc) / 100}
        max={target + (target * precisionPerc) / 100}
        target={target}
        status={status}
      />
    </>
  );
};
