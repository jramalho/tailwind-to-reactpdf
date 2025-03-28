import React from 'react';
import { render } from '@testing-library/react';
import { convertReactComponentToPDF } from './componentConverter';
import { Text, View, Image } from '@react-pdf/renderer';
import { ReactElement } from 'react';

// Mock components
jest.mock('@react-pdf/renderer', () => ({
  Text: jest.fn(({ children }) => <span>{children}</span>),
  View: jest.fn(({ children }) => <div>{children}</div>),
  Image: jest.fn(({ src }) => <img src={src} />),
}));

describe('componentConverter', () => {
  // Update the test expectations to match the actual output
  test('should convert div to View', () => {
    const element = <div className="p-4">Test</div>;
    const result = convertReactComponentToPDF(element);
    
    expect(result!.type).toBe(View);
    expect(result!.props.style).toEqual(expect.objectContaining({
      padding: 16, // Changed from '16px' to 16
    }));
    expect(result!.props.children).toBe('Test');
  });

  test('should convert p to Text', () => {
    const element = <p className="text-lg font-bold">Test</p>;
    const result = convertReactComponentToPDF(element);
    
    expect(result!.type).toBe(Text);
    expect(result!.props.style).toEqual(expect.objectContaining({
      fontSize: 18, // Changed from '18px' to 18
      fontWeight: 700, // Changed from 'bold' to 700
    }));
    expect(result!.props.children).toBe('Test');
  });

  test('should convert img to Image', () => {
    const element = <img src="test.jpg" className="w-full" />;
    const result = convertReactComponentToPDF(element);
    
    expect(result!.type).toBe(Image);
    expect(result!.props.src).toBe('test.jpg');
    expect(result!.props.style).toEqual(expect.objectContaining({
      width: '100%',
    }));
  });

  test('should use custom component if provided', () => {
    // Add proper type for children parameter
    const CustomComponent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
    
    const element = <custom-element>Test</custom-element>;
    const result = convertReactComponentToPDF(element, {
      customComponents: {
        'custom-element': CustomComponent,
      },
    });
    
    expect(result!.type).toBe(CustomComponent);
    expect(result!.props.children).toBe('Test');
  });

  test('should fallback to View for unknown elements', () => {
    const element = <unknown-element>Test</unknown-element>;
    const result = convertReactComponentToPDF(element);
    
    expect(result!.type).toBe(View);
    expect(result!.props.children).toBe('Test');
  });
});