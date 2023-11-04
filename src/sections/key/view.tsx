/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Form, Input, Table, Popconfirm, Typography, InputNumber } from 'antd';

import { Box } from '@mui/material';

import { selectCurrentPage } from 'src/store/slices/pageSlice';
import { currentProjects } from 'src/store/slices/projectSlice';

// import { useAppSelector } from 'src/store/hooks';
// import { selectProjectLanguage } from 'src/store/slices/LanguageSlice';

import { useAppSelector } from 'src/store/hooks';

import KeyHeader from './KeyHeader';

interface Item {
  key: string;
  name: string;
  language: string;
  details: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';

  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,

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

export default function KeyView() {
  // const currentLanguage = useAppSelector(selectProjectLanguage);
  const currentPage = useAppSelector(selectCurrentPage);
  const currentProject = useAppSelector(currentProjects);
  console.log({ currentPage, currentProject });

  const originData: any = [];
  for (let i = 0; i < 2; i++) {
    originData.push({
      keyID: uuidv4(),
      keyName: `Edward ${i}`,
      page: currentPage,
      projectID: currentProject.projectID,
      details: `London Park no. ${i}`,
      languages: [
        // {
        //   language: {
        //     id: '7477b141-6d80-4472-a3e2-b5e464e094af',
        //     projectId: '34da3126-136f-3488-fsd6-e232a0c6123jf',
        //     code: 'hz',
        //     name: 'Herero',
        //     nativeName: 'Otjiherero',
        //   },
        //   value: '',
        // },
      ],
    });
  }

  // const languages = currentLanguage.reduce((result: any[], data: any) => {
  //   result.push({
  //     title: data.name,
  //     dataIndex: data.id,
  //     width: 200,
  //     editable: true,
  //     render: (text: any, record: any) =>
  //       isEditing(record) ? (
  //         <Form.Item
  //           name={data.name}
  //           style={{ margin: 0 }}
  //           rules={[
  //             {
  //               required: true,
  //               message: 'Please Input language!',
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>
  //       ) : (
  //         <Typography.Text onDoubleClick={() => edit(record)}>{text}</Typography.Text>
  //       ),
  //   });
  //   return result;
  // }, []);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  console.log({ data });
  console.log({ editingKey });

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ keyName: '', details: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        // console.log({ row });
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'keyName',
      dataIndex: 'keyName',
      width: 200,
      editable: true,
      render: (text: any, record: any) =>
        isEditing(record) ? (
          <Form.Item
            name="name"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please Input Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Typography.Text onDoubleClick={() => edit(record)}>{text}</Typography.Text>
        ),
    },
    // ...languages,

    {
      title: 'Details',
      dataIndex: 'details',
      width: 150,
      editable: true,
      render: (text: any, record: any) =>
        isEditing(record) ? (
          <Form.Item
            name="details"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please Input details!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Typography.Text onDoubleClick={() => edit(record)}>{text}</Typography.Text>
        ),
    },

    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const addRow = () => {
    // Generate a unique key for the new row (you can use a library like uuid for this)
    const newRowKey = (data.length + 1).toString();
    // const newRow: Item = {
    //   key: newRowKey,
    //   name: '',
    //   language: '',
    //   details: '',
    // };
    const newRow: any = {
      keyID: uuidv4(),
      keyName: '',
      page: currentPage,
      projectID: currentProject.projectID,
      details: '',
      languages: [
        // {
        //   language: {
        //     id: '7477b141-6d80-4472-a3e2-b5e464e094af',
        //     projectId: '34da3126-136f-3488-fsd6-e232a0c6123jf',
        //     code: 'hz',
        //     name: 'Herero',
        //     nativeName: 'Otjiherero',
        //   },
        //   value: '',
        // },
      ],
    };
    // Insert the new row at the beginning of the data array
    setData([newRow, ...data]);
    // Start editing the new row immediately
    // edit({ ...newRow, key: newRowKey });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <KeyHeader handleAddString={addRow} />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          scroll={{ x: 1500 }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </Box>
  );
}
