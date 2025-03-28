import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add this import
import { TailwindToPDFViewer, TailwindToPDFDownloadLink } from './TailwindToPDF';

// Mock react-pdf components
jest.mock('@react-pdf/renderer', () => ({
  Document: jest.fn(({ children }) => <div data-testid="pdf-document">{children}</div>),
  Page: jest.fn(({ children }) => <div data-testid="pdf-page">{children}</div>),
  PDFViewer: jest.fn(({ children }) => <div data-testid="pdf-viewer">{children}</div>),
  PDFDownloadLink: jest.fn(({ children, document }) => (
    <div data-testid="pdf-download-link">
      {typeof children === 'function' ? children({ loading: false }) : children}
      <div data-testid="pdf-document-preview">{document}</div>
    </div>
  )),
  Text: jest.fn(({ children }) => <span>{children}</span>),
  View: jest.fn(({ children }) => <div>{children}</div>),
}));

// Mock converters
jest.mock('./converters', () => ({
  convertReactNodeToPDF: jest.fn((node) => node),
}));

describe('TailwindToPDF', () => {
  test('TailwindToPDFViewer renders correctly', () => {
    const { getByTestId } = render(
      <TailwindToPDFViewer>
        <div>Test Content</div>
      </TailwindToPDFViewer>
    );
    
    expect(getByTestId('pdf-viewer')).toBeInTheDocument();
    expect(getByTestId('pdf-document')).toBeInTheDocument();
    expect(getByTestId('pdf-page')).toBeInTheDocument();
  });

  test('TailwindToPDFDownloadLink renders correctly', () => {
    const { getByTestId, getByText } = render(
      <TailwindToPDFDownloadLink label="Download PDF">
        <div>Test Content</div>
      </TailwindToPDFDownloadLink>
    );
    
    expect(getByTestId('pdf-download-link')).toBeInTheDocument();
    expect(getByText('Download PDF')).toBeInTheDocument();
    expect(getByTestId('pdf-document-preview')).toBeInTheDocument();
  });

  test('TailwindToPDFDownloadLink passes filename prop', () => {
    const { getByTestId } = render(
      <TailwindToPDFDownloadLink label="Download PDF" filename="test.pdf">
        <div>Test Content</div>
      </TailwindToPDFDownloadLink>
    );
    
    expect(getByTestId('pdf-download-link')).toBeInTheDocument();
  });
});