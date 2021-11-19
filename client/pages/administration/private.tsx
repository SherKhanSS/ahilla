import * as cookie from 'cookie';
import { GetServerSideProps } from 'next';
import { FC, ReactElement, useState } from 'react';
import PrivateMenu from '../../components/PrivateMenu/PrivateMenu';
import { domainURL, privateViewStates } from '../../constants';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AdminPublicationList from '../../components/AdminPublicationList/AdminPublicationList';
import AdminEditPublication from '../../components/AdminEditPublication/AdminEditPublication';
import AdminAuthorList from '../../components/AdminAuthorList/AdminAuthorList';
import AdminEditAuthor from '../../components/AdminEditAuthor/AdminEditAuthor';
import AdminTagList from '../../components/AdminTagList/AdminTagList';
import AdminEditTag from '../../components/AdminEditTag/AdminEditTag';
import AdminDocumentList from '../../components/AdminDocumentList/AdminDocumentList';
import AdminPageList from '../../components/AdminPageList/AdminPageList';

const redirect = {
  redirect: {
    destination: '/administration/login',
    permanent: false,
  },
};

const getView = (
  view: string,
  callback: (view: string) => void
): ReactElement | null => {
  switch (view) {
    case privateViewStates.publications:
      return <AdminPublicationList callback={callback} />;

    case privateViewStates.editPublication:
      return <AdminEditPublication callback={callback} />;

    case privateViewStates.authors:
      return <AdminAuthorList callback={callback} />;

    case privateViewStates.editAuthor:
      return <AdminEditAuthor callback={callback} />;

    case privateViewStates.tags:
      return <AdminTagList callback={callback} />;

    case privateViewStates.editTag:
      return <AdminEditTag callback={callback} />;

    case privateViewStates.documents:
      return <AdminDocumentList />;

    case privateViewStates.pages:
      return <AdminPageList />;

    default:
      return null;
  }
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = ctx.req.headers.cookie;
  let { token, view } =
    cookies === undefined ? { token: '', view: 'null' } : cookie.parse(cookies);

  if (view === undefined) {
    view = 'null';
  }

  try {
    const response = await fetch(`${domainURL}/api/auth/check`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return {
        props: { view },
      };
    }
  } catch (err) {
    return redirect;
  }
  return redirect;
};

const Private: FC<{ view: string }> = ({
  view = privateViewStates.editPublication,
}) => {
  const initialView = view !== 'null' ? view : privateViewStates.publications;
  const [currentView, setCurrentView] = useState(initialView);

  const onMenuItemClick = (menuItem: string) => {
    document.cookie = `view=${menuItem}`;
    setCurrentView(menuItem);
  };

  return (
    <>
      <Header />
      <PrivateMenu
        currentView={currentView}
        onMenuItemClick={onMenuItemClick}
      />
      <div>{getView(currentView, onMenuItemClick)}</div>
      <Footer />
    </>
  );
};

export default Private;
