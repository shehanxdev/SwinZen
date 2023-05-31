export interface BarSectionData {
  passes: number;
  fails: number;
  label: string;
}

export interface DataChartProps {
  overall: BarSectionData; // aggregates the total data of passes and fails for "Set Up", "Back Swing", and "Down Swing" for that month.
  setup: BarSectionData; // aggregates the total data of passes and fails for "Set Up "for that month.
  backswing: BarSectionData; // aggregates the total data of passes and fails for "Back Swing" for that month.
  downswing: BarSectionData; // aggregates the total data of passes and fails for "Down Swing" for that month.
}
