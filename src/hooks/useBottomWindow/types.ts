export type UseBottomWindowProps = {
  mode: BottomWindowModes;
  tags?: string[];
};

export enum BottomWindowModes {
  PermissionDenied = 'permission-denied',
  SearchFilter = 'search-filter',
}
