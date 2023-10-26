import { Helmet } from 'react-helmet-async';

import OneView from 'src/sections/Language/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      <OneView />
    </>
  );
}
