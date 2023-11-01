import { Helmet } from 'react-helmet-async';

import LanguageView from 'src/sections/language/view';

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
