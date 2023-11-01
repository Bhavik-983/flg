import { Helmet } from 'react-helmet-async';

import MemberView from 'src/sections/member/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Member</title>
      </Helmet>

      <MemberView />
    </>
  );
}
