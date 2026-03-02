"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import { WindowRect } from "./WindowRect";
import {
  calculateTileLayout, calculateVerticalTileLayout,
  calculateGridLayout, calculateVerticalGridLayout,
  calculateMonocleLayout,
  calculateDeckLayout, calculateVerticalDeckLayout,
  calculateCenterTileLayout, calculateRightTileLayout,
  calculateScrollerLayout, calculateVerticalScrollerLayout,
  calculateTgmixLayout, calculateOverviewLayout,
  type ScrollerConfig, type CenterTileConfig,
} from "./calculators";
import {
  LAYOUTS, LAYOUT_KEYS,
  DEFAULT_LAYOUT_PARAMS, DEFAULT_MONITOR_PARAMS,
  type LayoutType, type LayoutParams, type MonitorParams,
} from "./types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ConfigExportPanel } from "./ConfigExportPanel";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PREVIEW_SCALE = 0.38;

// ---------------------------------------------------------------------------
// Primitive UI components
// ---------------------------------------------------------------------------

function ConfigSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      {children}
      <Separator />
    </div>
  );
}

function SliderRow({
  label, value, min, max, step = 1, onChange, formatValue,
}: {
  label: string; value: number; min: number; max: number;
  step?: number; onChange: (v: number) => void; formatValue?: (v: number) => string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <span className="w-12 text-right font-mono text-sm tabular-nums text-foreground">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <div className="[&_[data-slider-track]]:h-[3px] [&_[data-slider-thumb]]:h-3 [&_[data-slider-thumb]]:w-3">
        <Slider
          min={min} max={max} step={step} value={value}
          onValueChange={(v: number | readonly number[]) =>
            onChange(Array.isArray(v) ? (v as number[])[0] : (v as number))
          }
        />
      </div>
    </div>
  );
}

