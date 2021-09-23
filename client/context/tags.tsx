import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {TagType} from '../types';

const initialTag = {
  id: 1,
  name: 'Без категории',
  slug: 'uncategorized'
}

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const TagsStateContext = createContext({
  tags: [initialTag],
});

export const TagsProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [tags, setTags] = useState([initialTag]);

  useEffect(() => {
    (async () => {
      try {
        const resTags = await fetch(`${domainURL}/tags`);
        const tags = await resTags.json();
        setTags(tags);
      } catch (err) {}
    })();
  }, []);

  const state = {
    tags,
  };

  return (
    <TagsStateContext.Provider value={state}>
      {children}
    </TagsStateContext.Provider>
  );
}

export function useTagsState() {
  const state = useContext(TagsStateContext);

  if (state === undefined) {
    throw new Error('useTagsState must be used within a TagsProvider');
  }

  return state;
}
