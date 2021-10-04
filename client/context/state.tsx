import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

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
  last: '2019-09-08T12:56:16.000Z',
};

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const StateContext = createContext({
  tags: [initialTag],
  popularPublications: [initialPopularPublication],
  datesMark: initialDates,
});

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState([initialTag]);
  const [popularPublications, setPopularPublications] = useState([
    initialPopularPublication,
  ]);
  const [datesMark, setDatesMark] = useState(initialDates);

  useEffect(() => {
    (async () => {
      try {
        const resTags = await fetch(`${domainURL}/api/tags/for-main`);
        const resPopular = await fetch(
          `${domainURL}/api/publications/populars`
        );
        const resDates = await fetch(`${domainURL}/api/publications/dates`);
        const tags = await resTags.json();
        const popular = await resPopular.json();
        const datesMark = await resDates.json();
        setTags(tags);
        setPopularPublications(popular);
        setDatesMark(datesMark);
      } catch (err) {}
    })();
  }, []);

  const state = {
    tags,
    popularPublications,
    datesMark,
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
