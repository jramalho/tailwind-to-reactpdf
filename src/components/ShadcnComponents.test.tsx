import React from 'react';
import { render } from '@testing-library/react';
import { Button, Card, Input } from './ShadcnComponents';

// Mock react-pdf components
jest.mock('@react-pdf/renderer', () => ({
  View: jest.fn(({ children, style }) => <div style={style}>{children}</div>),
  Text: jest.fn(({ children, style }) => <span style={style}>{children}</span>),
}));

describe('ShadcnComponents', () => {
  test('Button renders correctly', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  test('Button accepts custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(<Button style={customStyle}>Test Button</Button>);
    
    const buttonElement = container.firstChild;
    expect(buttonElement).toHaveStyle('background-color: red');
  });

  test('Card renders correctly', () => {
    const { container } = render(
      <Card>
        <p>Card Content</p>
      </Card>
    );
    
    expect(container.firstChild).toBeInTheDocument();
    expect(container.textContent).toBe('Card Content');
  });

  test('Card accepts custom styles', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { container } = render(
      <Card style={customStyle}>
        <p>Card Content</p>
      </Card>
    );
    
    const cardElement = container.firstChild;
    expect(cardElement).toHaveStyle('background-color: blue');
  });

  test('Input renders correctly', () => {
    const { container } = render(<Input placeholder="Enter text" />);
    
    expect(container.firstChild).toBeInTheDocument();
    expect(container.textContent).toBe('Enter text');
  });

  test('Input displays value when provided', () => {
    const { container } = render(<Input value="Test Value" />);
    
    expect(container.textContent).toBe('Test Value');
  });

  test('Input accepts custom styles', () => {
    const customStyle = { borderColor: 'green' };
    const { container } = render(<Input style={customStyle} placeholder="Enter text" />);
    
    const inputElement = container.firstChild;
    expect(inputElement).toHaveStyle('border-color: green');
  });
});