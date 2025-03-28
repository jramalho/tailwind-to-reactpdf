import { ReactElement, ComponentType, ReactNode } from 'react';
import { Style } from '@react-pdf/types';

// Fix the StyleConverterOptions interface to include all needed properties
export interface StyleConverterOptions {
  baseFontSize?: number;
  baseFontFamily?: string;
  customStyleMap?: Record<string, Style>;
}

export interface ComponentConverterOptions {
  customComponents?: Record<string, ComponentType<any>>;
  baseFontSize?: number;
  baseFontFamily?: string;
  customStyleMap?: Record<string, Style>;
}

export interface TailwindToPDFOptions extends ComponentConverterOptions {
  width?: number | string;
  height?: number | string;
  showBrowser?: boolean;
}

export type CustomComponent = ComponentType<{
  style?: Style;
  children?: ReactNode;
  [key: string]: any;
}>;

// Add specific prop types for common components
export interface ButtonProps {
  children: ReactNode;
  style?: Style;
  onClick?: () => void;
  disabled?: boolean;
}

export interface CardProps {
  children: ReactNode;
  style?: Style;
}

export interface TextProps {
  children: ReactNode;
  style?: Style;
}

export interface ImageProps {
  src: string;
  style?: Style;
  alt?: string;
}

// Add JSX namespace for custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'custom-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      [elementName: string]: any;
    }
  }
}