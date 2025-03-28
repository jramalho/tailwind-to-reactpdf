import { Font } from '@react-pdf/renderer';

// Define proper types for font properties
type FontWeight = 'normal' | 'bold' | number;
type FontStyle = 'normal' | 'italic' | 'oblique';

interface FontSource {
  src: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
}

interface FontOptions {
  family: string;
  fonts: {
    normal?: string;
    bold?: string;
    italic?: string;
    boldItalic?: string;
  };
}

// Default font configuration
const DEFAULT_FONT = 'Inter';

/**
 * Register custom fonts for use in the PDF
 * @param fontOptions Array of font options
 */
export const registerFonts = (fontOptions: FontOptions[]) => {
  fontOptions.forEach(option => {
    const fontSources: FontSource[] = [];
    
    if (option.fonts.normal) {
      fontSources.push({ src: option.fonts.normal });
    }
    
    if (option.fonts.bold) {
      fontSources.push({ src: option.fonts.bold, fontWeight: 'bold' });
    }
    
    if (option.fonts.italic) {
      fontSources.push({ src: option.fonts.italic, fontStyle: 'italic' });
    }
    
    if (option.fonts.boldItalic) {
      fontSources.push({ 
        src: option.fonts.boldItalic, 
        fontWeight: 'bold', 
        fontStyle: 'italic' 
      });
    }
    
    Font.register({
      family: option.family,
      fonts: fontSources
    });
  });
};

/**
 * Register default fonts (Inter)
 */
export const registerDefaultFonts = () => {
  Font.register({
    family: DEFAULT_FONT,
    fonts: [
      { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
      { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 700 },
    ]
  });
  
  return DEFAULT_FONT;
};

/**
 * Set the default font family for the entire PDF document
 * @param family Font family name
 */
export const setDefaultFont = (family: string = DEFAULT_FONT) => {
  Font.registerHyphenationCallback(word => [word]);
  Font.registerEmojiSource({
    format: 'png',
    url: 'https://twemoji.maxcdn.com/2/72x72/'
  });
  
  return {
    fontFamily: family
  };
};

/**
 * Register Google Fonts
 * @param fonts Array of font family names to load from Google Fonts
 * @param weights Array of font weights to load
 */
export const registerGoogleFonts = (fonts: string[], weights: number[] = [400, 700]) => {
  fonts.forEach(fontFamily => {
    // Convert font family name to URL format (replace spaces with +)
    const formattedFontFamily = fontFamily.replace(/\s+/g, '+');
    
    // Create weights string for URL
    const weightsStr = weights.join(',');
    
    // Register the font
    Font.register({
      family: fontFamily,
      src: `https://fonts.googleapis.com/css2?family=${formattedFontFamily}:wght@${weightsStr}&display=swap`
    });
  });
};

/**
 * Load fonts from local files
 * @param fontFamily Font family name
 * @param fontPaths Object containing paths to font files
 */
export const registerLocalFont = (
  fontFamily: string, 
  fontPaths: {
    normal?: string;
    bold?: string;
    italic?: string;
    boldItalic?: string;
  }
) => {
  registerFonts([{
    family: fontFamily,
    fonts: fontPaths
  }]);
  
  return fontFamily;
};

/**
 * Get the default font configuration
 * @returns Default font family name
 */
export const getDefaultFont = () => DEFAULT_FONT;