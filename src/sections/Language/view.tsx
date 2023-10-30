import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEditLine } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdDelete, MdFileDownload } from 'react-icons/md';

import { LoadingButton } from '@mui/lab';
import { GridColDef } from '@mui/x-data-grid';
import { Box, Stack, Container, Typography } from '@mui/material';

import BasicModal from 'src/routes/components/Modal';
import AddButton from 'src/routes/components/AddButton';
import DataTable from 'src/routes/components/DataTable';
import DeleteModal from 'src/routes/components/modal/DeleteModal';

import languageService from 'src/services/languageService';

import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFDatePicker from 'src/components/hook-form/rhf-date-picker';
import RHFSelectField from 'src/components/hook-form/rhf-select-field';

interface LanguageData {
  id: number;
  name: string;
  key: string;
  code: string;
  status: boolean;
  createdat: string;
}

export default function OneView() {
  const { data: getlanguagedata, isLoading } = useQuery({
    queryKey: ['getlanguages'],
    queryFn: languageService.getAllLanguage,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleDateChange = (newDate: any) => {
    // This function will receive the updated date value
    setSelectedDate(newDate);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleDeleteModalOpen = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'key', headerName: 'Key', width: 200 },
    {
      field: 'code',
      headerName: 'Code',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.value === true ? 'success.true' : 'error.false',
            bgcolor: params.value === true ? 'success.bgtrue' : 'error.bgfalse',
            borderRadius: '6px',
            p: '0px 6px',
          }}
        >
          {params.value === true ? 'Active' : 'Inactive'}
        </Box>
      ),
    },
    {
      field: 'createdat',
      headerName: 'CreatedAt',
      width: 200,
      renderCell: (params) => <Typography>{dayjs(params.value).format('YYYY/MM/DD')}</Typography>,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: () => (
        <Box display="flex" justifyContent="space-between" width="full" gap={1}>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <RiEditLine
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Box>
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            onClick={handleDeleteModalOpen}
          >
            <MdDelete
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Box>
        </Box>
      ),
    },
  ];

  const handleResetFilters = () => {
    reset();
  };

  const options: any = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  const defaultValues = {
    name: '',
    status: {
      label: '',
      value: '',
    },
    date: null,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data);
  });

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label="Name" />
      <RHFSelectField label="Status" name="status" handleChange={setValue} options={options} />
      <RHFDatePicker
        label="Date"
        name="date"
        handleChange={handleDateChange}
        value={selectedDate}
      />
    </Stack>
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Container maxWidth="xl">
        <Box display="flex" width="100%" justifyContent="space-between">
          <Typography variant="h4"> Language </Typography>
          <AddButton handleClick={handleModalOpen} title="Add Language" />
        </Box>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            display="flex"
            width="100%"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" gap={2} width="100%">
              {/* <Searchinput value={searchInput} handleSearchData={handleSearchData} />
            <SelectSearch
              value={selectedOption}
              options={options}
              handleSearchData={handleOptionChange}
            /> */}
              {renderForm}
              {/* <BasicDatePicker value={datePickerValue} handleSearchData={handleDatePickerChange} /> */}
            </Box>
            <Box display="flex" gap={2} mt={3} width="100%" justifyContent="end">
              <LoadingButton
                color="inherit"
                size="large"
                variant="contained"
                // onClick={handleSearch}
                loading={isSubmitting}
                type="submit"
              >
                <AiOutlineSearch
                  style={{
                    marginRight: '5px',
                    width: 20,
                    height: 20,
                  }}
                />
                Search
              </LoadingButton>
              <LoadingButton
                color="inherit"
                size="large"
                variant="contained"
                loading={isSubmitting}
              >
                <MdFileDownload
                  style={{
                    marginRight: '5px',
                    width: 20,
                    height: 20,
                  }}
                />
                Download
              </LoadingButton>
              <LoadingButton
                color="inherit"
                size="large"
                variant="contained"
                disabled={!isDirty}
                onClick={handleResetFilters}
                loading={isSubmitting}
              >
                <GrPowerReset
                  style={{
                    marginRight: '5px',
                    width: 20,
                    height: 20,
                  }}
                />
                Reset
              </LoadingButton>
            </Box>
          </Box>
        </FormProvider>

        <Box mt={5}>
          <DataTable rows={getlanguagedata} columns={columns} />
        </Box>
      </Container>
      <BasicModal isOpen={isOpen} onClose={handleModalClose} />
      <DeleteModal isOpen={isDeleteOpen} onClose={handleDeleteModalClose} />
    </>
  );
}
