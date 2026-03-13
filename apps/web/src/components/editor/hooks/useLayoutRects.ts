import { useMemo } from "react";
import type { LayoutType, LayoutParams, ContainerDims } from "../types";
import type { LayoutGapParams, ScrollerConfig, CenterTileConfig } from "../calculators";
import {
  calculateTileLayout,
  calculateVerticalTileLayout,
  calculateGridLayout,
  calculateVerticalGridLayout,
  calculateMonocleLayout,
  calculateDeckLayout,
  calculateVerticalDeckLayout,
  calculateCenterTileLayout,
  calculateRightTileLayout,
  calculateScrollerLayout,
  calculateVerticalScrollerLayout,
  calculateTgmixLayout,
  calculateOverviewLayout,
} from "../calculators";
import type { WindowRect } from "../types";

export function useLayoutRects(
  layoutType: LayoutType,
  container: ContainerDims,
  params: LayoutParams,
): WindowRect[] {
  return useMemo(() => {
    const gapParams: LayoutGapParams = {
      smartGaps: params.smartGaps,
      gapOuterH: params.gapOuterH,
      gapOuterV: params.gapOuterV,
      gapInnerH: params.gapInnerH,
      gapInnerV: params.gapInnerV,
    };
    const scrollerConfig: ScrollerConfig = {
      scrollerStructs: params.scrollerStructs,
      scrollerDefaultProportion: params.scrollerDefaultProportion,
      scrollerDefaultProportionSingle: params.scrollerDefaultProportionSingle,
      scrollerIgnoreSingle: params.scrollerIgnoreSingle,
      scrollerFocusCenter: params.scrollerFocusCenter,
      scrollerPreferCenter: params.scrollerPreferCenter,
      scrollerPreferOverspread: params.scrollerPreferOverspread,
    };
    const centerTileConfig: CenterTileConfig = {
      centerMasterOverspread: params.centerMasterOverspread,
      centerWhenSingleStack: params.centerWhenSingleStack,
    };
    const { windowCount: n, masterCount: mc, masterFactor: mf, newIsMaster: nim } = params;

    switch (layoutType) {
      case "tile":
        return calculateTileLayout(container, n, mc, mf, gapParams, [], [], nim);
      case "vertical-tile":
        return calculateVerticalTileLayout(container, n, mc, mf, gapParams, [], [], nim);
      case "grid":
        return calculateGridLayout(container, n, gapParams);
      case "vertical-grid":
        return calculateVerticalGridLayout(container, n, gapParams);
      case "scroller":
        return calculateScrollerLayout(
          container,
          n,
          params.focusedWindow,
          gapParams,
          scrollerConfig,
          [],
        );
      case "vertical-scroller":
        return calculateVerticalScrollerLayout(
          container,
          n,
          params.focusedWindow,
          gapParams,
          scrollerConfig,
          [],
        );
      case "monocle":
        return calculateMonocleLayout(container, n);
      case "deck":
        return calculateDeckLayout(container, n, mc, mf, gapParams, nim);
      case "vertical-deck":
        return calculateVerticalDeckLayout(container, n, mc, mf, gapParams, nim);
      case "center-tile":
        return calculateCenterTileLayout(
          container,
          n,
          mc,
          mf,
          gapParams,
          centerTileConfig,
          [],
          [],
          nim,
        );
      case "right-tile":
        return calculateRightTileLayout(container, n, mc, mf, gapParams, [], [], nim);
      case "tgmix":
        return calculateTgmixLayout(container, n, mc, mf, nim);
      case "overview":
        return calculateOverviewLayout(
          container,
          n,
          params.overviewGapOuter,
          params.overviewGapInner,
        );
      default:
        return calculateTileLayout(container, n, mc, mf, gapParams, [], [], nim);
    }
  }, [layoutType, container, params]);
}
