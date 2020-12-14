import mapboxgl from 'mapbox-gl';
import {
  init,
  replaceWholeStyle,
  replaceFeatureStyle,
  setStyle,
  setWholeStyle,
  initColors,
} from '../style/action';
import { setSidebarProperties, initSidebarProperties } from '../sidebar/action';
import {
  INIT_HISTORY,
  ADD_LOG,
  SET_CURRENT_INDEX,
  RESET_HISTORY,
} from '../history/action';
import { MarkerType, MarkerInstanceType } from '../marker/action';

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

export enum VisibilityValueType {
  visible = 'visible',
  none = 'none',
  inherit = 'inherit',
}

export enum FeatureNameType {
  poi = 'poi',
  administrative = 'administrative',
  landscape = 'landscape',
  road = 'road',
  transit = 'transit',
  water = 'water',
}

export enum SidebarProperties {
  feature = 'feature',
  subFeature = 'subFeature',
  element = 'element',
  subElement = 'subElement',
}

export enum PoiNameType {
  all = 'all',
  landmark = 'landmark',
  business = 'business',
  government = 'government',
  medical = 'medical',
  park = 'park',
  worship = 'worship',
  school = 'school',
  sports = 'sports',
  etc = 'etc',
}

export enum RoadNameType {
  all = 'all',
  arterial = 'arterial',
  local = 'local',
  sidewalk = 'sidewalk',
}

export enum AdministrativeNameType {
  all = 'all',
  country = 'country',
  state = 'state',
  locality = 'locality',
}

export enum LandScapeNameType {
  all = 'all',
  'humanmade' = 'humanmade',
  building = 'building',
  natural = 'natural',
  landcover = 'landcover',
  mountain = 'mountain',
}

export enum TransitNameType {
  all = 'all',
  airport = 'airport',
  bus = 'bus',
  rail = 'rail',
  subway = 'subway',
}

export enum WaterNameType {
  all = 'all',
}

export const SubFeatureNameType = {
  ...PoiNameType,
  ...RoadNameType,
  ...LandScapeNameType,
  ...TransitNameType,
  ...AdministrativeNameType,
  ...WaterNameType,
};
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SubFeatureNameType = typeof SubFeatureNameType;

export interface objType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

/** Style Feature Type for Redux */
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

export interface ActionPayload extends ElementPropsType {
  style: StyleType;
}

export type ActionType =
  | ReturnType<typeof init>
  | ReturnType<typeof setStyle>
  | ReturnType<typeof setWholeStyle>
  | ReturnType<typeof replaceFeatureStyle>
  | ReturnType<typeof replaceWholeStyle>
  | ReturnType<typeof initColors>;

/** Style Stores Type for Replace */
export type StyleStoreType = {
  [featureName in FeatureNameType]: FeatureState;
};

/** History Type for Redux */
export interface HistorySetLogType {
  id?: string;
  changedValue: string | number;
  changedKey: StyleKeyType;
  feature: FeatureNameType;
  subFeature: string;
  element: ElementNameType;
  subElement?: SubElementNameType;
  style: StyleType;
  wholeStyle: StyleStoreType;
}

export enum ReplaceType {
  init = 'init',
  import = 'import',
  theme = 'theme',
  depth = 'depth',
}

export interface DepthLogChangedValueType {
  feature: FeatureNameType;
  depth: number;
}
export interface HistoryReplaceLogType {
  id?: string;
  changedValue?: string | DepthLogChangedValueType;
  changedKey: ReplaceType;
  wholeStyle: StyleStoreType;
}

export type HistoryInfoPropsType = HistorySetLogType | HistoryReplaceLogType;

export interface HistoryState {
  log?: HistoryInfoPropsType[];
  currentIdx: number | null;
}

export interface SetIndexPayload {
  currentIndex: number;
}

export interface HistoryActionType {
  type:
    | typeof INIT_HISTORY
    | typeof ADD_LOG
    | typeof SET_CURRENT_INDEX
    | typeof RESET_HISTORY;
  payload: null | SetIndexPayload | HistorySetLogType | HistoryReplaceLogType;
}

