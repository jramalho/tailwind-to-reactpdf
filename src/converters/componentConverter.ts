import React, { ReactElement } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { ComponentConverterOptions, StyleConverterOptions } from '../types';
import { convertTailwindToReactPDFStyle } from './styleConverter';

export const convertReactComponentToPDF = (
  element: ReactElement | null,
  options: ComponentConverterOptions = {}
): ReactElement | null => {
  // Early return for null or undefined elements
  if (!element) {
    return null;
  }

  const { customComponents = {} } = options;
  
  // Extract props and type from the element
  const { type, props = {} } = element;
  const { children, className = '', style = {}, ...restProps } = props;
  
  // Convert Tailwind classes to React-PDF styles
  // Extract only StyleConverterOptions properties
  const styleOptions: StyleConverterOptions = {
    baseFontSize: options.baseFontSize,
    baseFontFamily: options.baseFontFamily,
    customStyleMap: options.customStyleMap
  };
  
  const pdfStyle = convertTailwindToReactPDFStyle(className || '', styleOptions);
  
  const combinedStyle = { ...pdfStyle, ...style };
  
  // Check if there's a custom component for this type
  if (typeof type === 'string' && customComponents && type in customComponents) {
    const CustomComponent = customComponents[type];
    return React.createElement(
      CustomComponent,
      { style: combinedStyle, ...restProps },
      children
    );
  }
  
  // Map HTML/React elements to React-PDF components
  const elementType = typeof type === 'string' ? type.toLowerCase() : '';
  
  switch (elementType) {
    case 'div':
    case 'section':
    case 'article':
    case 'main':
    case 'header':
    case 'footer':
    case 'nav':
    case 'aside':
      return React.createElement(
        View,
        { style: combinedStyle, ...restProps },
        children
      );
      
    case 'p':
    case 'span':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'strong':
    case 'em':
    case 'label':
      return React.createElement(
        Text,
        { style: combinedStyle, ...restProps },
        children
      );
      
    case 'img':
      return React.createElement(
        Image,
        { 
          style: combinedStyle,
          src: props.src,
          ...restProps 
        }
      );
      
    // For unsupported elements, fallback to View
    default:
      return React.createElement(
        View,
        { style: combinedStyle, ...restProps },
        children
      );
  }
};