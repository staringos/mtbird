import React, { useContext, useEffect, useState } from 'react';
import { Tour, TourProps } from 'antd';
import Model from '../../store/types';
import { getTabFromInnerText } from '@mtbird/core';

const steps: TourProps['steps'] = [
  {
    title: '👏 欢迎使用星搭编辑器',
    cover: <img alt="tour.png" src="https://mtbird-cdn.staringos.com/product/movies/example-mini-2.gif" />,
    description: '为了让您更快上手使用编辑器，我们用两分钟，引导您使用基础的功能。如果您已经熟悉了星搭编辑器的使用，可以点击右上角的按钮关闭引导',
    target: null
  },
  {
    title: '添加组件',
    description: (
      <p>
        在左侧工具面板，可以选择组件，点击即可添加到页面上.星搭组件分为三种类型，
        <br />
        容器组件: 可以容纳其它组件的容器
        <br />
        表单组件: 如输入框、选择框等，表单或表单项 <br /> 原子组件: 如图片、视频等普通组件
      </p>
    ),
    target: () => document.getElementById('commonToolBar') as HTMLElement
  },
  {
    title: '图库',
    description: '图库中是来自 unsplash 的免费可商用图片，可以添加到您的页面中.',
    target: () => getTabFromInnerText('图库')
  },
  {
    title: '表单组件',
    cover: <img alt="tour.png" height="300px" src="https://mtbird-cdn.staringos.com/product/assets/TourForm.gif" />,
    description: '您可以在页面中添加表单以获取用户输入信息，表单组件需先添加一个表单（容器），后选择表单项一次加入到表单容器中.',
    target: () => getTabFromInnerText('表单')
  },
  {
    title: '组合',
    description:
      '当选中两个或多个组件的时候，我们可以将选中的组件组合起来，比如我们按住 shift（多选），点击选择一个按钮、一个文本组件，点击组合按钮。两个组件就被放到了一个分组里，这个分组本质上也是在两个组件外层套上了一个 容器组件。',
    cover: <img alt="tour.png" src="https://cdn.staringos.com/b218013d73e74aadff36.png" />,
    target: () => document.getElementById('groupBtn') as HTMLElement
  },
  {
    title: '保存为组件模版',
    cover: <img alt="tour.png" src="https://mtbird-cdn.staringos.com/product/assets/TourComponentTemplate.gif" />,
    description: '您可以在页面中添加表单以获取用户输入信息，表单组件需先添加一个表单（容器），后选择表单项一次加入到表单容器中.',
    target: () => document.getElementById('saveComponentTemplateBtn') as HTMLElement
  },
  {
    title: '设置动画',
    description:
      '可以通过 动画面板 实现动画设置。选择不同的动作类型，设置动画是否循环播放。延迟时间：页面加载完成到动画开始播放的延迟时间，如动画设置为循环播放，那么也是每次动画播放的间隔时间 持续时间：动画每轮播放的持续时间',
    cover: <img alt="tour.png" src="https://mtbird-cdn.staringos.com/product/assets/TourAnimate.gif" />,
    target: () => getTabFromInnerText('动画')
  },
  {
    title: '设置动作',
    description:
      '可以通过动作面板为组件添加动作事件，如果为按钮添加点击事件，可以选择行为为 点击 动作为 跳转页面，输入要跳转的页面的 URL，即可实现按钮点击的时候执行该动作.',
    cover: <img alt="tour.png" src="https://cdn.staringos.com/5af01bbe0fc9bd270b78.png" />,
    target: () => getTabFromInnerText('动作')
  },
  {
    title: '设置屏幕跟随',
    description: '您可以对某一个组件设置屏幕跟随，这样您在滚动页面的时候，这个组件就会被固定在屏幕的某一个位置.',
    cover: <img alt="tour.png" src="https://cdn.staringos.com/b218013d73e74aadff36.png" />,
    target: () => document.getElementById('stickyPanelBtn') as HTMLElement
  },
  {
    title: '区块组件',
    cover: <img alt="tour.png" height="300px" src="https://cdn.staringos.com/81643be3aec9d29b106d.png" />,
    description:
      '区块 是页面的一个段落，我们页面的直接子元素只能是一个个 区块。长的落地页会被拆分成一节节的区块。比如我们下面这个页面就是由四个区块组成.',
    target: () => document.getElementById('ContainerBlockBox') as HTMLElement
  },
  {
    title: '完成引导',
    description: (
      <p>
        🎉 恭喜，您已经完成基础引导，快去体验无代码编辑吧！～如想进一步了解，可以查看<a href="https://docs.staringos.com">星搭文档中心</a>.
      </p>
    ),
    cover: <img alt="tour.png" src="https://mtbird-cdn.staringos.com/product/assets/TourCover1.jpg" />
  }
];

const TourComponent = () => {
  const { actions, state } = useContext(Model);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true));
  }, []);

  if (!state.tourState) return <div />;

  const handleChange = (index: number) => {
    if (index === 3) {
      actions.onSelect(state.pageConfig.data.children[0]);
    }
  };

  return <Tour open={state.tourState && isLoaded} onClose={actions.toggleTour} steps={steps} type="primary" onChange={handleChange} />;
};

export default TourComponent;
