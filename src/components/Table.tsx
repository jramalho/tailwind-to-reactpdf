import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { convertTailwindToReactPDFStyle } from '../converters/styleConverter';

interface TableProps {
  data: any[];
  columns: {
    header: string;
    accessor: string;
    className?: string;
    width?: string | number;
    render?: (value: any, row: any) => React.ReactNode;
  }[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  style?: Style;
}

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  style = {},
}) => {
  const tableStyle = {
    ...convertTailwindToReactPDFStyle(className),
    ...style,
  };

  // Define styles with proper typing
  const headerStyle: Style = {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    backgroundColor: '#F9FAFB',
    ...convertTailwindToReactPDFStyle(headerClassName),
  };

  const rowStyle: Style = {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    ...convertTailwindToReactPDFStyle(rowClassName),
  };

  const cellStyle: Style = {
    padding: 8,
    ...convertTailwindToReactPDFStyle(cellClassName),
  };

  return (
    <View style={tableStyle}>
      {/* Table Header */}
      <View style={headerStyle}>
        {columns.map((column, index) => (
          <View
            key={`header-${index}`}
            style={{
              ...cellStyle,
              width: column.width || `${100 / columns.length}%`,
              ...convertTailwindToReactPDFStyle(column.className),
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{column.header}</Text>
          </View>
        ))}
      </View>

      {/* Table Rows */}
      {data.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={rowStyle}>
          {columns.map((column, colIndex) => {
            const cellValue = row[column.accessor];
            return (
              <View
                key={`cell-${rowIndex}-${colIndex}`}
                style={{
                  ...cellStyle,
                  width: column.width || `${100 / columns.length}%`,
                  ...convertTailwindToReactPDFStyle(column.className),
                }}
              >
                {column.render ? (
                  column.render(cellValue, row)
                ) : (
                  <Text>{cellValue?.toString() || ''}</Text>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};