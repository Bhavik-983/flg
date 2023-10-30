/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, Alert, useTheme } from '@mui/material';

import useDebounce from 'src/hooks/use-debounce';

import { RAPID_API_KEY } from 'src/utils/environments';
import { data, Language } from 'src/utils/languageData';

import { RHFTextField } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFSelectField from 'src/components/hook-form/rhf-select-field';

export default function AddKey() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [languages, setLanguages] = useState<Language[]>([]);

  const KeySchema = Yup.object().shape({
    key: Yup.string().min(2).required('key is required'),
    page: Yup.object().shape({
      label: Yup.string().required('page is required'),
      value: Yup.string().required('page is required'),
    }),
    website: Yup.object().shape({
      label: Yup.string().required('website is required'),
      value: Yup.string().required('website is required'),
    }),
  });

  useEffect(() => {
    setLanguages(data);
  }, []);

  const targetLanguages: string[] =
    languages && languages.length > 0 ? languages.map((data) => data.code) : [];

  const defaultValues = {
    language: '',
    page: {
      label: '',
      value: '',
    },
    key: '',
    website: {
      label: '',
      value: '',
    },
  };

  const methods = useForm({
    resolver: yupResolver(KeySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    watch,
  } = methods;

  const getData = async () => {
    const translationPromises = targetLanguages.map(async (targetLanguage: string) => {
      const options = {
        method: 'POST',
        url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com',
        },
        data: {
          from: 'en',
          to: targetLanguage,
          q: searchValue,
        },
      };

      try {
        const response = await axios.request(options);
        const translation = response.data;

        setValue(
          targetLanguage as
            | 'key'
            | 'page'
            | 'website'
            | 'page.value'
            | 'page.label'
            | 'website.value'
            | 'website.label',
          translation
        );
      } catch (error) {
        // Handle API request errors
        console.error(`Error translating to ${targetLanguage}:`, error);
      }
    });

    // Wait for all translations to complete
    await Promise.all(translationPromises);
  };

  const onSubmit = handleSubmit(async (data: any) => {
    // console.log(data);
  });

  const searchValue = watch('key');

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue) {
      getData();
    }
  }, [debouncedSearchValue]);

  const dot = (
    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: 'rgb(99, 115, 129)',
        }}
      />
    </Box>
  );

  const breadCrumbs = (
    <Box display="flex" gap={2}>
      <Typography
        mt={1}
        variant="body1"
        sx={{
          fontSize: '0.875rem',
          ':hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
          },
        }}
        onClick={() => {
          navigate('/dashboard/language');
        }}
      >
        Dashboard
      </Typography>
      {dot}
      <Typography
        mt={1}
        variant="body1"
        sx={{
          fontSize: '0.875rem',
          ':hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
          },
        }}
        onClick={() => {
          window.history.back();
        }}
      >
        Key
      </Typography>
      {dot}
      <Typography mt={1} variant="body1" sx={{ fontSize: '0.875rem', color: 'rgb(99, 115, 129)' }}>
        Add Key
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Add Key </Typography>
      {breadCrumbs}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack
          spacing={2.5}
          sx={{
            width: '100%',
            mt: 5,
          }}
        >
          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            padding={3}
            borderRadius={2}
            gap={3}
          >
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <RHFSelectField handleChange={setValue} name="website" label="Website" />
            <RHFSelectField name="page" label="Page" handleChange={setValue} />
            <RHFTextField name="key" label="Key" />
            {languages &&
              languages.length > 0 &&
              languages?.map((data: any) => (
                <RHFTextField key={data.key} name={data.code} label={data.name} />
              ))}
            <Box display="flex" mt={2}>
              <LoadingButton
                color="inherit"
                size="medium"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
        </Stack>
      </FormProvider>
    </Container>
  );
}