function SwitchRow({ label, checked, onCheckedChange }: {
  label: string; checked: boolean; onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label className="cursor-pointer text-sm text-muted-foreground">{label}</Label>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar sections
// ---------------------------------------------------------------------------

function MonitorSection({
  monitor, onUpdate,
}: {
  monitor: MonitorParams;
  onUpdate: (u: Partial<MonitorParams>) => void;
}) {
  return (
    <ConfigSection title="Orientation">
      <div className="flex gap-1.5">
        <Button
          size="sm"
          variant={!monitor.isPortrait ? "default" : "outline"}
          className="h-10 flex-1 text-sm"
          onClick={() => onUpdate({ isPortrait: false })}
        >
          Horizontal
        </Button>
        <Button
          size="sm"
          variant={monitor.isPortrait ? "default" : "outline"}
          className="h-10 flex-1 text-sm"
          onClick={() => onUpdate({ isPortrait: true })}
        >
          Vertical
        </Button>
      </div>
    </ConfigSection>
  );
}

function GeneralSection({
  params, onUpdate,
}: {
  params: LayoutParams;
  onUpdate: (u: Partial<LayoutParams>) => void;
}) {
  return (
    <ConfigSection title="General">
      <SliderRow
        label="Windows" value={params.windowCount} min={1} max={12}
        onChange={(v) => onUpdate({ windowCount: v, focusedWindow: v - 1 })}
      />
      <SwitchRow label="Smart Gaps" checked={params.smartGaps} onCheckedChange={(v) => onUpdate({ smartGaps: v })} />
    </ConfigSection>
  );
}

function GapsSection({ params, onUpdate }: { params: LayoutParams; onUpdate: (u: Partial<LayoutParams>) => void }) {
  const px = (v: number) => `${v}px`;
  return (
    <ConfigSection title="Gaps">
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        <SliderRow label="Outer H" value={params.gapOuterH} min={0} max={40} step={5} onChange={(v) => onUpdate({ gapOuterH: v })} formatValue={px} />
        <SliderRow label="Outer V" value={params.gapOuterV} min={0} max={40} step={5} onChange={(v) => onUpdate({ gapOuterV: v })} formatValue={px} />
        <SliderRow label="Inner H" value={params.gapInnerH} min={0} max={40} step={5} onChange={(v) => onUpdate({ gapInnerH: v })} formatValue={px} />
        <SliderRow label="Inner V" value={params.gapInnerV} min={0} max={40} step={5} onChange={(v) => onUpdate({ gapInnerV: v })} formatValue={px} />
      </div>
    </ConfigSection>
  );
}

function MasterSection({
  params, hasMasterFactor, onUpdate,
}: {
  params: LayoutParams;
  hasMasterFactor: boolean;
  onUpdate: (u: Partial<LayoutParams>) => void;
}) {
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  return (
    <ConfigSection title="Master Area">
      <SliderRow
        label="Count" value={params.masterCount} min={0} max={12}
        onChange={(v) => onUpdate({ masterCount: v })}
      />
      {hasMasterFactor && (
        <SliderRow
          label="Factor" value={params.masterFactor} min={0.2} max={0.8} step={0.05}
          onChange={(v) => onUpdate({ masterFactor: v })} formatValue={pct}
        />
      )}
      <SwitchRow label="New is Master" checked={params.newIsMaster} onCheckedChange={(v) => onUpdate({ newIsMaster: v })} />
    </ConfigSection>
  );
}

function CenterTileSection({ params, onUpdate }: { params: LayoutParams; onUpdate: (u: Partial<LayoutParams>) => void }) {
  return (
    <ConfigSection title="Center Tile">
      <SwitchRow label="Overspread"         checked={params.centerMasterOverspread} onCheckedChange={(v) => onUpdate({ centerMasterOverspread: v })} />
      <SwitchRow label="Center When Single" checked={params.centerWhenSingleStack}  onCheckedChange={(v) => onUpdate({ centerWhenSingleStack: v })} />
    </ConfigSection>
  );
}

function ScrollerSection({ params, onUpdate }: { params: LayoutParams; onUpdate: (u: Partial<LayoutParams>) => void }) {
  const pct = (v: number) => `${Math.round(v * 100)}%`;
  return (
    <ConfigSection title="Scroller">
      <SliderRow label="Structs"    value={params.scrollerStructs}                  min={0}   max={100} step={5}  onChange={(v) => onUpdate({ scrollerStructs: v })} />
      <SliderRow label="Proportion" value={params.scrollerDefaultProportion}        min={0.3} max={1.0} step={0.1} onChange={(v) => onUpdate({ scrollerDefaultProportion: v })} formatValue={pct} />
      <SliderRow label="Single"     value={params.scrollerDefaultProportionSingle}  min={0.3} max={1.0} step={0.1} onChange={(v) => onUpdate({ scrollerDefaultProportionSingle: v })} formatValue={pct} />
      <Separator />
      <SwitchRow label="Ignore Single"     checked={params.scrollerIgnoreSingle}     onCheckedChange={(v) => onUpdate({ scrollerIgnoreSingle: v })} />
      <SwitchRow label="Focus Center"      checked={params.scrollerFocusCenter}      onCheckedChange={(v) => onUpdate({ scrollerFocusCenter: v })} />
      <SwitchRow label="Prefer Center"     checked={params.scrollerPreferCenter}     onCheckedChange={(v) => onUpdate({ scrollerPreferCenter: v })} />
      <SwitchRow label="Prefer Overspread" checked={params.scrollerPreferOverspread} onCheckedChange={(v) => onUpdate({ scrollerPreferOverspread: v })} />
      <SwitchRow label="Edge Pointer Focus" checked={params.scrollerEdgePointerFocus} onCheckedChange={(v) => onUpdate({ scrollerEdgePointerFocus: v })} />
    </ConfigSection>
  );
}

function OverviewSection({ params, onUpdate }: { params: LayoutParams; onUpdate: (u: Partial<LayoutParams>) => void }) {
  const px = (v: number) => `${v}px`;
  return (
    <ConfigSection title="Overview">
      <SliderRow label="Gap Inner" value={params.overviewGapInner} min={0} max={40} step={5} onChange={(v) => onUpdate({ overviewGapInner: v })} formatValue={px} />
      <SliderRow label="Gap Outer" value={params.overviewGapOuter} min={0} max={80} step={5} onChange={(v) => onUpdate({ overviewGapOuter: v })} formatValue={px} />
    </ConfigSection>
  );
}

// ---------------------------------------------------------------------------
// Layout rect calculation hook
// ---------------------------------------------------------------------------

function useLayoutRects(
  layoutType: LayoutType,
  params: LayoutParams,
  previewWidth: number,
  previewHeight: number,
) {
  return useMemo(() => {
    const gapParams = {
      smartGaps: params.smartGaps,
      gapOuterH: params.gapOuterH, gapOuterV: params.gapOuterV,
      gapInnerH: params.gapInnerH, gapInnerV: params.gapInnerV,
    };
    const scrollerConfig: ScrollerConfig = {
      scrollerStructs:                 params.scrollerStructs,
      scrollerDefaultProportion:       params.scrollerDefaultProportion,
      scrollerDefaultProportionSingle: params.scrollerDefaultProportionSingle,
      scrollerIgnoreSingle:            params.scrollerIgnoreSingle,
      scrollerFocusCenter:             params.scrollerFocusCenter,
      scrollerPreferCenter:            params.scrollerPreferCenter,
      scrollerPreferOverspread:        params.scrollerPreferOverspread,
      scrollerEdgePointerFocus:        params.scrollerEdgePointerFocus,
    };
    const centerTileConfig: CenterTileConfig = {
      centerMasterOverspread: params.centerMasterOverspread,
      centerWhenSingleStack:  params.centerWhenSingleStack,
    };
    const container = { width: Math.round(previewWidth), height: Math.round(previewHeight) };
    const { windowCount: n, masterCount: mc, masterFactor: mf, newIsMaster: nim } = params;

    switch (layoutType) {
      case "tile":               return calculateTileLayout(container, n, mc, mf, gapParams, [], [], nim);
      case "vertical-tile":      return calculateVerticalTileLayout(container, n, mc, mf, gapParams, [], [], nim);
      case "grid":               return calculateGridLayout(container, n, gapParams);
      case "vertical-grid":      return calculateVerticalGridLayout(container, n, gapParams);
      case "scroller":           return calculateScrollerLayout(container, n, 0, gapParams, scrollerConfig, []);
      case "vertical-scroller":  return calculateVerticalScrollerLayout(container, n, 0, gapParams, scrollerConfig, []);
      case "monocle":            return calculateMonocleLayout(container, n);
      case "deck":               return calculateDeckLayout(container, n, mc, mf, gapParams, nim);
      case "vertical-deck":      return calculateVerticalDeckLayout(container, n, mc, mf, gapParams, nim);
      case "center-tile":        return calculateCenterTileLayout(container, n, mc, mf, gapParams, centerTileConfig, [], [], nim);
      case "right-tile":         return calculateRightTileLayout(container, n, mc, mf, gapParams, [], [], nim);
      case "tgmix":              return calculateTgmixLayout(container, n, mc, mf, nim);
      case "overview":           return calculateOverviewLayout(container, n, params.overviewGapOuter, params.overviewGapInner);
      default:                   return calculateTileLayout(container, n, mc, mf, gapParams, [], [], nim);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutType, params, previewWidth, previewHeight]);
}

// ---------------------------------------------------------------------------
// Main Editor component
// ---------------------------------------------------------------------------

export function Editor() {
  const [activeLayout, setActiveLayout] = useState<LayoutType>("tile");
  const [monitor, setMonitor]           = useState<MonitorParams>(DEFAULT_MONITOR_PARAMS);
  const [params, setParams]             = useState<LayoutParams>(DEFAULT_LAYOUT_PARAMS);

  const logicalWidth  = monitor.isPortrait ? 1080 : 1920;
  const logicalHeight = monitor.isPortrait ? 1920 : 1080;
  const previewWidth  = Math.round(logicalWidth  * PREVIEW_SCALE);
  const previewHeight = Math.round(logicalHeight * PREVIEW_SCALE);

  const rects      = useLayoutRects(activeLayout, params, previewWidth, previewHeight);
  const layoutInfo = LAYOUTS[activeLayout];

  const updateParams  = useCallback((u: Partial<LayoutParams>)  => setParams((p)  => ({ ...p, ...u })), []);
  const updateMonitor = useCallback((u: Partial<MonitorParams>) => setMonitor((m) => ({ ...m, ...u })), []);

  return (
    <div className="flex h-full overflow-hidden rounded-lg border bg-background">

      {/* ── Sidebar ── */}
      <aside className="flex w-64 flex-shrink-0 flex-col border-r bg-muted/30">

        {/* Layout selector */}
        <div className="border-b p-4">
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Layout
          </Label>
          <Select value={activeLayout} onValueChange={(v) => setActiveLayout(v as LayoutType)}>
            <SelectTrigger className="h-10 text-base font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LAYOUT_KEYS.map((key) => (
                <SelectItem key={key} value={key} className="py-2 text-sm">
                  {LAYOUTS[key].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scrollable config sections */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="space-y-5 p-4">
              <MonitorSection monitor={monitor} onUpdate={updateMonitor} />
              <GeneralSection params={params} onUpdate={updateParams} />
              <GapsSection    params={params} onUpdate={updateParams} />

              {layoutInfo.hasMaster && (
                <MasterSection params={params} hasMasterFactor={layoutInfo.hasMasterFactor} onUpdate={updateParams} />
              )}
              {layoutInfo.hasCenterTile && (
                <CenterTileSection params={params} onUpdate={updateParams} />
              )}
              {layoutInfo.hasScroller && (
                <ScrollerSection params={params} onUpdate={updateParams} />
              )}
              {layoutInfo.hasOverview && (
                <OverviewSection params={params} onUpdate={updateParams} />
              )}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* ── Preview pane ── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Canvas */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 overflow-auto bg-muted/20 p-6">
          <div
            className="relative flex-shrink-0 overflow-hidden rounded-md border shadow-md"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "hsl(var(--muted))",
                backgroundImage: "radial-gradient(hsl(var(--muted-foreground) / 0.2) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
              <span className="font-mono text-base font-medium text-muted-foreground/20">
                {logicalWidth} × {logicalHeight}
              </span>
            </div>
            {rects.map((rect, i) => (
              <WindowRect key={i} rect={rect} focused={i === params.focusedWindow} label={`W${i + 1}`} />
            ))}
          </div>

          {/* Focus selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Focus window</span>
            <div className="flex gap-2">
              {rects.map((_, i) => (
                <Button
                  key={i} size="sm"
                  variant={i === params.focusedWindow ? "default" : "outline"}
                  className="h-8 w-8 p-0 font-mono text-sm"
                  onClick={() => updateParams({ focusedWindow: i })}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ConfigExportPanel params={params} monitor={monitor} />
    </div>
  );
}
