export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ContainerDims {
  width: number;
  height: number;
}

export type LayoutType =
  | "tile"
  | "vertical-tile"
  | "grid"
  | "vertical-grid"
  | "scroller"
  | "vertical-scroller"
  | "monocle"
  | "deck"
  | "vertical-deck"
  | "center-tile"
  | "right-tile"
  | "tgmix"
  | "overview";

// ---------------------------------------------------------------------------
// Layout metadata
// ---------------------------------------------------------------------------

export interface LayoutInfo {
  name: string;
  description: string;
  hasMaster: boolean;
  hasMasterFactor: boolean;
  hasScroller: boolean;
  hasCenterTile: boolean;
  hasOverview: boolean;
}

export const LAYOUTS: Record<LayoutType, LayoutInfo> = {
  tile:                { name: "Tile",           description: "Classic master-stack tiling (horizontal)",  hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: false, hasOverview: false },
  "vertical-tile":     { name: "Vertical Tile",  description: "Master-stack tiling (vertical)",            hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: false, hasOverview: false },
  grid:                { name: "Grid",           description: "Equal-sized grid arrangement (horizontal)", hasMaster: false, hasMasterFactor: false, hasScroller: false, hasCenterTile: false, hasOverview: false },
  "vertical-grid":     { name: "Vertical Grid",  description: "Equal-sized grid arrangement (vertical)",  hasMaster: false, hasMasterFactor: false, hasScroller: false, hasCenterTile: false, hasOverview: false },
  scroller:            { name: "Scroller",       description: "Horizontal scrolling layout",              hasMaster: false, hasMasterFactor: false, hasScroller: true,  hasCenterTile: false, hasOverview: false },
  "vertical-scroller": { name: "Vert. Scroller", description: "Vertical scrolling layout",               hasMaster: false, hasMasterFactor: false, hasScroller: true,  hasCenterTile: false, hasOverview: false },
  monocle:             { name: "Monocle",        description: "Fullscreen single window",                 hasMaster: false, hasMasterFactor: false, hasScroller: false, hasCenterTile: false, hasOverview: false },
  deck:                { name: "Deck",           description: "Stacked overlapping windows (horizontal)", hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: false, hasOverview: false },
  "vertical-deck":     { name: "Vertical Deck",  description: "Stacked overlapping windows (vertical)",  hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: false, hasOverview: false },
  "center-tile":       { name: "Center Tile",    description: "Centered master with tiled stack",         hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: true,  hasOverview: false },
  "right-tile":        { name: "Right Tile",     description: "Master on right side",                     hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: false, hasOverview: false },
  tgmix:               { name: "TGMix",          description: "Tile for 1–3 windows, grid for 4+",        hasMaster: true,  hasMasterFactor: true,  hasScroller: false, hasCenterTile: false, hasOverview: false },
  overview:            { name: "Overview",        description: "Overview mode layout",                     hasMaster: false, hasMasterFactor: false, hasScroller: false, hasCenterTile: false, hasOverview: true  },
};

export const LAYOUT_KEYS = Object.keys(LAYOUTS) as LayoutType[];

// ---------------------------------------------------------------------------
// Monitor (orientation only)
// ---------------------------------------------------------------------------

export interface MonitorParams {
  isPortrait: boolean;
}

export const DEFAULT_MONITOR_PARAMS: MonitorParams = {
  isPortrait: false,
};

// ---------------------------------------------------------------------------
// Layout config / params
// ---------------------------------------------------------------------------

export interface LayoutConfig {
  type: LayoutType;
  masterCount: number;
  masterFactor: number;
  smartGaps: boolean;
  gapOuterH: number;
  gapOuterV: number;
  gapInnerH: number;
  gapInnerV: number;
  newIsMaster: boolean;
  centerMasterOverspread: boolean;
  centerWhenSingleStack: boolean;
  scrollerStructs: number;
  scrollerDefaultProportion: number;
  scrollerDefaultProportionSingle: number;
  scrollerIgnoreSingle: boolean;
  scrollerFocusCenter: boolean;
  scrollerPreferCenter: boolean;
  scrollerPreferOverspread: boolean;
  scrollerEdgePointerFocus: boolean;
  overviewGapInner: number;
  overviewGapOuter: number;
}

/** Runtime params used by the Editor (includes UI-only fields like windowCount/focusedWindow). */
export interface LayoutParams extends Omit<LayoutConfig, "type"> {
  windowCount: number;
  focusedWindow: number;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_LAYOUT_PARAMS: LayoutParams = {
  windowCount: 4,
  masterCount: 1,
  masterFactor: 0.55,
  focusedWindow: 3,
  smartGaps: false,
  gapOuterH: 10,
  gapOuterV: 10,
  gapInnerH: 5,
  gapInnerV: 5,
  newIsMaster: true,
  centerMasterOverspread: false,
  centerWhenSingleStack: true,
  scrollerStructs: 20,
  scrollerDefaultProportion: 0.9,
  scrollerDefaultProportionSingle: 1.0,
  scrollerIgnoreSingle: true,
  scrollerFocusCenter: false,
  scrollerPreferCenter: false,
  scrollerPreferOverspread: true,
  scrollerEdgePointerFocus: true,
  overviewGapInner: 5,
  overviewGapOuter: 30,
};

/** @deprecated Use DEFAULT_LAYOUT_PARAMS */
export const DEFAULT_LAYOUT_CONFIG: Omit<LayoutConfig, "type"> = DEFAULT_LAYOUT_PARAMS;

export const GAP_OUTER = 10;
export const GAP_INNER = 5;
