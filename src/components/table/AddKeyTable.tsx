// /* eslint-disable no-plusplus */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { v4 as uuidv4 } from 'uuid';
// import React, { useState } from 'react';
// import { Form, Input, Table, Popconfirm, Typography, InputNumber } from 'antd';

// import { Box } from '@mui/material';

// import usePageHook from 'src/hooks/use-page-hook';
// import useLanguageHook from 'src/hooks/use-language-hook';

// import { useAppDispatch } from 'src/store/hooks';
// import { ProjectLanguage } from 'src/store/slices/LanguageSlice';
// import { KeyType, addKeys, setKeys } from 'src/store/slices/keySlice';

// interface Item {
//   key: string;
//   keyName: string;
//   details: string;
// }

// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean;
//   dataIndex: string;
//   title: any;
//   inputType: 'number' | 'text';
//   record: Item;
//   index: number;
//   children: React.ReactNode;
// }

// const EditableCell: React.FC<EditableCellProps> = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };

// const AddKeyTable = () => {
//   const dispatch = useAppDispatch();
//   const { page } = usePageHook();
//   const { projectLanguage } = useLanguageHook();

//   console.log({ currnetPageKeys });
//   const [form] = Form.useForm();
//   const [editingKey, setEditingKey] = useState('');

//   const languages = projectLanguage.reduce((result: any[], language: ProjectLanguage) => {
//     result.push({
//       title: language.name,
//       dataIndex: language.id,
//       width: 200,
//       pageID: currentPage.pageID,
//       editable: true,
//       render: (text: any, record: any) =>
//         isEditing(record) ? (
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
//         ) : (
//           <Typography.Text onDoubleClick={() => edit(record)}>{text}</Typography.Text>
//         ),
//     });
//     return result;
//   }, []);

//   const isEditing = (record: KeyType) => record.keyID === editingKey;

//   const edit = (record: Partial<KeyType> & { keyID: React.Key }) => {
//     form.setFieldsValue({ keyName: '', details: '', ...record });
//     setEditingKey(record.keyID);
//   };

//   const cancel = () => {
//     setEditingKey('');
//   };

//   const save = async (keyID: React.Key) => {
//     try {
//       const row = (await form.validateFields()) as any;
//       const newData = [...currnetPageKeys];
//       const index = newData.findIndex((item) => keyID === item.keyID);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           keyName: row.keyName,
//           details: row.details,
//           languages: projectLanguage.map((lang: ProjectLanguage) => ({
//             language: lang,
//             value: row[lang.id],
//           })),
//         });
//         setCurrnetPageKeys(newData);
//         dispatch(setKeys(newData));
//         setEditingKey('');
//       } else {
//         newData.push(row);
//         setCurrnetPageKeys(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };

//   const columns = [
//     {
//       title: 'key Name',
//       dataIndex: 'keyName',
//       width: 200,
//       editable: true,
//     },
//     ...languages,
//     {
//       title: 'Details',
//       dataIndex: 'details',
//       width: 300,
//       editable: true,
//     },
//     {
//       title: 'operation',
//       dataIndex: 'operation',
//       render: (_: any, record: KeyType) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link onClick={() => save(record.keyID)} style={{ marginRight: 8 }}>
//               Save
//             </Typography.Link>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//             Edit
//           </Typography.Link>
//         );
//       },
//     },
//   ];
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record: KeyType) => ({
//         record,
//         inputType: col.dataIndex === 'age' ? 'number' : 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });

//   const addRow = () => {
//     const newRow: KeyType = {
//       keyID: uuidv4(),
//       keyName: '',
//       details: '',
//       page: currentPage,
//       projectID: currentPage.projectID,
//       languages: [],
//     };
//     setCurrnetPageKeys([newRow, ...currnetPageKeys]);
//     setEditingKey(newRow.keyID);
//     dispatch(addKeys(newRow));

//     form.resetFields();
//   };

//   return (
//     <Box>
//       <button type="button" onClick={addRow}>
//         click
//       </button>
//       <Form form={form} component={false}>
//         <Table
//           components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           bordered
//           dataSource={currnetPageKeys}
//           columns={mergedColumns}
//           rowClassName="editable-row"
//           pagination={{
//             onChange: cancel,
//           }}
//         />
//       </Form>
//     </Box>
//   );
// };

// export default AddKeyTable;
