import { Style } from '@react-pdf/types';
import { StyleConverterOptions } from '../types';
import { tailwindToReactPDFMap } from '../utils/styleMap';

export const convertTailwindToReactPDFStyle = (
  className: string = '',
  options: StyleConverterOptions = {}
): Style => {
  const { includeDefaultStyles = true, customStyleMap = {} } = options;
  
  // Combine default styles with custom styles
  const styleMap = {
    ...(includeDefaultStyles ? tailwindToReactPDFMap : {}),
    ...customStyleMap,
  };
  
  // Split the className string into individual classes
  const classes = className.split(' ').filter(Boolean);
  
  // Reduce the classes into a single style object
  return classes.reduce((acc, cls) => {
    const style = styleMap[cls];
    if (style) {
      return { ...acc, ...style };
    }
    return acc;
  }, {} as Style);
};