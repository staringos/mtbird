import { useRef, useEffect, useState } from 'react';
import { IComponentInstanceCommon } from '@mtbird/shared/dist/types';

export function useLeaderLine(currentDataContainer: IComponentInstanceCommon | undefined) {
  console.log('currentDataContainer:', currentDataContainer);
  const LeaderLine = require('react-leader-line');
  const [leaderLine, setLeaderLine] = useState<typeof LeaderLine | undefined>();

  const destroy = () => {
    if (leaderLine) {
      try {
        leaderLine.remove();
      } catch (e) {}
      setLeaderLine(undefined);
    }
  };

  useEffect(() => {
    if (currentDataContainer) {
      setLeaderLine(
        new LeaderLine(document.getElementById(currentDataContainer.id as string), document.getElementById('dataItemContainer'), {
          dash: { animation: true },
          endLabel: LeaderLine.pathLabel('数据项', { strokeWidth: '2px' })
        })
      );
    } else {
      destroy();
    }

    return destroy;
  }, [currentDataContainer]);

  return leaderLine;
}

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<any>();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
