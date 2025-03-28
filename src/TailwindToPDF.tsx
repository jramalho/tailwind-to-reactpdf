import React, { FC } from 'react';
import { Document, Page, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { TailwindToPDFProps, TailwindToPDFOptions } from './types';
import { convertReactNodeToPDF } from './converters';

interface PDFDocumentProps {
  children: React.ReactNode;
  filename?: string;
}

const PDFDocument: FC<PDFDocumentProps> = ({ children, filename = 'document.pdf' }) => (
  <Document>
    <Page size="A4">{children}</Page>
  </Document>
);

export const TailwindToPDFViewer: FC<TailwindToPDFProps & TailwindToPDFOptions> = ({
  children,
  includeDefaultStyles = true,
  customStyleMap = {},
  customComponents = {},
}) => {
  const pdfContent = convertReactNodeToPDF(children, {
    includeDefaultStyles,
    customStyleMap,
    customComponents,
  });

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <PDFDocument>{pdfContent}</PDFDocument>
    </PDFViewer>
  );
};

export const TailwindToPDFDownloadLink: FC<
  TailwindToPDFProps & TailwindToPDFOptions & { label: React.ReactNode }
> = ({
  children,
  label,
  filename = 'document.pdf',
  includeDefaultStyles = true,
  customStyleMap = {},
  customComponents = {},
}) => {
  const pdfContent = convertReactNodeToPDF(children, {
    includeDefaultStyles,
    customStyleMap,
    customComponents,
  });

  return (
    <PDFDownloadLink
      document={<PDFDocument filename={filename}>{pdfContent}</PDFDocument>}
      fileName={filename}
    >
      {({ loading }) => (loading ? 'Loading document...' : label)}
    </PDFDownloadLink>
  );
};