import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";
import { STORY_RENDERED } from "@storybook/core-events";

export default create({
  base: "light",
  brandTitle: "星搭精卫 - 营销落地页、表单填报低代码平台",
  brandUrl: "https://staringos.com",
  brandImage: "https://mtbird-cdn.staringos.com/logo.png",
  brandTarget: "_blank",
});

addons.register("TitleAddon", (api) => {
  const customTitle = "- 星搭精卫 - 营销落地页、表单填报低代码平台";
  let interval = null;
  const setTitle = () => {
    clearTimeout(interval);

    let storyData = null;
    try {
      storyData = api.getCurrentStoryData();
    } catch (e) {}

    let title;
    if (!storyData) {
      title = customTitle;
    } else {
      title = `${storyData.kind} ${customTitle}`;
    }

    if (document.title !== title) {
      document.title = title;
    }
    interval = setTimeout(setTitle, 100);
  };
  setTitle();
  api.on(STORY_RENDERED, (story) => {
    setTitle();
  });
});
