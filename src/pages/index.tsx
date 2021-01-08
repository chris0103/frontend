import React, { useEffect, useMemo } from 'react';
import { useRequest } from '@umijs/hooks';
import styles from './index.less';
import { useLocation } from 'dva';
import getCurrent from '@/utils/service';
import BarGraph from '@/components/Bar';
import { color, time } from '@/utils/config';

export default () => {
  const location: any = useLocation();
  const {
    OPCItemNames,
    OPCServer,
    LowerLimit,
    PrecisionPerc,
    RulerEndFactor,
    TargetValue,
    UpperLimit,
    StabilityString,
  } = location.query;

  const { data, loading, run, cancel }: any = useRequest(getCurrent, {
    manual: true,
    pollingInterval: time / 1000,
    pollingWhenHidden: false,
  });

  useEffect(() => {
    if (OPCServer && OPCItemNames) {
      run(OPCServer, OPCItemNames);
    }
  }, []);

  const status = useMemo(() => {
    if (data) {
      const value = parseFloat(data.value);
      const lowerlimit = parseFloat(LowerLimit);
      const upperlimit = parseFloat(UpperLimit);
      if (value >= lowerlimit && value <= upperlimit) {
        return 'normal';
      } else if (value < lowerlimit) {
        return 'below';
      }
      return 'over';
    }
    return 'normal';
  }, [data, LowerLimit, UpperLimit]);

  const diff = TargetValue - parseFloat(data?.value);
  return (
    <div className={styles.normal}>
      {data ? (
        <>
          <div className={styles.wrapper}>
            <BarGraph
              value={parseFloat(data.value)}
              target={parseFloat(TargetValue)}
              precisionPerc={parseFloat(PrecisionPerc)}
              rulerEndFactor={parseFloat(RulerEndFactor)}
              status={status}
            />
          </div>
          <div className={styles.bottomPart}>
            <div className={styles.statusPart}>
              <span className={styles.status}>
                <span>{data.status === StabilityString ? 'S' : null}</span>
              </span>
            </div>
            <div className={styles.middlePart}>
              <div className={styles.currentPart}>
                <span className={styles.name}>Current q.ty</span>
                <span
                  className={styles.value}
                  style={{ backgroundColor: color[status] }}
                >
                  {parseFloat(data.value).toFixed(3)}
                </span>
                <span>{data.unit}</span>
              </div>
              <div className={styles.valuePart}>
                <span className={styles.name}>Target q.ty</span>
                <span className={styles.value}>
                  {parseFloat(TargetValue).toFixed(3)}
                </span>
                <span>{data.unit}</span>
              </div>
            </div>
            <div className={styles.diffPart}>
              <div className={styles.name}>Diff q.ty</div>
              <div className={styles.value}>
                {diff > 0 ? `+${diff.toFixed(3)}` : diff.toFixed(3)}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
