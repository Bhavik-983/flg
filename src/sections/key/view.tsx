/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Form, Input, Table, Popconfirm, Typography, InputNumber } from 'antd';

import { Box } from '@mui/material';

import useKeyHook from 'src/hooks/use-key-hook';
import usePageHook from 'src/hooks/use-page-hook';
import useLanguageHook from 'src/hooks/use-language-hook';

import { useAppDispatch } from 'src/store/hooks';
import { setKeys, KeyType } from 'src/store/slices/keySlice';

import KeyHeader from 'src/components/header/KeyHeader';

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
  const { data, setData, projectKeys } = useKeyHook();
  const dispatch = useAppDispatch();
  const { currentPage, handleAddPage, page, projectPages } = usePageHook();
  const { projectLanguage } = useLanguageHook();
  const handleChange = (event: React.SyntheticEvent, newValue: LabelValue | null) => {
    if (newValue !== null) handleAddPage(newValue);
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const currenPageString = data.filter(
    (items: KeyType) => currentPage.pageID === items.page.pageID
  );

  const languages = projectLanguage.reduce((result: any[], language: any) => {
    result.push({
      title: language.name,
      dataIndex: language.id,
      width: 200,
      pageID: currentPage.pageID,
      editable: true,
      render: (text: any, record: any) => {
        let LangaugeValue = '';

        if (currenPageString && currenPageString.length > 0) {
          currenPageString.map((item: KeyType) => {
            if (item.keyID === record.keyID) {
              if (item.languages && item.languages.length > 0) {
                item.languages.map((lang: any) => {
                  if (lang.language.id === language.id) {
                    LangaugeValue = lang.value;
                  }
                });
              }
            }
          });
        }

        return isEditing(record) ? (
          // <Form.Item
          //   name={`${language.id}.value`}
          //   style={{ margin: 0 }}
          //   rules={[
          //     {
          //       required: true,
          //       message: 'Please Input language!',
          //     },
          //   ]}
          // >
          <Input defaultValue={LangaugeValue} />
        ) : (
          // </Form.Item>
          <Typography.Text onDoubleClick={() => edit(record)}>{LangaugeValue}</Typography.Text>
        );
      },
    });
    return result;
  }, []);
  const [currentPageId, seCurrentPageId] = useState<string>('');

  useEffect(() => {
    if (page?.value !== currentPageId) {
      console.log({ page, currentPageId });

      const updatedKeys = [...projectKeys];
      updatedKeys.filter((key) => key.page.pageID === page.value);

      seCurrentPageId(page.value);

      console.log({ projectKeys, updatedKeys });
    }
  }, [page, currentPageId, projectKeys]);

  const isEditing = (record: any) => record.keyID === editingKey;

  const edit = (record: Partial<KeyType> & { keyID: string }) => {
    form.setFieldsValue({ name: '', details: '', ...record });
    setEditingKey(record.keyID);
  };

  const cancel = () => {
    setEditingKey('');
  };

  // const save = async (keyID: string) => {
  //   try {
  //     const row = (await form.validateFields()) as any;
  //     console.log({ row });
  //     const newData = data.map((item: KeyType) => {
  //       if (item.keyID === keyID) {
  //         return {
  //           ...item,
  //           details: row.details,
  //           name: row.name,
  //           languages: projectLanguage.map((lang: any) => ({
  //             language: lang,
  //             value: row[lang.id],
  //           })),
  //         };
  //       }
  //       return item;
  //     });

  //     setData(newData);
  //     setEditingKey('');
  //     console.log({ newData });
  //     dispatch(setKeys(newData));
  //   } catch (errInfo) {
  //     console.log('Validate Failed:', errInfo);
  //   }
  // };
  const save = async (keyID: string) => {
    try {
      const row = (await form.validateFields()) as any;
      console.log('Row:', row);

      const newData = data.map((item: KeyType) => {
        if (item.keyID === keyID) {
          const updatedItem = {
            ...item,
            details: row.details,
            name: row.name,
            languages: projectLanguage.map((lang: any) => ({
              language: lang,
              value: row[lang.id],
            })),
          };
          console.log('Updated Item:', updatedItem);
          return updatedItem;
        }
        return item;
      });

      console.log('New Data:', newData);

      setData(newData);
      setEditingKey('');
      dispatch(setKeys(newData));
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
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
      title: 'Details',
      dataIndex: 'details',
      width: 150,
      editable: true,
      render: (text: any, record: any) =>
        isEditing(record) ? (
          <Form.Item name="details" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          <Typography.Text onDoubleClick={() => edit(record)}>{text}</Typography.Text>
        ),
    },

    {
      title: 'Operation',
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

  const handleAddString = () => {
    const newRow: KeyType = {
      keyID: uuidv4(),
      keyName: '',
      details: '',
      page: currentPage,
      projectID: currentPage.projectID,
      languages: [],
    };
    setData(() => [newRow, ...data]);
    edit({ ...newRow, keyID: newRow.keyID });
    // dispatch(addKeys(newRow));
  };

  return (
    <Box sx={{ mt: 1 }}>
      <KeyHeader
        handleChange={handleChange}
        page={page}
        projectPages={projectPages}
        handleAddString={handleAddString}
      />
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
