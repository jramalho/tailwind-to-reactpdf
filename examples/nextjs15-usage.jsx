'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { convertReactComponentToPDF } from 'tw-to-react-pdf';

// Dynamically import React-PDF components to avoid SSR issues
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
  <div className="p-4 bg-white">
    <h1 className="text-2xl font-bold text-blue-600">Hello PDF</h1>
    <p className="mt-2 text-gray-700">This is a sample document with Tailwind styling</p>
    <div className="mt-4 p-3 bg-blue-50 rounded-md">
      <p className="text-sm text-blue-800">Compatible with Next.js 15</p>
    </div>
  </div>
);

export default function PDFPage() {
  // Only render on client side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div>Loading PDF viewer...</div>;
  }
  
  const pdfContent = convertReactComponentToPDF(<MyComponent />);
  
  return (
    <div className="w-full h-screen">
      <PDFViewer width="100%" height="100%">
        <Document>
          <Page size="A4">{pdfContent}</Page>
        </Document>
      </PDFViewer>
    </div>
  );
}