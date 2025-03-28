import '@testing-library/jest-dom';

// No need for TypeScript declarations in a JavaScript file
// The error was likely caused by trying to use TypeScript syntax in a .js file
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyle: (style: string | object) => R;
      toBeInTheDocument: () => R;
      // Add other custom matchers as needed
    }
  }
};