/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Form, Input, Table, Popconfirm, Typography, InputNumber } from 'antd';

import { Box } from '@mui/material';

import { selectCurrentPage } from 'src/store/slices/pageSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectProjectLanguage } from 'src/store/slices/LanguageSlice';
import { addKeys, setKeys, selectKeys } from 'src/store/slices/keySlice';

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
  const currentLanguage = useAppSelector(selectProjectLanguage);
  const currentPage = useAppSelector(selectCurrentPage);
  const allKeys = useAppSelector(selectKeys);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [data, setData] = useState<any>(allKeys);
  const [editingKey, setEditingKey] = useState('');

  const currenPageString = data.filter((items: any) => currentPage.pageID === items.page.pageID);

  const languages = currentLanguage.reduce((result: any[], data: any) => {
    result.push({
      title: data.name,
      dataIndex: data.id,
      width: 200,
      editable: true,
      render: (text: any, record: any) =>
        isEditing(record) ? (
          <Form.Item
            name={`${data.id}.value`}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please Input language!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Typography.Text onDoubleClick={() => edit(record)}>
            {record.languages.find((lang: any) => lang.language.id === data.id)?.value || ''}
          </Typography.Text>
        ),
    });
    return result;
  }, []);

  const isEditing = (record: any) => record.keyID === editingKey;

  const edit = (record: Partial<Item> & { keyID: any }) => {
    console.log({ record });
    form.setFieldsValue({ name: '', details: '', ...record });
    setEditingKey(record.keyID);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (keyID: any) => {
    try {
      const row = (await form.validateFields()) as any;
      const newData = data.map((item: any) => {
        if (item.keyID === keyID) {
          return {
            ...item,
            ...row,
            languages: currentLanguage.map((lang: any) => ({
              language: lang,
              value: row[lang.id],
            })),
          };
        }
        return item;
      });

      setData(newData);
      setEditingKey('');
      dispatch(setKeys(newData));
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
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
    ...languages,

    {
      title: 'details',
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
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.keyID)} style={{ marginRight: 8 }}>
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
        inputType: col.dataIndex === 'name' ? 'detail' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const addRow = () => {
    const newRow: any = {
      keyID: uuidv4(),
      name: '',
      details: '',
      page: currentPage,
      languages: [],
    };
    setData(() => [newRow, ...data]);
    edit({ ...newRow, key: newRow.keyID });
    dispatch(addKeys(newRow));
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
          dataSource={currenPageString}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </Box>
  );
}
