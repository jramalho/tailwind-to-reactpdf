import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

interface ButtonProps {
  children: React.ReactNode;
  style?: Style;
}

export const Button: React.FC<ButtonProps> = ({ children, style = {} }) => (
  <View style={{
    backgroundColor: '#111827',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 4,
    fontWeight: 500,
    ...style
  }}>
    <Text>{children}</Text>
  </View>
);

interface CardProps {
  children: React.ReactNode;
  style?: Style;
}

export const Card: React.FC<CardProps> = ({ children, style = {} }) => (
  <View style={{
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E5E7EB',
    ...style
  }}>
    {children}
  </View>
);

interface InputProps {
  placeholder?: string;
  value?: string;
  style?: Style;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, style = {} }) => (
  <View style={{
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderRadius: 4,
    padding: 8,
    ...style
  }}>
    <Text>{value || placeholder || ''}</Text>
  </View>
);