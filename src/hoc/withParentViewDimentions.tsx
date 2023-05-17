import React, { MutableRefObject, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export interface ParentViewDimentionData {
  parentDimentions: { width: number; height: number };
}

//HOC to get parent views dimentions
//TODO::implement
export function withParentViewDimentions(ChildComponent: React.FC<any>, parentRef: MutableRefObject<any>) {
  return function ChildComponentWithParentDimentionData() {
    const { width, height } = Dimensions.get('window');

    const [parentDimentions, setParentDimentions] = useState<ParentViewDimentionData>({
      parentDimentions: {
        width: width,
        height: height,
      },
    });

    useEffect(() => {
      parentRef.current.measureLayout(parentRef.current, (width: number, height: number) => {
        setParentDimentions({ parentDimentions: { width: width, height: height } });
        console.log('width = ' + width + ' ' + 'height : ' + height);
      });
    }, [parentRef]);

    return <ChildComponent parentDimentions={parentDimentions.parentDimentions} />;
  };
}
