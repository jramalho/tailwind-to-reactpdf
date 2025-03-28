import { ReactNode, ComponentType } from 'react';
import { Style } from '@react-pdf/types';

export interface TailwindToPDFProps {
  children: ReactNode;
  className?: string;
  style?: Style;
}

export interface StyleConverterOptions {
  includeDefaultStyles?: boolean;
  customStyleMap?: Record<string, Style>;
  baseFontSize?: number;
  baseFontFamily?: string;
}

export interface ComponentConverterOptions extends StyleConverterOptions {
  customComponents?: Record<string, ComponentType<any>>;
}

export interface TailwindToPDFOptions extends StyleConverterOptions, ComponentConverterOptions {
  filename?: string;
}