import React, { useEffect, useMemo, useState } from 'react';
// import { useRequest } from '@umijs/hooks';
// import styles from './index.less';
import { useLocation } from 'dva';
// import getCurrent from '@/utils/service';
// import BarGraph from '@/components/Bar';
// import { color, time } from '@/utils/config';


export default () => {

  const location: any = useLocation();
  const {
    user,
    type,
    keyword
  } = location.query;

  const [state, setState] = useState<any>([]);

  useEffect(() => {
    fetch('http://localhost:8080/search?user=' + user + '&type=' + type + '&keyword=' + keyword, {
      method: "GET"
    }).then(res => {
      return res.json();
    }).then(json => {
      setState(json);
    })
  }, [])

  return <div>
    {state.map( it => <div><span>{it.poiId}</span><span>{it.pharmName}</span></div>)}
  </div>
}
