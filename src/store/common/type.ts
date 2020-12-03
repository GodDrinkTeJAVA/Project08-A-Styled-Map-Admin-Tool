import { init, setStyle } from '../style/action';
import { setSidebarProperties, initSidebarProperties } from '../sidebar/action';

export type hello = 'landmark';

export enum ElementNameType {
  section = 'section',
  labelText = 'labelText',
  labelIcon = 'labelIcon',
}

export enum SubElementNameType {
  fill = 'fill',
  stroke = 'stroke',
}

export enum StyleKeyType {
  visibility = 'visibility',
  color = 'color',
  weight = 'weight',
  saturation = 'saturation',
  lightness = 'lightness',
  isChanged = 'isChanged',
}

export enum FeatureNameType {
  poi = 'poi',
  administrative = 'administrative',
  landscape = 'landscape',
  road = 'road',
  transit = 'transit',
  water = 'water',
  marker = 'marker',
}

export interface objType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

export interface StyleType {
  isChanged: boolean;
  visibility: string;
  color: string;
  weight: number;
  saturation: number;
  lightness: number;
}
export interface SubElementType {
  fill: StyleType;
  stroke: StyleType;
}
export interface FeatureType {
  isChanged: boolean;
  section: SubElementType | null;
  labelText: SubElementType | null;
  labelIcon: StyleType | null;
}
export interface FeatureState {
  [name: string]: FeatureType;
}

export interface FeaturePropsType {
  feature: FeatureNameType;
  subFeature: string;
}

export interface ElementPropsType extends FeaturePropsType {
  element: ElementNameType;
  subElement?: SubElementNameType;
}

export type ActionType = ReturnType<typeof init> | ReturnType<typeof setStyle>;
export type SidebarActionType =
  | ReturnType<typeof setSidebarProperties>
  | ReturnType<typeof initSidebarProperties>;
export interface ActionPayload extends ElementPropsType {
  style: StyleType;
}

export interface PayloadPropsType {
  key: 'feature' | 'subFeature' | 'element' | 'subElement';
  feature: FeatureNameType | null;
  subFeature: string | null;
  element: ElementNameType | null;
  subElement: SubElementNameType | null;
}

export interface StylePropsType {
  [SubElementNameType.fill]: string;
  [SubElementNameType.stroke]: string;
}

export type PropertyType = {
  [featureName in FeatureNameType]: {
    [subFeatureName: string]: {
      [ElementNameType.section]?: StylePropsType | null;
      [ElementNameType.labelText]?: StylePropsType | null;
      [ElementNameType.labelIcon]?: string | null;
    };
  };
};
