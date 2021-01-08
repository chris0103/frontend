interface BarProps {
  value: number;
  min: number;
  max: number;
  target: number;
  status: 'normal' | 'below' | 'over';
  precision?: number[];
}

interface GraphProps {
  value: number;
  precisionPerc: number;
  rulerEndFactor: number;
  target: number;
  status: 'normal' | 'below' | 'over';
}
