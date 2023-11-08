import React from 'react';
import { Form, Input, Table, InputNumber } from 'antd';

interface Item {
  key: string;
  keyName: string;
  details: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface AntDesignTableProps {
  data: any;
  columns: any;
  handleCancel: any;
}

const AntDesignTable = ({ data, columns, handleCancel }: AntDesignTableProps) => (
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
      pagination={{
        onChange: handleCancel,
      }}
    />
  );

export default AntDesignTable;
