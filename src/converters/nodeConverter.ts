import React, { ReactNode, ReactElement, isValidElement } from 'react';
import { Text } from '@react-pdf/renderer';
import { ComponentConverterOptions, StyleConverterOptions } from '../types';
import { convertReactComponentToPDF } from './componentConverter';

export const convertReactNodeToPDF = (
  node: ReactNode,
  options: ComponentConverterOptions & StyleConverterOptions = {}
): ReactElement | ReactElement[] | string | null => {
  // Handle null or undefined
  if (node === null || node === undefined) {
    return null;
  }
  
  // Handle text nodes
  if (typeof node === 'string' || typeof node === 'number') {
    return React.createElement(Text, null, String(node));
  }
  
  // Handle arrays of nodes
  if (Array.isArray(node)) {
    return node.map((child, index) => 
      React.createElement(React.Fragment, { key: index },
        convertReactNodeToPDF(child, options)
      )
    );
  }
  
  // Handle React elements
  if (isValidElement(node)) {
    const { children, ...props } = node.props;
    
    // Convert the component
    const convertedElement = convertReactComponentToPDF(node, options) as ReactElement;
    
    // If there are children, recursively convert them
    if (children) {
      return React.cloneElement(
        convertedElement,
        props,
        convertReactNodeToPDF(children, options)
      );
    }
    
    return convertedElement;
  }
  
  // For anything else, return as is
  return node as ReactElement;
};