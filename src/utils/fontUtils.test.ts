import { registerFonts, registerDefaultFonts, setDefaultFont, registerGoogleFonts, registerLocalFont } from './fontUtils';
import { Font } from '@react-pdf/renderer';

// Mock @react-pdf/renderer
jest.mock('@react-pdf/renderer', () => ({
  Font: {
    register: jest.fn(),
    registerHyphenationCallback: jest.fn(),
    registerEmojiSource: jest.fn(),
  },
}));

describe('fontUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registerFonts should register fonts correctly', () => {
    const fontOptions = [
      {
        family: 'TestFont',
        fonts: {
          normal: 'test-normal.ttf',
          bold: 'test-bold.ttf',
        },
      },
    ];

    registerFonts(fontOptions);
    
    expect(Font.register).toHaveBeenCalledWith({
      family: 'TestFont',
      fonts: [
        { src: 'test-normal.ttf' },
        { src: 'test-bold.ttf', fontWeight: 'bold' },
      ],
    });
  });

  test('registerDefaultFonts should register Inter font', () => {
    registerDefaultFonts();
    
    expect(Font.register).toHaveBeenCalledWith({
      family: 'Inter',
      fonts: [
        { src: expect.stringContaining('inter'), fontWeight: 400 },
        { src: expect.stringContaining('inter'), fontWeight: 700 },
      ],
    });
  });

  test('setDefaultFont should set default font and register callbacks', () => {
    const result = setDefaultFont('TestFont');
    
    expect(Font.registerHyphenationCallback).toHaveBeenCalled();
    expect(Font.registerEmojiSource).toHaveBeenCalled();
    expect(result).toEqual({ fontFamily: 'TestFont' });
  });

  test('registerGoogleFonts should register Google fonts', () => {
    registerGoogleFonts(['Roboto', 'Open Sans']);
    
    expect(Font.register).toHaveBeenCalledTimes(2);
    expect(Font.register).toHaveBeenCalledWith({
      family: 'Roboto',
      src: expect.stringContaining('Roboto'),
    });
    expect(Font.register).toHaveBeenCalledWith({
      family: 'Open Sans',
      src: expect.stringContaining('Open+Sans'),
    });
  });

  test('registerLocalFont should register a local font', () => {
    const result = registerLocalFont('LocalFont', {
      normal: 'local-font.ttf',
    });
    
    expect(Font.register).toHaveBeenCalled();
    expect(result).toBe('LocalFont');
  });
});