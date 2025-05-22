export interface Item {
  label: string;
  value: string;
}

export interface Items {
  data: Item[];
  title?: string;
  needToShowAllButton?: boolean;
}
