/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from 'uuid';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
/* eslint-disable no-plusplus */
import { Form, Input, Table, Popconfirm, Typography, InputNumber } from 'antd';

import { Box } from '@mui/material';

import useKeyHook from 'src/hooks/use-key-hook';
import usePageHook from 'src/hooks/use-page-hook';
import useProjectHook from 'src/hooks/use-project-hook';
import useLanguageHook from 'src/hooks/use-language-hook';

import { NewLanguage } from 'src/store/slices/LanguageSlice';

import KeyHeader from 'src/components/header/KeyHeader';
import { LoadingScreen } from 'src/components/loading-screen';

export interface keyLanguage {
  language: {
    id: string;
    projectId: string;
    code: string;
    name: string;
    key: string;
  };
  value: string;
}

export interface KeyType {
  _id: string;
  key: string;
  detail: string;
  page: LabelValue;
  projectID: string;
  language: keyLanguage[];
}

interface Item {
  key: string;
  name: string;
  language: string;
  detail: string;
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
  const { currentProject } = useProjectHook();
  const { projectLanguage } = useLanguageHook();
  const { allPages, handleGetAllPages, currentPage, handleCreatePage, setcurrentPage } =
    usePageHook();

  const { handleGetKey, allKeys, handleAddKey, setAllKeys, handleUpdateKey } = useKeyHook();
  const handleChange = (event: React.SyntheticEvent, newValue: LabelValue | null) => {
    if (newValue !== null) setcurrentPage(newValue);
  };

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res: any = await handleGetAllPages(currentProject?._id, 'default');
      await handleGetKey(currentProject?._id, res?.value);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>('');

  const languages = projectLanguage.reduce((result: any[], language: any) => {
    result.push({
      title: language.name,
      dataIndex: language?._id,
      width: 200,
      pageID: currentPage._id,
      editable: true,
      render: (text: any, record: any) => {
        let LangaugeValue = '';

        if (allKeys && allKeys.length > 0) {
          allKeys.map((item: KeyType) => {
            if (item?._id === record?._id) {
              if (item.language && item.language.length > 0) {
                item.language.map((lang: any) => {
                  if (lang.lg === language?._id) {
                    LangaugeValue = lang.value;
                  }
                });
              }
            }
          });
        }

        return isEditing(record) ? (
          <Form.Item
            name={`${language?._id}.value`}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please Input language!',
              },
            ]}
          >
            <Input defaultValue={LangaugeValue} />
          </Form.Item>
        ) : (
          //
          <Typography.Text onDoubleClick={() => edit(record)}>{LangaugeValue}</Typography.Text>
        );
      },
    });
    return result;
  }, []);

  const isEditing = (record: any) => record?._id === editingKey;

  const edit = (record: Partial<KeyType> & { keyID: string }) => {
    const EditRecord: any = {
      key: '',
      detail: '',
    };

    projectLanguage?.map((language) => {
      if (record.language && record.language.length > 0) {
        record.language.map((lang: any) => {
          if (lang.lg === language?._id) {
            EditRecord[lang.lg] = lang.value;
          }
        });
      }
    });

    // return;
    form.setFieldsValue({ EditRecord, ...record });
    if (record?._id) {
      setEditingKey(record?._id);
    }
  };

  const isUUIDv4 = (str: string) => {
    const uuidv4Pattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidv4Pattern.test(str);
  };

  const cancel = (record: any) => {
    const isValidUUID = isUUIDv4(record?._id);

    if (isValidUUID) {
      const newData = allKeys.filter((item: any) => item._id !== record._id);
      setAllKeys(newData);
    }

    setEditingKey('');
  };

  const save = async (keyID: string) => {
    try {
      const row = (await form.validateFields()) as any;

      const isValidUUID = isUUIDv4(editingKey);

      const backendData = projectLanguage.map((language) => {
        if (row[language?._id]) {
          const newKey = {
            lg: language?._id,
            value: row[language?._id],
          };
          return newKey;
        }
      });

      const newKey = {
        key: String(row.key)?.toUpperCase(),
        detail: row.detail,
        language: backendData,
      };

      if (isValidUUID) {
        await handleAddKey(newKey, currentProject?._id, currentPage?.value);
      } else {
        await handleUpdateKey(currentProject?._id, currentPage?.value, editingKey, newKey);
      }

      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'key',
      width: 200,
      editable: true,
      render: (text: any, record: any) =>
        isEditing(record) ? (
          <Form.Item
            name="key"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please Input Name!',
              },
            ]}
          >
            <Input style={{ textTransform: 'uppercase' }} />
          </Form.Item>
        ) : (
          <Typography.Text onDoubleClick={() => edit(record)}>{record?.key}</Typography.Text>
        ),
    },
    ...languages,
    {
      title: 'Details',
      dataIndex: 'detail',
      width: 150,
      editable: true,
      render: (text: any, record: any) =>
        isEditing(record) ? (
          <Form.Item name="detail" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          <Typography.Text onDoubleClick={() => edit(record)}>{record?.detail}</Typography.Text>
        ),
    },

    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record?._id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record)}>
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
    const newRow: any = {
      _id: uuidv4(),
      key: '',
      detail: '',
      page: currentPage,
      projectID: currentPage.projectID,
      language: [],
    };

    projectLanguage?.map((language: NewLanguage) => {
      newRow[language?._id] = '';
    });

    setAllKeys(() => [newRow, ...allKeys]);
    edit({ ...newRow, keyID: newRow?._id });
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ mt: 1 }}>
          <KeyHeader
            value={currentPage}
            handleChange={handleChange}
            options={allPages}
            handleAddString={handleAddString}
            handleAddPage={(pageName: string) => {
              handleCreatePage(pageName, currentProject?._id);
            }}
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
              dataSource={allKeys}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
            />
          </Form>
        </Box>
      )}
    </>
  );
}
