import { ImageSourcePropType } from 'react-native';

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
  description: string;
  tags: string[];
  avatarSource: ImageSourcePropType;
};

export enum SortFilter {
  Alphabetically = 'alphabetically',
  Popularity = 'popularity',
}

export enum OrderFilter {
  ASC = 'ASC',
  DESC = 'DESC',
}
