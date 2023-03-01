// here is code from arco-design and @arco-design/color, THX!
// http://dwbbb.com/blog/ant-design-palettes/#comment-3679988230

const Color = require("color");

const formats = ["hex", "rgb", "hsl"];

function getFormat(format) {
  if (!format || formats.indexOf(format) < 0) {
    return "hex";
  }
  return format;
}

const getColorString = function (color, format) {
  const innerFormat = getFormat(format);
  if (innerFormat === "hex") {
    if (!color[innerFormat]) {
      return `rgb(${color.values.rgb.join(",")})`;
    }
    return color[innerFormat]();
  }
  return color[innerFormat]().round().string();
};

// 动态梯度算法
function colorPalette(originColor, i, format) {
  const color = Color(originColor);
  const h = color.hue();
  const s = color.saturationv();
  const v = color.value();

  const hueStep = 2;
  const maxSaturationStep = 100;
  const minSaturationStep = 9;

  const maxValue = 100;
  const minValue = 30;

  function getNewHue(isLight, i) {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i;
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  }

  function getNewSaturation(isLight, i) {
    let newSaturation;

    if (isLight) {
      newSaturation =
        s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i;
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * i;
    }
    return newSaturation;
  }

  function getNewValue(isLight, i) {
    return isLight
      ? v + ((maxValue - v) / 5) * i
      : v <= minValue
      ? v
      : v - ((v - minValue) / 4) * i;
  }

  const isLight = i < 6;
  const index = isLight ? 6 - i : i - 6;

  const retColor =
    i === 6
      ? color
      : Color({
          h: getNewHue(isLight, index),
          s: getNewSaturation(isLight, index),
          v: getNewValue(isLight, index),
        });

  return getColorString(retColor, format);
}

// TODO dark mode
function colorPaletteDark(color, index, format) {}

/**
 * @param {string} color
 * @param {Object} options
 * @param {number} options.index 1 - 10 (default: 6)
 * @param {boolean} options.dark
 * @param {boolean} options.list
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 *
 * @return string | string[]
 */
function generate(color, options = {}) {
  const { dark, list, index = 6, format = "hex" } = options;

  if (list) {
    const list = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for (let i = 1; i <= 10; i++) {
      list.push(func(color, i, format));
    }
    return list;
  }
  return dark
    ? colorPaletteDark(color, index, format)
    : colorPalette(color, index, format);
}

module.exports = {
  install(_, __, functions) {
    functions.add("color-palette", (color, index) => {
      const res = generate(color.value, { index: index.value });
      return res;
    });
  },
};
