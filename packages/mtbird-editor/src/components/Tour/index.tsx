import React, { useContext, useEffect, useState } from 'react';
import { Tour, TourProps } from 'antd';
import Model from '../../store/types';

const steps: TourProps['steps'] = [
  {
    title: '欢迎使用星搭编辑器',
    cover: <img alt="tour.png" src="https://mtbird-cdn.staringos.com/product/movies/example-mini-2.gif" />,
    description:
      '为了让您更快上手使用编辑器，我们会引导您使用基础的功能，大概需要2分钟的时间，如果您已经熟悉了星搭编辑器的使用，可以点击右上角的按钮关闭。',
    target: null
  },
  {
    title: '添加组件',
    description:
      '在左侧工具面板，可以选择组件，点击即可添加到页面上.星搭组件分为三种类型，<br />容器组件: 可以容纳其它组件的容器<br />表单组件: 如输入框、选择框等，表单或表单项 <br /> 原子组件: 如图片、视频等普通组件',
    cover: <img alt="tour.png" src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png" />,
    target: () => document.getElementById('commonToolBar') as HTMLElement
  },
  {
    title: '区块组件',
    cover: <img alt="tour.png" height="500px" src="https://cdn.staringos.com/81643be3aec9d29b106d.png" />,
    description:
      '区块 是页面的一个段落，我们页面的直接子元素只能是一个个 区块。长的落地页会被拆分成一节节的区块。比如我们下面这个页面就是由四个区块组成.',
    target: () => document.getElementById('saveBtn') as HTMLElement
  },
  {
    title: '图库',
    description: '图库中是来自 unsplash 的免费可商用图片，可以添加到您的页面中.',
    target: () => document.getElementById('saveBtn') as HTMLElement
  },
  {
    title: '表单组件',
    description: '您可以在页面中添加表单以获取用户输入信息，表单组件需先添加一个表单（容器），后选择表单项一次加入到表单容器中.',
    target: () => document.getElementById('saveBtn') as HTMLElement
  },
  {
    title: '保存为组件模版',
    description: '您可以在页面中添加表单以获取用户输入信息，表单组件需先添加一个表单（容器），后选择表单项一次加入到表单容器中.',
    target: () => document.getElementById('saveBtn') as HTMLElement
  },
  {
    title: '设置动画',
    description: 'Click to see other actions.',
    target: () => document.getElementById('previewBtn') as HTMLElement
  },
  {
    title: '设置动作',
    description: 'Click to see other actions.',
    target: () => document.getElementById('previewBtn') as HTMLElement
  }
];

const TourComponent = () => {
  const { actions, state } = useContext(Model);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true));
  }, []);

  if (!state.tourState) return <div />;
  return <Tour open={state.tourState && isLoaded} onClose={actions.toggleTour} steps={steps} type="primary" />;
};

export default TourComponent;
