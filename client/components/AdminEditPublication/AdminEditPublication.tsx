import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './admin-edit-publication.module.scss';
// import Spinner from '../Icons/Spinner';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import dynamic from 'next/dynamic';
import {
  AuthorType,
  InitialArticle,
  SelectElement,
  SelectOptions,
  TagType,
} from '../../types';
import { saveToServer } from '../../utils';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});
const Editor = dynamic(() => import('../AdminEditor/AdminEditor'), {
  ssr: false,
});
const transliteration = new cyrillicToTranslit();

const TRIMMING_DATE = 16;
const MAX_TITLE = 100;
const MAX_PREVIEW = 360;

const getCurrentDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }T${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};

const initialArticle = {
  name: 'Название статьи',
  slug: 'nazvanie-stati',
  author_id: 1,
  image: '/img/youtobe-back.jpg',
  date: getCurrentDate(),
  tags: [1],
  description: 'Краткое содержание',
  content: 'Полное содержание',
  is_news: false,
  is_published: false,
};

const getOptions = (arr: AuthorType[] | TagType[]) => {
  return arr.map((it: { name: string; id: number }) => {
    return { value: it.id, label: it.name };
  });
};

const AdminEditPublication: FC<{
  currentEntityId: number | null;
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ currentEntityId, callback, setId }) => {
  const [article, setArticle] = useState<InitialArticle>(initialArticle);
  const [initialContent, setInitialContent] = useState('Полное содержание');
  const [content, setContent] = useState('Полное содержание');
  const [authors, setAuthors] = useState<SelectOptions>([]);
  const [tags, setTags] = useState<SelectOptions>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<SelectElement | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<SelectOptions>([]);
  const [isShowUpload, setIsShowUpload] = useState(true);
  const { request } = useHttp();

  useEffect(() => {
    if (currentEntityId !== null) {
      (async () => {
        try {
          const article = await request(
            `${domainURL}/api/publications/id/${currentEntityId}`
          );
          const authorArr = article.author !== null ? [article.author] : [];
          const authorOptions = getOptions(authorArr);
          setArticle(article);
          setInitialContent(article.content);
          setSelectedAuthor(authorOptions[0]);
          setSelectedTags(getOptions(article.tags));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [currentEntityId, request]);

  useEffect(() => {
    (async () => {
      try {
        const authors = await request(`${domainURL}/api/authors`);
        setAuthors(getOptions(authors));
        const tags = await request(`${domainURL}/api/tags`);
        setTags(getOptions(tags));
      } catch (err) {}
    })();
  }, [request]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const urlImg = await saveToServer(file);
      setArticle({
        ...article,
        image: urlImg,
      });
    }
  };

  const onChangeEditor = (data: string) => {
    setContent(data);
  };

  const handleSubmit = async (isWithPreview: boolean) => {
    const clearedContent = content.replace(/<figure>&nbsp;<\/figure>/g, '');

    const date = new Date(article.date);
    const newArticle = {
      ...article,
      content: clearedContent,
      author_id: selectedAuthor?.value,
      tags: selectedTags.map((it) => it.value),
      date,
    };

    try {
      const res =
        currentEntityId === null
          ? await request(`${domainURL}/api/publications`, 'POST', newArticle)
          : await request(
              `${domainURL}/api/publications/${currentEntityId}`,
              'PUT',
              newArticle
            );

      if (res.status === 201) {
        if (isWithPreview) {
          Object.assign(document.createElement('a'), {
            target: '_blank',
            href: `/administration/preview/${res.id}`,
          }).click();
          // setId(res.id);
          // callback(privateViewStates.editPublicationPreview);
        }
      } else {
        alert('Что-то пошло не так');
      }
    } catch (err) {
      console.log(err);
      alert('Что-то пошло не так');
    }
  };

  return (
    <section className={styles.main}>
      <div className={styles.upload}>
        {article.image !== '' && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.image} alt="img" />
        )}
        <span>
          Постер (Рекомендованный размер 700 х 400. Часто используемые картинки
          можно грузить в раздел документы и оттуда копировать ссылку для
          вставки)
        </span>
        <div className={styles.upload_buttons}>
          <button
            style={isShowUpload ? { outline: '1px solid #000' } : {}}
            onClick={() => {
              setIsShowUpload(true);
            }}
          >
            Загрузка
          </button>
          <button
            style={!isShowUpload ? { outline: '1px solid #000' } : {}}
            onClick={() => {
              setIsShowUpload(false);
            }}
          >
            Вставить ссылку
          </button>
        </div>
        {isShowUpload ? (
          <input accept="image/jpg" type="file" onChange={handleChange} />
        ) : (
          <input
            type={'text'}
            // value={article.image}
            onChange={(e) => {
              setArticle({
                ...article,
                image: e.target.value,
              });
            }}
          />
        )}
      </div>
      <label>
        Заголовок статьи
        <input
          type={'text'}
          value={article.name}
          maxLength={MAX_TITLE}
          onChange={(e) => {
            setArticle({
              ...article,
              name: e.target.value,
              slug: transliteration
                .transform(e.target.value, '-')
                .toLowerCase(),
            });
          }}
        />
      </label>
      <label>
        Slug (только для чтения, не должен повторяться с уже существующими)
        <input readOnly={true} type={'text'} value={article.slug} />
      </label>
      <label>
        Краткое содержание (пока ориентируюсь на 360 символов, обсуждаемо)
        <textarea
          rows={3}
          maxLength={MAX_PREVIEW}
          value={article.description}
          onChange={(e) => {
            setArticle({
              ...article,
              description: e.target.value,
            });
            if (e.target.value.length > MAX_PREVIEW - 1) {
              alert('Максимум 360 символов в содержании');
            }
          }}
        />
      </label>
      <div className={styles.select_name}>Основное содержание</div>
      <Editor initial={initialContent} onChangeEditor={onChangeEditor} />
      <div className={styles.select_name}>Автор</div>
      <div className={styles.select_wrap}>
        <Select
          value={selectedAuthor}
          options={authors}
          onChange={(value: any) => setSelectedAuthor(value)}
        />
      </div>
      <div className={styles.select_name}>Теги</div>
      <div className={styles.select_wrap}>
        <Select
          value={selectedTags}
          isMulti
          options={tags}
          onChange={(value: any) => setSelectedTags(value)}
        />
      </div>
      <label className={styles.check_wrap}>
        Опубликовано?
        {/*(публикация будет доступна только если наступило время ее публикации)*/}
        <input
          type="checkbox"
          checked={article.is_published}
          onChange={(e) => {
            setArticle({
              ...article,
              is_published: e.target.checked,
            });
          }}
        />
      </label>
      <label className={styles.check_wrap}>
        Является новостью?
        <input
          type="checkbox"
          checked={article.is_news}
          onChange={(e) => {
            setArticle({
              ...article,
              is_news: e.target.checked,
            });
          }}
        />
      </label>
      <label className={styles.data}>
        Время публикации
        <input
          type={'datetime-local'}
          value={article.date.slice(0, TRIMMING_DATE) ?? ''}
          onChange={(e) => {
            setArticle({
              ...article,
              date: e.target.value,
            });
          }}
        />
      </label>
      <div className={styles.buttons}>
        <button
          onClick={async () => {
            await handleSubmit(true);
          }}
        >
          Предпросмотр
        </button>
        <button
          onClick={async () => {
            await handleSubmit(false);
          }}
        >
          Сохранить
        </button>
        <button
          onClick={async () => {
            await handleSubmit(false);
            setId(null);
            callback(privateViewStates.publications);
          }}
        >
          Вернуться к списку
        </button>
      </div>
    </section>
  );
};

export default AdminEditPublication;
