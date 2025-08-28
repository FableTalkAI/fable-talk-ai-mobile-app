export type AgentsState = {
  tags: string[];
  agents: Agent[];
  filter: {
    tags: string[];
    sort: SortFilter;
    order: OrderFilter;
  };
};

export type Agent = {
  name: string;
};

export enum SortFilter {
  Alphabetical = 'alphabetical',
  Popularity = 'popularity',
}

export enum OrderFilter {
  ASC = 'ASC',
  DESC = 'DESC',
}
