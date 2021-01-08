import React, { useEffect, useMemo, useState } from "react";
// import { useRequest } from '@umijs/hooks';
// import styles from './index.less';
import { useLocation } from "dva";
// import getCurrent from '@/utils/service';
// import BarGraph from '@/components/Bar';
// import { color, time } from '@/utils/config';

export default () => {
  const location: any = useLocation();
  const { user, type, keyword, mode } = location.query;

  const [search, setSearch] = useState<any>([]);
  const [stat, setStat] = useState<
    {
      id: 1;
      user: "dummy";
      poiId: "00000000";
      pharmName: "XX药店";
      queryCount: 105;
    }[]
  >();

  useEffect(() => {
    console.log(mode);

    if (mode != "stat") {
      fetch(
        "http://ec2-18-216-55-71.us-east-2.compute.amazonaws.com:8080/search?user=" +
          user +
          "&type=" +
          type +
          "&keyword=" +
          keyword,
        {
          method: "GET"
        }
      )
        .then(res => {
          return res.json();
        })
        .then(json => {
          setSearch(json);
        });
    } else {
      fetch(
        "http://ec2-18-216-55-71.us-east-2.compute.amazonaws.com:8080/stat",
        {
          method: "GET"
        }
      )
        .then(res => {
          return res.json();
        })
        .then(json => {
          setStat(json);
        });
    }
  }, []);

  return (
    <div>
      {search.map((it: any, index: number) => {
        return (
          <div key={index}>
            <span>{it.poiId}</span>
            <span>{it.pharmName}</span>
          </div>
        );
      })}
      {stat?.map((it, index) => {
        return (
          <div key={index}>
            <span>{it.user}</span>
            <span>{it.pharmName}</span>
            <span>{it.queryCount}</span>
          </div>
        );
      })}
    </div>
  );
};