/** Sidebar Type for Redux */
export type SidebarActionType =
  | ReturnType<typeof setSidebarProperties>
  | ReturnType<typeof initSidebarProperties>;

export interface SidebarState {
  key: 'feature' | 'subFeature' | 'element' | 'subElement';
  feature: FeatureNameType | null;
  subFeature: string | null;
  element: ElementNameType | null;
  subElement: SubElementNameType | null;
}

/** Whole Style Type for Set */
export interface StyleActionPayload {
  isChanged?: boolean;
  visibility?: string;
  color?: string;
  weight?: number;
  saturation?: number;
  lightness?: number;
}
export interface SubElementActionPayload {
  [SubElementNameType.fill]?: StyleActionPayload;
  [SubElementNameType.stroke]?: StyleActionPayload;
}

export interface ElementActionPayload {
  [ElementNameType.section]?: SubElementActionPayload;
  [ElementNameType.labelText]?: SubElementActionPayload;
  [ElementNameType.labelIcon]?: StyleActionPayload;
}

export interface SubFeatureActionPayload {
  [subFeatureName: string]: ElementActionPayload;
}

export type WholeStyleActionPayload = {
  [featureName in FeatureNameType]?: SubFeatureActionPayload;
};

export interface StylePropsType {
  [SubElementNameType.fill]: string;
  [SubElementNameType.stroke]: string;
}

export interface StyleElementPropsType {
  [ElementNameType.section]?: StylePropsType | null;
  [ElementNameType.labelText]?: StylePropsType | null;
  [ElementNameType.labelIcon]?: string | null;
}

export type FeaturePropertyType = {
  [subFeatureName: string]: StyleElementPropsType;
};

export type PropertyType = {
  [featureName in FeatureNameType]: FeaturePropertyType;
};

/** export type */
export enum LocationTypeName {
  zoom = 'zoom',
  lng = 'lng',
  lat = 'lat',
}

export interface LocationType {
  [LocationTypeName.zoom]?: number;
  [LocationTypeName.lng]?: number;
  [LocationTypeName.lat]?: number;
}

export enum locationTypeName {
  zoom = 'zoom',
  lng = 'lng',
  lat = 'lat',
}

/** defatult style Type */
export type DefaultStyleType = {
  color: string;
  weight: number;
};

export type DefaultElementType = {
  fill: DefaultStyleType;
  stroke: DefaultStyleType;
};

export type DefaultFeatureType = {
  [subFeatureName: string]: {
    [ElementNameType.section]?: DefaultElementType;
    [ElementNameType.labelText]?: DefaultElementType;
    [ElementNameType.labelIcon]?: DefaultStyleType;
  };
};

export type DefaultWholeStyle = {
  [featureName in FeatureNameType]: DefaultFeatureType;
};

/** urlJson Type */
export interface URLJsonStyleType {
  isChanged?: boolean;
  visibility?: string;
  color?: string;
  weight?: number;
  saturation?: number;
  lightness?: number;
}

export type URLJsonSubElementType = {
  [subElementName in SubElementNameType]?: URLJsonStyleType;
};

export type URLJsonElementType = {
  [ElementNameType.section]?: URLJsonSubElementType;
  [ElementNameType.labelText]?: URLJsonSubElementType;
  [ElementNameType.labelIcon]?: URLJsonStyleType;
};

export type URLJsonSubFeatureType = {
  [subFeatureName: string]: URLJsonElementType;
};

export type URLJsonFeatureType = {
  [featureName in FeatureNameType]?: URLJsonSubFeatureType;
};

export type URLJsonType = {
  filteredStyle?: URLJsonFeatureType;
  mapCoordinate?: LocationType | null;
  markers?: MarkerType[] | null;
};

export enum URLPathNameType {
  root = '/',
  map = '/map',
  show = '/show',
}

/** ReduxStateType */
export interface ReduxStateType {
  map: mapboxgl.Map;
  sidebar: SidebarState;
  history: HistoryState;
  features: StyleStoreType;
  marker: MarkerInstanceType[];
}
