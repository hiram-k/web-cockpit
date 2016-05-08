/// <reference path="../typings/react.d.ts" />

declare module "react-grid-layout-wrapper"
{
  interface IReactGridLayoutProps
  {
    id?: number | string;
    className?: string;
    margin?: [number, number];
    onLayoutChange?: (layouts: IGridLayoutInfo[]) => void;
    layout: any[];
    cols: number;
    rowHeight: number;
    width: number;
  }
  
  export interface IGridLayoutInfo
  {
    w: number;
    h: number;
    i: string;
    maxW: number;
    maxH: number;
    x: number;
    y: number;
    static?: boolean;
  }

  export class ReactGridLayout extends __React.Component<IReactGridLayoutProps, {}>
  {
  }

}
