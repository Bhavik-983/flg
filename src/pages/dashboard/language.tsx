import { Helmet } from 'react-helmet-async';

import LanguageView from 'src/sections/Language/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Languages</title>
      </Helmet>

      <LanguageView />
    </>
  );
}
