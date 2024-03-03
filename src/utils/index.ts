export function updateSvgFillColor(
  container: HTMLElement,
  colorList: { selector: string; color: string }[]
) {
  colorList.forEach((item) => {
    const elements = container.querySelectorAll(item.selector);
    elements.forEach((element) => {
      element.setAttribute("fill", item.color);
    });
  });
}
