import { WidgetType } from './enums';

type Data = Readonly<{
  [key in WidgetType]: (() => Promise<{ default: string }>)[];
}>;

const widgetData: Data = {
  [WidgetType.Head]: [
    () => import('../assets/widgets/head/1.svg?raw'),
    () => import('../assets/widgets/head/2.svg?raw'),
    () => import('../assets/widgets/head/3.svg?raw'),
    () => import('../assets/widgets/head/4.svg?raw'),
    () => import('../assets/widgets/head/5.svg?raw'),
    () => import('../assets/widgets/head/6.svg?raw'),
    () => import('../assets/widgets/head/7.svg?raw'),
    () => import('../assets/widgets/head/8.svg?raw'),
    () => import('../assets/widgets/head/9.svg?raw'),
    () => import('../assets/widgets/head/10.svg?raw'),
    () => import('../assets/widgets/head/11.svg?raw'),
    () => import('../assets/widgets/head/12.svg?raw'),
    () => import('../assets/widgets/head/13.svg?raw'),
    () => import('../assets/widgets/head/14.svg?raw'),
    () => import('../assets/widgets/head/15.svg?raw'),
    () => import('../assets/widgets/head/16.svg?raw'),
    () => import('../assets/widgets/head/17.svg?raw'),
    () => import('../assets/widgets/head/18.svg?raw'),
    () => import('../assets/widgets/head/19.svg?raw'),
    () => import('../assets/widgets/head/20.svg?raw'),
    () => import('../assets/widgets/head/21.svg?raw'),
    () => import('../assets/widgets/head/22.svg?raw'),
    () => import('../assets/widgets/head/23.svg?raw'),
    () => import('../assets/widgets/head/24.svg?raw'),
  ],
  [WidgetType.Body]: [
    () => import('../assets/widgets/body/1.svg?raw'),
    () => import('../assets/widgets/body/2.svg?raw'),
    () => import('../assets/widgets/body/3.svg?raw'),
    () => import('../assets/widgets/body/4.svg?raw'),
    () => import('../assets/widgets/body/5.svg?raw'),
    () => import('../assets/widgets/body/6.svg?raw'),
    () => import('../assets/widgets/body/7.svg?raw'),
    () => import('../assets/widgets/body/8.svg?raw'),
  ],
  [WidgetType.Bottom]: [
    () => import('../assets/widgets/bottom/1.svg?raw'),
    () => import('../assets/widgets/bottom/2.svg?raw'),
    () => import('../assets/widgets/bottom/3.svg?raw'),
    () => import('../assets/widgets/bottom/4.svg?raw'),
    () => import('../assets/widgets/bottom/5.svg?raw'),
    () => import('../assets/widgets/bottom/6.svg?raw'),
    () => import('../assets/widgets/bottom/7.svg?raw'),
    () => import('../assets/widgets/bottom/8.svg?raw'),
  ],
  [WidgetType.Item]: [
    () => Promise.resolve({ default: '' }),
    () => import('../assets/widgets/item/1.svg?raw'),
    () => import('../assets/widgets/item/2.svg?raw'),
    () => import('../assets/widgets/item/3.svg?raw'),
    () => import('../assets/widgets/item/4.svg?raw'),
    () => import('../assets/widgets/item/5.svg?raw'),
    () => import('../assets/widgets/item/6.svg?raw'),
    () => import('../assets/widgets/item/7.svg?raw'),
    () => import('../assets/widgets/item/8.svg?raw'),
  ],
};

export { widgetData };
