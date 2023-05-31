export interface IResponceDashboard {
  success: boolean;
  data: IResponceDashboardData;
  lastParseDate: any;
}

export interface IResponceDashboardData {
  amount: IAmountDashboard;
  statistic: IStatistic[];
}

export interface IAmountDashboard {
  Comments: number;
  Groups: number;
  Posts: number;
  Users: number;
}
interface IStatistic {
  x: number;
  y: number;
  name: string;
}
