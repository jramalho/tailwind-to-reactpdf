import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyle: (style: string | object) => R;
      toBeInTheDocument: () => R;
      toBeVisible: () => R;
      toBeChecked: () => R;
      toBeDisabled: () => R;
      toBeEmpty: () => R;
      toBeEnabled: () => R;
      toBeInvalid: () => R;
      toBeRequired: () => R;
      toBeValid: () => R;
      toContainElement: (element: HTMLElement | null) => R;
      toContainHTML: (htmlText: string) => R;
      toHaveAttribute: (attr: string, value?: string) => R;
      toHaveClass: (...classNames: string[]) => R;
      toHaveFocus: () => R;
      toHaveFormValues: (expectedValues: Record<string, any>) => R;
      toHaveTextContent: (text: string | RegExp, options?: { normalizeWhitespace: boolean }) => R;
      toHaveValue: (value: string | string[] | number) => R;
    }
  }
}

// This export is needed to make the file a module
export {};