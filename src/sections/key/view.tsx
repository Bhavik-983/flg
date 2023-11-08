// icons
import { Form } from 'antd';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import useKeyHook from 'src/hooks/use-key-hook';
// hooks
import usePageHook from 'src/hooks/use-page-hook';

import { KeyType } from 'src/store/slices/keySlice';

// components
import AntDesignTable from 'src/components/table/AntDesignTable';

import KeyHeader from './KeyHeader';

interface LabelValue {
  label: string;
  value: string;
}

export default function KeyView() {
  const { projectPages, page, handleAddPage } = usePageHook();

  const handleChange = (event: React.SyntheticEvent, newValue: LabelValue | null) => {
    if (newValue !== null) handleAddPage(newValue);
  };

  // form
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const { projectKeys } = useKeyHook();
  // const { projectLanguages } = useLanguageHook();

  const [currentPageId, seCurrentPageId] = useState<string>('');

  const [currnetPageKeys, setCurrnetPageKeys] = useState<KeyType[]>([]);
  console.log({ setEditingKey, setCurrnetPageKeys });

  useEffect(() => {
    if (page?.value !== currentPageId) {
      console.log({ page, currentPageId });

      const updatedKeys = [...projectKeys];
      updatedKeys.filter((key) => key.page.pageID === page.value);

      seCurrentPageId(page.value);

      console.log({ projectKeys, updatedKeys });
    }
  }, [page, currentPageId, projectKeys]);

  const isEditing = (record: KeyType) => record.keyID === editingKey;

  // const languages = projectLanguages.reduce((result: any[], language: ProjectLanguage) => {
  //   result.push({
  //     title: language.name,
  //     dataIndex: language.id,
  //     width: 200,
  //     pageID: currentPage.pageID,
  //     editable: true,
  //     render: (text: any, record: any) =>
  //       isEditing(record) ? (
  //         <>
  //           <Form.Item
  //             name={`${language.id}.value`}
  //             style={{ margin: 0 }}
  //             rules={[
  //               {
  //                 required: true,
  //                 message: 'Please Input language!',
  //               },
  //             ]}
  //           >
  //             <Input />
  //           </Form.Item>
  //         </>
  //       ) : (
  //         <Typography.Text onDoubleClick={() => edit(record)}>{text}</Typography.Text>
  //       ),
  //   });
  //   return result;
  // }, []);

  const columns = [
    {
      title: 'key Name',
      dataIndex: 'keyName',
      width: 200,
      editable: true,
    },
    // ...languages,
    {
      title: 'Details',
      dataIndex: 'details',
      width: 300,
      editable: true,
    },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_: any, record: KeyType) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link onClick={() => save(record.keyID)} style={{ marginRight: 8 }}>
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
    //         Edit
    //       </Typography.Link>
    //     );
    //   },
    // },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: KeyType) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAddString = () => {
    // const newRow: KeyType = {
    //   keyID: uuidv4(),
    //   keyName: '',
    //   details: '',
    //   page: currentPage,
    //   projectID: currentPage.projectID,
    //   languages: [],
    // };
    // setCurrnetPageKeys([newRow, ...currnetPageKeys]);
    // setEditingKey(newRow.keyID);
    // dispatch(addKeys(newRow));
    // form.resetFields();
  };

  return (
    <Box sx={{ mt: 1 }}>
      <KeyHeader
        handleChange={handleChange}
        page={page}
        projectPages={projectPages}
        handleAddString={handleAddString}
      />

      {/* table  */}

      <Form form={form} component={false}>
        <AntDesignTable
          data={currnetPageKeys}
          columns={mergedColumns}
          handleCancel={() => {
            //
          }}
        />
      </Form>
    </Box>
  );
}
