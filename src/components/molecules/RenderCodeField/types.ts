import { LayoutChangeEvent } from 'react-native';
import { RenderCellOptions } from 'react-native-confirmation-code-field';

export type RenderCodeFieldProps = {
  getCellOnLayoutHandler: (index: number) => (event: LayoutChangeEvent) => void;
} & RenderCellOptions;
