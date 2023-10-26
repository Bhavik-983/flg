import { Helmet } from 'react-helmet-async';

import FourView from 'src/sections/Key/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Four</title>
      </Helmet>

      <FourView />
    </>
  );
}
