import { Helmet } from 'react-helmet-async';

import KeyView from 'src/sections/key/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      <KeyView />
    </>
  );
}
