import { convertTailwindToReactPDFStyle } from './styleConverter';
import { tailwindToReactPDFMap } from '../utils/styleMap';

describe('styleConverter', () => {
  test('should convert Tailwind classes to React-PDF styles', () => {
    const className = 'text-black text-xl font-bold';
    const result = convertTailwindToReactPDFStyle(className);
    
    expect(result).toEqual({
      color: '#000000',
      fontSize: 20,
      fontWeight: 700,
    });
  });

  test('should handle empty className', () => {
    const result = convertTailwindToReactPDFStyle('');
    expect(result).toEqual({});
  });

  test('should ignore unknown classes', () => {
    const className = 'text-black unknown-class';
    const result = convertTailwindToReactPDFStyle(className);
    
    expect(result).toEqual({
      color: '#000000',
    });
  });

  test('should use custom style map when provided', () => {
    const className = 'text-black custom-class';
    const customStyleMap = {
      'custom-class': { backgroundColor: 'purple' },
    };
    
    const result = convertTailwindToReactPDFStyle(className, { customStyleMap });
    
    expect(result).toEqual({
      color: '#000000',
      backgroundColor: 'purple',
    });
  });

  test('should not include default styles when includeDefaultStyles is false', () => {
    const className = 'text-black custom-class';
    const customStyleMap = {
      'custom-class': { backgroundColor: 'purple' },
    };
    
    const result = convertTailwindToReactPDFStyle(className, { 
      includeDefaultStyles: false,
      customStyleMap,
    });
    
    expect(result).toEqual({
      backgroundColor: 'purple',
    });
  });
});