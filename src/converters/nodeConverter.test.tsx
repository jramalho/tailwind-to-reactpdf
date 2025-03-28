import React from 'react';
import { convertReactNodeToPDF } from './nodeConverter';
import { ReactElement } from 'react';

// Mock react-pdf components
jest.mock('@react-pdf/renderer', () => {
  const mockText = jest.fn(({ children }) => <span>{children}</span>);
  const mockView = jest.fn(({ children }) => <div>{children}</div>);
  
  return {
    Text: mockText,
    View: mockView,
  };
});

// Import the mocks after the definition
const { Text, View } = require('@react-pdf/renderer');

describe('nodeConverter', () => {
  test('should handle null or undefined', () => {
    expect(convertReactNodeToPDF(null)).toBeNull();
    expect(convertReactNodeToPDF(undefined)).toBeNull();
  });

  test('should convert string to Text', () => {
    const result = convertReactNodeToPDF('Hello') as ReactElement;
    expect(result.type).toBe(Text);
    expect(result.props.children).toBe('Hello');
  });

  test('should convert number to Text', () => {
    const result = convertReactNodeToPDF(42) as ReactElement;
    expect(result.type).toBe(Text);
    expect(result.props.children).toBe('42');
  });

  test('should handle arrays of nodes', () => {
    const nodes = ['Hello', 'World'];
    const result = convertReactNodeToPDF(nodes);
    
    expect(Array.isArray(result)).toBe(true);
    
    if (Array.isArray(result) && result.length >= 2) {
      const firstElement = result[0] as ReactElement;
      const secondElement = result[1] as ReactElement;
      
      expect(firstElement.props.children.type).toBe(Text);
      expect(firstElement.props.children.props.children).toBe('Hello');
      expect(secondElement.props.children.type).toBe(Text);
      expect(secondElement.props.children.props.children).toBe('World');
    } else {
      fail('Result should be an array with at least 2 elements');
    }
  });

  test('should recursively convert children', () => {
    const element = <div><p>Hello</p></div>;
    const result = convertReactNodeToPDF(element) as ReactElement;
    
    expect(result.props.children).toBeDefined();
  });
});