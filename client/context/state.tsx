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

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const StateContext = createContext({
  tags: [initialTag],
  popularPublications: [initialPopularPublication],
});

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tags, setTags] = useState([initialTag]);
  const [popularPublications, setPopularPublications] = useState([
    initialPopularPublication,
  ]);

  useEffect(() => {
    (async () => {
      try {
        const resTags = await fetch(`${domainURL}/tags/for-main`);
        const resPopular = await fetch(`${domainURL}/publications/populars`);
        const tags = await resTags.json();
        const popular = await resPopular.json();
        setTags(tags);
        setPopularPublications(popular);
      } catch (err) {}
    })();
  }, []);

  const state = {
    tags,
    popularPublications,
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
