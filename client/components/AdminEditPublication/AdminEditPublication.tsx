import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './admin-edit-publication.module.scss';
// import Spinner from '../Icons/Spinner';
import { domainURL } from '../../constants';
import { useHttp } from '../../hooks/http';
import { useQuill } from 'react-quilljs';
import OnePublication from '../OnePublication/OnePublication';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import dynamic from 'next/dynamic';
import {
  AuthorType,
  InitialArticle,
  SelectElement,
  SelectOptions,
  TagType,
} from '../../types';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});
const transliteration = new cyrillicToTranslit();

const TRIMMING_DATE = 10;
const MAX_TITLE = 100;
const MAX_PREVIEW = 360;

const initialArticle = {
  name: '',
  slug: '',
  author_id: -1,
  image: '',
  date: '',
  tags: [-1],
  description: '',
  content: '',
  is_news: false,
  is_published: false,
};

const checkArticle = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === '' || obj[key] === -1 || obj[key] === [-1])
      return alert('Не все поля заполнены!');
  }
};

const getOptions = (arr: AuthorType[] | TagType[]) => {
  return arr.map((it: { name: string; id: number }) => {
    return { value: it.id, label: it.name };
  });
};

const saveToServer = async (file: File) => {
  const body = new FormData();
  body.append('image', file);

  const res = await fetch(`${domainURL}/api/publications/add-image`, {
    method: 'POST',
    body,
  });
  let { uploadedImageName } = await res.json();
  return uploadedImageName;
};

const AdminEditPublication: FC<{ callback: (view: string) => void }> = ({
  callback,
}) => {
  const [article, setArticle] = useState<InitialArticle>(initialArticle);
  const [initialContent, setInitialContent] = useState('Хелллоу, миг!');
  const [content, setContent] = useState('');
  const [authors, setAuthors] = useState<SelectOptions>([]);
  const [tags, setTags] = useState<SelectOptions>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<SelectElement | null>(
    null
  );
  const [selectedTags, setSelectedTags] = useState<SelectOptions>([]);
  const [preview, setPreview] = useState<any>(null);
  const [id, setId] = useState<number | null>(30);
  const { request } = useHttp();
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (id !== null) {
      (async () => {
        try {
          const article = await request(
            `${domainURL}/api/publications/id/${id}`
          );
          const authorArr = [article.author];
          const authorOptions = getOptions(authorArr);
          setArticle(article);
          setInitialContent(article.content);
          setSelectedAuthor(authorOptions[0]);
          setSelectedTags(getOptions(article.tags));
        } catch (err) {}
      })();
    }
  }, [id, request]);

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

  const insertToEditor = useCallback(
    (url: string) => {
      const range = quill?.getSelection();
      if (range === null || range === undefined) {
        alert('Ошибка вставки в редактор');
        throw new Error('Ошибка вставки в редактор');
      }
      quill?.insertEmbed(range.index, 'image', url);
    },
    [quill]
  );

  const insertImgToEditor = useCallback(
    async (file: File) => {
      insertToEditor(await saveToServer(file));
    },
    [insertToEditor]
  );

  const selectLocalImage = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpg');
    input.click();

    input.onchange = () => {
      if (input.files === null) {
        alert('Ошибка вставки файла');
        throw new Error('Ошибка вставки файла');
      }
      const file = input.files[0];
      insertImgToEditor(file);
    };
  }, [insertImgToEditor]);

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

  const handleSubmit = async () => {
    if (article.date === '') return alert('Не выбрана дата');

    const date = new Date(article.date);
    const newArticle = {
      ...article,
      content,
      author_id: selectedAuthor?.value,
      tags: selectedTags.map((it) => it.value),
      date,
    };

    checkArticle(newArticle);

    try {
      const res =
        id === null
          ? await request(`${domainURL}/api/publications`, 'POST', article)
          : await request('');

      const data = await res.json();
      console.log(data);
      // setId(null);
      // alert('Ok');
    } catch (err) {
      console.log(err);
    }
  };

  const handlePreview = () => {
    const newArticle = {
      ...article,
      content,
      author: selectedAuthor?.label,
    };
    setPreview(newArticle);
  };

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(initialContent);
      quill.on('text-change', () => {
        quill.getModule('toolbar').addHandler('image', selectLocalImage);
        setContent(quill.root.innerHTML);
      });
    }
  }, [initialContent, quill, selectLocalImage]);

  return (
    <section className={styles.main}>
      {preview ? (
        <OnePublication {...preview} />
      ) : (
        <>
          <div className={styles.upload}>
            {article.image !== '' && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.image} alt="img" />
            )}
            <label>
              Прикрепить изображение (не знаю, сам ты в редакторе выбирал
              размеры или вордпресс обрезал, везде 700 х 400, пока ориентируюсь
              на то, что будут грузиться картинки c 700 х 400)
              <input accept="image/jpg" type="file" onChange={handleChange} />
            </label>
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
          <div className={styles.editor} ref={quillRef} />
          <label className={styles.check_wrap}>
            Опубликовано
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
              type={'date'}
              value={article.date.slice(0, TRIMMING_DATE) ?? ''}
              onChange={(e) => {
                setArticle({
                  ...article,
                  date: e.target.value,
                });
              }}
            />
          </label>
        </>
      )}
      <div className={styles.buttons}>
        <button
          onClick={() => {
            !preview ? handlePreview() : setPreview(null);
          }}
        >
          {!preview ? 'Предпросмотр' : 'Редактор'}
        </button>
        <button onClick={handleSubmit}>Сохранить</button>
        <button
          onClick={() => {
            setId(null);
          }}
        >
          Отменить изменения
        </button>
      </div>
    </section>
  );
};

export default AdminEditPublication;
