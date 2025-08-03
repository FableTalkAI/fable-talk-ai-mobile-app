import { ReactNode } from 'react';

export type RenderStep = {
  component: ReactNode;
  isDisabled?: boolean;
};

export type StepTextData = {
  title: string;
  description: string;
};
