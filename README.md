# Tailwind to React-PDF

A library that converts React components styled with Tailwind CSS and Shadcn UI into PDFs using React-PDF.

## Installation

```bash
npm install tailwind-to-reactpdf
```

## Features
- Convert React components with Tailwind CSS classes to PDF
- Support for Shadcn UI components
- PDF viewer and download link components
- Customizable style mapping
- Support for custom components

## Usage
### Basic Example
```jsx
import React from 'react';
import { TailwindToPDFViewer, TailwindToPDFDownloadLink } from 'tailwind-to-reactpdf';

const MyPDFComponent = () => {
  return (
    <div>
      {/* PDF Viewer */}
      <div style={{ height: '500px' }}>
        <TailwindToPDFViewer>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">My PDF Document</h1>
            <p className="text-gray-700">
              This content will be rendered as a PDF with Tailwind styles.
            </p>
          </div>
        </TailwindToPDFViewer>
      </div>
      
      {/* Download Link */}
      <TailwindToPDFDownloadLink
        label={<button>Download PDF</button>}
        filename="my-document.pdf"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold">Downloadable PDF</h1>
          <p className="text-gray-700">
            Click the button to download this content as a PDF.
          </p>
        </div>
      </TailwindToPDFDownloadLink>
    </div>
  );
};
 ```
### Custom Style Mapping
You can provide custom style mappings for Tailwind classes:

```jsx
import { TailwindToPDFViewer } from 'tailwind-to-reactpdf';

const MyComponent = () => {
  const customStyleMap = {
    'my-custom-class': { color: 'purple', fontSize: 24 },
    'brand-button': { backgroundColor: '#FF5733', padding: 10, borderRadius: 5 }
  };

  return (
    <TailwindToPDFViewer customStyleMap={customStyleMap}>
      <div className="p-4">
        <h1 className="my-custom-class">Custom Styled Heading</h1>
        <button className="brand-button">Custom Button</button>
      </div>
    </TailwindToPDFViewer>
  );
};
 ```

### Custom Components
You can provide custom components to be used in the PDF rendering:

```jsx
import { TailwindToPDFViewer } from 'tailwind-to-reactpdf';
import { Text, View } from '@react-pdf/renderer';

const MyComponent = () => {
  const customComponents = {
    'CustomHeading': ({ children, style }) => (
      <Text style={{ fontSize: 24, fontWeight: 'bold', ...style }}>{children}</Text>
    ),
    'CustomCard': ({ children, style }) => (
      <View style={{ padding: 16, border: '1px solid #ccc', borderRadius: 8, ...style }}>
        {children}
      </View>
    )
  };

  return (
    <TailwindToPDFViewer customComponents={customComponents}>
      <div className="p-4">
        <CustomHeading className="text-blue-500">Custom Component Heading</CustomHeading>
        <CustomCard className="mt-4">
          <p className="text-gray-700">Content inside a custom card component</p>
        </CustomCard>
      </div>
    </TailwindToPDFViewer>
  );
};
 ```

### Shadcn UI Components
The library includes built-in support for common Shadcn UI components:

```jsx
import { TailwindToPDFViewer } from 'tailwind-to-reactpdf';
import { Button, Card, Input } from 'tailwind-to-reactpdf/components';

const MyComponent = () => {
  return (
    <TailwindToPDFViewer>
      <div className="p-4">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Shadcn Card</h2>
          <p className="mb-4">This is a card component from Shadcn UI.</p>
          <Input placeholder="Enter your name" />
          <Button className="mt-2">Submit</Button>
        </Card>
      </div>
    </TailwindToPDFViewer>
  );
};
 ```

## API Reference
### TailwindToPDFViewer
A component that renders a PDF viewer with the converted content.

Props:

- children : React nodes to be converted to PDF
- includeDefaultStyles : Boolean to include default Tailwind style mappings (default: true)
- customStyleMap : Object with custom Tailwind class to React-PDF style mappings
- customComponents : Object with custom component mappings
### TailwindToPDFDownloadLink
A component that renders a download link for the PDF.

Props:

- children : React nodes to be converted to PDF
- label : React node to be rendered as the download link
- filename : String for the downloaded file name (default: 'document.pdf')
- includeDefaultStyles : Boolean to include default Tailwind style mappings (default: true)
- customStyleMap : Object with custom Tailwind class to React-PDF style mappings
- customComponents : Object with custom component mappings

## License
MIT
