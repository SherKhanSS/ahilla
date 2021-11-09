import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHttp } from '../hooks/http';
import { TagType } from '../types';

const initialTag = {
  id: 1,
  name: 'Без категории',
  slug: 'uncategorized',
};

const initialPopularPublication = {
  name: 'Благословляется оказать материальную помощь...',
  slug: 'blagoslovlyaetsya-okazat-materialnuyu-pomoshh',
  views: 9998,
};

const initialDates = {
  first: '2017-03-13T14:02:06.000Z',
  last: '2019-04-08T12:56:16.000Z',
};

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const StateContext = createContext<{
  tags: TagType[];
  popularPublications: {
    name: string;
    slug: string;
    views: number;
  }[];
  datesMark: {
    first: string;
    last: string;
  };
  isAdmin: boolean;
  currentEntityId: null | number;
  setCurrentEntityId: (id: number | null) => void;
}>({
  tags: [initialTag],
  popularPublications: [initialPopularPublication],
  datesMark: initialDates,
  isAdmin: false,
  currentEntityId: null,
  setCurrentEntityId: (id) => {
    // nothing
  },
});

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState([initialTag]);
  const [popularPublications, setPopularPublications] = useState([
    initialPopularPublication,
  ]);
  const [datesMark, setDatesMark] = useState(initialDates);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentEntityId, setCurrentEntityId] = useState<null | number>(null);
  const { request } = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const tags = await request(`${domainURL}/api/tags/for-main`);
        const popular = await request(`${domainURL}/api/publications/populars`);
        const datesMark = await request(`${domainURL}/api/publications/dates`);

        setTags(tags);
        setPopularPublications(popular);
        setDatesMark(datesMark);
      } catch (err) {}

      try {
        const auth = await request(`${domainURL}/api/auth/check`);

        if (auth.status === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        // console.clear();
        //TODO раскоментировать для прод режима
      }
    })();
  }, [request]);

  useEffect(() => {
    const entityId = localStorage.getItem('currentEntityId') || null;
    if (entityId !== null) {
      const id = +entityId;
      setCurrentEntityId(id);
    } else {
      setCurrentEntityId(entityId);
    }
  }, []);

  const state = {
    tags,
    popularPublications,
    datesMark,
    isAdmin,
    currentEntityId,
    setCurrentEntityId,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export function useContextState() {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('useTagsState must be used within a Provider');
  }

  return state;
}
