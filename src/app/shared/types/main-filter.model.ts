export interface IFilterSettings {
  keywords: string[];
  groups: string[];
  region: string;
  sentiment: {[index: string]: boolean} | ISentiment;
}

interface IExt {
  [index: string]: any
}
interface ISentiment extends IExt {
  Negative: boolean;
  Positive: boolean;
  Natural: boolean;
  Unknown: boolean;
}
