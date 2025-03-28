import React from 'react';
import { TailwindToPDFViewer, TailwindToPDFDownloadLink } from './TailwindToPDF';
import { Button, Card } from './components/ShadcnComponents';

const ExampleComponent = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tailwind to React-PDF Example</h1>
      
      {/* PDF Viewer */}
      <div className="h-96 mb-4">
        <TailwindToPDFViewer>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Sample PDF Document</h1>
            
            <div className="flex flex-col space-y-4">
              <Card>
                <h2 className="text-xl font-semibold mb-2">Tailwind Styled Card</h2>
                <p className="text-gray-600">
                  This card is styled using Tailwind classes and converted to React-PDF.
                </p>
              </Card>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800">
                  This is a div with Tailwind background and padding classes.
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Created with Tailwind to React-PDF</p>
                <Button>Download</Button>
              </div>
            </div>
          </div>
        </TailwindToPDFViewer>
      </div>
      
      {/* Download Link */}
      <TailwindToPDFDownloadLink
        label={<button className="bg-blue-500 text-white px-4 py-2 rounded">Download PDF</button>}
        filename="example.pdf"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Downloadable PDF</h1>
          <p className="text-gray-700 mb-4">
            This is a downloadable PDF generated from React components with Tailwind CSS.
          </p>
          <div className="border border-gray-300 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Important Information</h2>
            <p>This library converts Tailwind and Shadcn UI styled components to PDF format.</p>
          </div>
        </div>
      </TailwindToPDFDownloadLink>
    </div>
  );
};

export default ExampleComponent;