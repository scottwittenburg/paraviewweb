export function affine(inMin, val, inMax, outMin, outMax) {
  return ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

export function perfRound(val) {
  /* eslint-disable no-bitwise */
  return (0.5 + val) | 0;
  /* eslint-enable no-bitwise */
}

export function dataToScreen(model, dataY, axis) {
  return perfRound(
    !axis.isUpsideDown()
      ? affine(
          axis.range[0],
          dataY,
          axis.range[1],
          model.canvasArea.height - model.borderOffsetBottom,
          model.borderOffsetTop
        )
      : affine(
          axis.range[0],
          dataY,
          axis.range[1],
          model.borderOffsetTop,
          model.canvasArea.height - model.borderOffsetBottom
        )
  );
}

export function screenToData(model, screenY, axis) {
  return !axis.isUpsideDown()
    ? affine(
        model.canvasArea.height - model.borderOffsetBottom,
        screenY,
        model.borderOffsetTop,
        axis.range[0],
        axis.range[1]
      )
    : affine(
        model.borderOffsetTop,
        screenY,
        model.canvasArea.height - model.borderOffsetBottom,
        axis.range[0],
        axis.range[1]
      );
}

export function toColorArray(colorString) {
  return [
    Number.parseInt(colorString.slice(1, 3), 16),
    Number.parseInt(colorString.slice(3, 5), 16),
    Number.parseInt(colorString.slice(5, 7), 16),
  ];
}
