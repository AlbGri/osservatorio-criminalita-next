export const COLORS = {
  primary: "#2E86AB",
  secondary: "#E63946",

  furti: "#1f77b4",
  violenze: "#d62728",
  truffe: "#ff7f0e",
  rapine: "#8B4513",
  droga: "#9467bd",
  altro: "#7f7f7f",

  omicidi: "#d62728",
  tentati_omicidi: "#ff7f0e",
  violenze_sessuali: "#8B008B",
  atti_minori: "#e377c2",
  rapine_abitazione: "#bcbd22",
  sequestri: "#17becf",
} as const;

export const COVID_PERIOD = {
  start: 2019.5,
  end: 2021.5,
  color: "rgba(200, 200, 200, 0.2)",
  label: "COVID-19",
} as const;

export const CHART_HEIGHT = 450;
export const CHART_HEIGHT_SMALL = 400;
export const CHART_HEIGHT_MAP = 550;

export const NUTS_TO_ISTAT: Record<string, number> = {
  ITC1: 1,
  ITC2: 2,
  ITC3: 7,
  ITC4: 3,
  ITD12: 4,
  ITD3: 5,
  ITD4: 6,
  ITD5: 8,
  ITE1: 9,
  ITE2: 10,
  ITE3: 11,
  ITE4: 12,
  ITF1: 13,
  ITF2: 14,
  ITF3: 15,
  ITF4: 16,
  ITF5: 17,
  ITF6: 18,
  ITG1: 19,
  ITG2: 20,
};

export const PLOTLY_CONFIG: Partial<Plotly.Config> = {
  displayModeBar: false,
  scrollZoom: false,
  responsive: true,
  doubleClick: false,
};

export const COVID_SHAPES = [
  {
    type: "rect" as const,
    xref: "x" as const,
    yref: "paper" as const,
    x0: COVID_PERIOD.start,
    x1: COVID_PERIOD.end,
    y0: 0,
    y1: 1,
    fillcolor: COVID_PERIOD.color,
    line: { width: 0 },
    layer: "below" as const,
  },
];

export const COVID_ANNOTATIONS = [
  {
    x: (COVID_PERIOD.start + COVID_PERIOD.end) / 2,
    y: 1,
    xref: "x" as const,
    yref: "paper" as const,
    text: COVID_PERIOD.label,
    showarrow: false,
    font: { size: 9, color: "gray" },
  },
];
