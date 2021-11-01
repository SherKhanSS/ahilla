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
import AdminAuthorList from '../../components/AdminAuthorList/AdminAuthorList';
import AdminEditAuthor from '../../components/AdminEditAuthor/AdminEditAuthor';
import AdminTagList from '../../components/AdminTagList/AdminTagList';
import AdminEditTag from '../../components/AdminEditTag/AdminEditTag';
import AdminEditPublicationPreview from '../../components/AdminEditPublicationPreview/AdminEditPublicationPreview';

const redirect = {
  redirect: {
    destination: '/administration/login',
    permanent: false,
  },
};

const getView = (
  view: string,
  currentEntityId: number | null,
  callback: (view: string) => void,
  setId: (id: number | null) => void
): ReactElement | null => {
  switch (view) {
    case privateViewStates.publications:
      return <AdminPublicationList callback={callback} setId={setId} />;

    case privateViewStates.editPublication:
      return (
        <AdminEditPublication
          currentEntityId={currentEntityId}
          callback={callback}
          setId={setId}
        />
      );

    case privateViewStates.authors:
      return <AdminAuthorList callback={callback} setId={setId} />;

    case privateViewStates.editAuthor:
      return (
        <AdminEditAuthor
          currentEntityId={currentEntityId}
          callback={callback}
          setId={setId}
        />
      );

    case privateViewStates.tags:
      return <AdminTagList callback={callback} setId={setId} />;

    case privateViewStates.editTag:
      return (
        <AdminEditTag
          currentEntityId={currentEntityId}
          callback={callback}
          setId={setId}
        />
      );

    case privateViewStates.editPublicationPreview:
      return (
        <AdminEditPublicationPreview
          currentEntityId={currentEntityId}
          callback={callback}
          setId={setId}
        />
      );

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
  const [currentEntityId, setCurrentEntityId] = useState<number | null>(null);
  const router = useRouter();

  const setId = (id: number | null) => {
    setCurrentEntityId(id);
  };

  const onMenuItemClick = (menuItem: string) => {
    document.cookie = `view=${menuItem}`;
    setCurrentView(menuItem);
  };

  const logOut = async () => {
    document.cookie = `token=null`;
    document.cookie = `view=null`;
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
      <div>{getView(currentView, currentEntityId, onMenuItemClick, setId)}</div>
      <Footer />
    </>
  );
};

export default Private;
