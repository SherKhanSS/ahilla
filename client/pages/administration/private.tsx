import * as cookie from 'cookie';
import { GetServerSideProps } from 'next';
import { FC, ReactElement, useState } from 'react';
import PrivateMenu from '../../components/PrivateMenu/PrivateMenu';
import { domainURL, privateViewStates, adminMenu } from '../../constants';
import { useRouter } from 'next/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AdminPublicationList from '../../components/AdminPublicationList/AdminPublicationList';
import AdminEditPublication from '../../components/AdminEditPublication/AdminEditPublication';

const UNAUTHORIZED_STATUS = 401;

const redirect = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
};

const getView = (
  view: string,
  callback: (view: string) => void
): ReactElement | null => {
  switch (view) {
    case privateViewStates.publications:
      return <AdminPublicationList />;

    case privateViewStates.editPublication:
      return <AdminEditPublication callback={callback} />;

    default:
      return null;
  }
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = ctx.req.headers.cookie;
//   const { token } =
//     cookies === undefined ? { token: '' } : cookie.parse(cookies);
//
//   try {
//     const response = await fetch(`${domainURL}/api/check`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//
//     if (response.status === UNAUTHORIZED_STATUS) return redirect;
//   } catch (err) {
//     return redirect;
//   }
//
//   return {
//     props: {},
//   };
// };

const Private: FC = () => {
  const [currentView, setCurrentView] = useState(
    privateViewStates.publications
  );
  const router = useRouter();

  const onMenuItemClick = (menuItem: string) => {
    document.cookie = `view=${menuItem}`;
    setCurrentView(menuItem);
  };

  const logOut = async () => {
    document.cookie = `token=null`;
    await router.push('/');
  };

  return (
    <>
      <Header />
      <PrivateMenu
        menu={adminMenu}
        currentView={currentView}
        onMenuItemClick={onMenuItemClick}
        logOut={logOut}
      />
      <div>{getView(currentView, onMenuItemClick)}</div>
      <Footer />
    </>
  );
};

export default Private;
