import React from 'react';
import { TailwindToPDFViewer, TailwindToPDFDownloadLink } from './TailwindToPDF';
import { Button, Card } from './components/ShadcnComponents';
import { Table } from './components/Table';
import { registerDefaultFonts } from './utils/fontUtils';

// Register default fonts
registerDefaultFonts();

const AdvancedExampleComponent = () => {
  // Sample data for the table
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' },
  ];

  const tableColumns = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '30%' },
    { header: 'Email', accessor: 'email', width: '40%' },
    { 
      header: 'Status', 
      accessor: 'status', 
      width: '20%',
      render: (value: string) => {
        let color = '';
        switch (value) {
          case 'Active':
            color = '#10B981'; // green
            break;
          case 'Inactive':
            color = '#EF4444'; // red
            break;
          case 'Pending':
            color = '#F59E0B'; // amber
            break;
          default:
            color = '#6B7280'; // gray
        }
        return <Text style={{ color }}>{value}</Text>;
      }
    },
  ];

  // Custom style map for this example
  const customStyleMap = {
    'header-title': { 
      fontSize: 28, 
      fontWeight: 'bold', 
      color: '#1F2937',
      marginBottom: 16,
      fontFamily: 'Inter'
    },
    'section-title': {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: 12,
      marginTop: 24,
      fontFamily: 'Inter'
    },
    'invoice-box': {
      border: '1px solid #E5E7EB',
      borderRadius: 8,
      padding: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    'invoice-header': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    'company-info': {
      fontSize: 12,
      color: '#6B7280',
    },
    'invoice-details': {
      fontSize: 12,
      color: '#374151',
      textAlign: 'right',
    },
    'footer-text': {
      fontSize: 10,
      color: '#9CA3AF',
      textAlign: 'center',
      marginTop: 32,
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Advanced Tailwind to React-PDF Example</h1>
      
      {/* PDF Viewer */}
      <div className="h-96 mb-4">
        <TailwindToPDFViewer customStyleMap={customStyleMap}>
          <div className="p-8">
            <h1 className="header-title">Invoice #INV-2023-001</h1>
            
            <div className="invoice-box">
              <div className="invoice-header">
                <div>
                  <h2 className="text-xl font-bold mb-2">Acme Inc.</h2>
                  <p className="company-info">
                    123 Business Street<br />
                    City, State 12345<br />
                    Phone: (123) 456-7890<br />
                    Email: info@acme.com
                  </p>
                </div>
                
                <div>
                  <p className="invoice-details">
                    <strong>Date:</strong> January 15, 2023<br />
                    <strong>Due Date:</strong> February 15, 2023<br />
                    <strong>Invoice #:</strong> INV-2023-001<br />
                    <strong>Customer ID:</strong> CUST-001
                  </p>
                </div>
              </div>
              
              <h2 className="section-title">Invoice Items</h2>
              
              <Table 
                data={[
                  { item: 'Web Development', description: 'Frontend development services', quantity: 40, rate: 75, amount: 3000 },
                  { item: 'UI/UX Design', description: 'Design of user interface and experience', quantity: 20, rate: 85, amount: 1700 },
                  { item: 'Server Setup', description: 'Configuration of cloud servers', quantity: 5, rate: 120, amount: 600 },
                ]}
                columns={[
                  { header: 'Item', accessor: 'item', width: '20%' },
                  { header: 'Description', accessor: 'description', width: '35%' },
                  { header: 'Qty', accessor: 'quantity', width: '10%' },
                  { header: 'Rate', accessor: 'rate', width: '15%', render: (value) => <Text>${value}</Text> },
                  { header: 'Amount', accessor: 'amount', width: '20%', render: (value) => <Text>${value.toFixed(2)}</Text> },
                ]}
                className="mb-4"
              />
              
              <div className="flex justify-end mt-4">
                <div className="w-1/3">
                  <div className="flex justify-between p-2 border-b border-gray-200">
                    <Text>Subtotal:</Text>
                    <Text>$5,300.00</Text>
                  </div>
                  <div className="flex justify-between p-2 border-b border-gray-200">
                    <Text>Tax (10%):</Text>
                    <Text>$530.00</Text>
                  </div>
                  <div className="flex justify-between p-2 font-bold">
                    <Text>Total:</Text>
                    <Text>$5,830.00</Text>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="section-title">Payment Information</h2>
            <Card>
              <p className="mb-2">Please make payment to the following account:</p>
              <p className="text-gray-700">
                Bank: National Bank<br />
                Account Name: Acme Inc.<br />
                Account Number: 1234567890<br />
                Routing Number: 987654321
              </p>
            </Card>
            
            <p className="footer-text">
              Thank you for your business! Payment is due within 30 days.
              For questions concerning this invoice, please contact accounting@acme.com
            </p>
          </div>
        </TailwindToPDFViewer>
      </div>
      
      {/* Download Link */}
      <TailwindToPDFDownloadLink
        label={<Button className="px-4 py-2">Download Invoice PDF</Button>}
        filename="invoice-2023-001.pdf"
        customStyleMap={customStyleMap}
      >
        {/* Same content as in the viewer */}
        <div className="p-8">
          <h1 className="header-title">Invoice #INV-2023-001</h1>
          
          {/* ... rest of the invoice content ... */}
          {/* (Same content as above) */}
        </div>
      </TailwindToPDFDownloadLink>
    </div>
  );
};

export default AdvancedExampleComponent;