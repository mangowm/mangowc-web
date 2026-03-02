"use client";

import { useMemo, useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import type { LayoutParams, MonitorParams } from "./types";

// ---------------------------------------------------------------------------
// Config generation
// ---------------------------------------------------------------------------

function boolToInt(v: boolean): string {
  return v ? "1" : "0";
}

function generateConfig(params: LayoutParams, _monitor: MonitorParams): string {
  const lines: string[] = [
    "# Gaps",
    `smartgaps = ${boolToInt(params.smartGaps)}`,
    `gappih = ${params.gapInnerH}`,
    `gappiv = ${params.gapInnerV}`,
    `gappoh = ${params.gapOuterH}`,
    `gappov = ${params.gapOuterV}`,
    "",
    "# Master",
    `default_nmaster = ${params.masterCount}`,
    `default_mfact = ${params.masterFactor.toFixed(2)}`,
    `new_is_master = ${boolToInt(params.newIsMaster)}`,
    "",
    "# Center Tile",
    `center_master_overspread = ${boolToInt(params.centerMasterOverspread)}`,
    `center_when_single_stack = ${boolToInt(params.centerWhenSingleStack)}`,
    "",
    "# Scroller",
    `scroller_structs = ${params.scrollerStructs}`,
    `scroller_default_proportion = ${params.scrollerDefaultProportion.toFixed(2)}`,
    `scroller_default_proportion_single = ${params.scrollerDefaultProportionSingle.toFixed(2)}`,
    `scroller_ignore_proportion_single = ${boolToInt(params.scrollerIgnoreSingle)}`,
    `scroller_focus_center = ${boolToInt(params.scrollerFocusCenter)}`,
    `scroller_prefer_center = ${boolToInt(params.scrollerPreferCenter)}`,
    `scroller_prefer_overspread = ${boolToInt(params.scrollerPreferOverspread)}`,
    `edge_scroller_pointer_focus = ${boolToInt(params.scrollerEdgePointerFocus)}`,
    "",
    "# Overview",
    `overviewgappi = ${params.overviewGapInner}`,
    `overviewgappo = ${params.overviewGapOuter}`,
  ];

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ConfigExportPanelProps {
  params: LayoutParams;
  monitor: MonitorParams;
}

export function ConfigExportPanel({ params, monitor }: ConfigExportPanelProps) {
  const [copied, setCopied] = useState(false);

  const config = useMemo(() => generateConfig(params, monitor), [params, monitor]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [config]);

  return (
    <aside className="flex w-72 flex-shrink-0 flex-col border-l bg-muted/10">
      <div className="border-b px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Config Export
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <pre className="p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre">
            {config}
          </pre>
        </ScrollArea>
      </div>

      <div className="border-t p-3">
        <Button
          size="sm" variant="outline"
          className="w-full text-sm"
          onClick={handleCopy}
        >
          {copied ? "✓ Copied!" : "Copy to clipboard"}
        </Button>
      </div>
    </aside>
  );
}
