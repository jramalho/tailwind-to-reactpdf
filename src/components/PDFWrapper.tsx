import React, { useEffect, useState, ReactElement } from 'react';
import { PDFViewer, Document, Page } from '@react-pdf/renderer';
import { convertReactComponentToPDF } from '../converters';

interface PDFWrapperProps {
  children: React.ReactNode;
}

export const PDFWrapper: React.FC<PDFWrapperProps> = ({ children }) => {
  // Only render on client side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div>Loading PDF viewer...</div>;
  }
  
  // Initialize PDF content only on client side
  // Type check to ensure we're passing a valid React element
  const childElement = React.isValidElement(children) 
    ? children 
    : <div>Invalid content for PDF conversion</div>;
  
  const pdfContent = convertReactComponentToPDF(childElement);
  
  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4">{pdfContent}</Page>
      </Document>
    </PDFViewer>
  );
};