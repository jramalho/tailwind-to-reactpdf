'use client'; // If using Next.js 13+ with app directory

import React from 'react';
import dynamic from 'next/dynamic';
import { convertReactComponentToPDF } from 'tw-to-react-pdf';

// Use dynamic import for React-PDF components to avoid SSR issues
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
);

const Document = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.Page),
  { ssr: false }
);

// Your component with Tailwind classes
const MyComponent = () => (
  <div className="p-4 bg-blue-100">
    <h1 className="text-2xl font-bold text-blue-800">Hello PDF</h1>
    <p className="mt-2 text-gray-700">This is a sample PDF generated with Tailwind classes</p>
  </div>
);

// PDF component
const PDFDocument = () => {
  const pdfContent = convertReactComponentToPDF(<MyComponent />);
  
  return (
    <Document>
      <Page size="A4">{pdfContent}</Page>
    </Document>
  );
};

// Export a component that renders the PDF
export default function PDFPage() {
  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        <PDFDocument />
      </PDFViewer>
    </div>
  );
}