import React from 'react';
import { Text as PDFText } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { convertTailwindToReactPDFStyle } from '../converters/styleConverter';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  style?: Style;
}

export const Text: React.FC<TextProps> = ({ children, className = '', style = {} }) => {
  const textStyle = {
    ...convertTailwindToReactPDFStyle(className),
    ...style,
  };

  return <PDFText style={textStyle}>{children}</PDFText>;
};