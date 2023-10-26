/* eslint-disable no-useless-escape */
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  // const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  console.log(setErrorMsg);
  // const searchParams = useSearchParams();

  // const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address')
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email must be valid'
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password Must Be a one uppercase, one lowercase, one special character and one digit'
      ),
    url: Yup.string()
      .required('URL is required')
      .matches(
        /^(https?:\/\/[^\s/$.?#].[^\s]*)\.com$/,
        'URL must start with http:// or https://, end with .com, and not end with /'
      ),
  });

  const defaultValues = {
    email: '',
    password: '',
    url: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    router.push(PATH_AFTER_LOGIN);
    // try {
    //   await login?.(data.email, data.password, data.url);
    //   router.push(returnTo || PATH_AFTER_LOGIN);
    // } catch (error) {
    //   console.error(error);
    //   reset();
    //   setErrorMsg(typeof error === 'string' ? error : error.message);
    // }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography textAlign="center" variant="h4">
        Sign in{' '}
      </Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="url" label="URL" />
      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <Box bgcolor="#FFFFFF" p={8} borderRadius={2} width={500}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

        {renderForm}
      </FormProvider>
    </Box>
  );
}
