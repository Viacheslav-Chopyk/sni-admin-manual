export  interface ISocialNetwork {
  value: string;
  name: string;
}

export interface INetwork {
  network: NetworkTable[];
}

export interface NetworkTable {
  name: string;
  required: boolean;
  type: string;
  value: string;
}