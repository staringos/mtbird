import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import map from 'lodash/map';
import range from 'lodash/range';

const ReactGridLayout = WidthProvider(RGL);

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const generateLayout = () => {
  return map(range(0, 5), function (item: any, i: number) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
};

const GridLayoutMoveable = ({ children }: IProps) => {
  const [layout, setLayout] = useState<any>({ lg: generateLayout() });

  const generateDOM = () => {
    return map(layout.lg, function (l: any, i: number) {
      return (
        <div key={i} className={l.static ? 'static' : ''} style={{ background: 'red' }}>
          {l.static ? (
            <span className="text" title="This item is static and cannot be removed or resized.">
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  const handleLayoutChange: any = (layout: any, layouts: any) => {
    console.log('layout, layouts:', layout, layouts);
  };

  return (
    <ReactGridLayout style={{ background: '#333' }} layout={layout} onLayoutChange={handleLayoutChange} useCSSTransforms={true} allowOverlap={true}>
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default GridLayoutMoveable;
