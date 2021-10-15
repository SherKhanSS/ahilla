import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './admin-edit-publication.module.scss';
import { ArticleType } from '../../types';
import Spinner from '../Icons/Spinner';
import { domainURL } from '../../constants';
import { useHttp } from '../../hooks/http';
import { useQuill } from 'react-quilljs';

const TRIMMING_DATE = 10;
const MAX_TITLE = 100;
const MAX_PREVIEW = 360;

const initialArticle = {
  name: '',
  slug: '',
  author_id: 0,
  image: '',
  date: '',
  tags: [0, 1],
  description: '',
  content: '',
  is_news: '',
  is_published: '',
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
  const [article, setArticle] = useState<any>(initialArticle);
  const [content, setContent] = useState<any>('');
  const [id, setId] = useState<number | null>(null);
  const { request } = useHttp();
  const { quill, quillRef } = useQuill();

  console.log(content);

  useEffect(() => {
    if (id !== null) {
      (async () => {
        try {
          const { data } = await request('');
          setArticle(data);
        } catch (err) {}
      })();
    }
  }, [id, request]);

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
      insertToEditor(`http://localhost:5000/${await saveToServer(file)}`);
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
    console.log({
      ...article,
      content,
    });
    // try {
    //   const res =
    //     id === null
    //       ? await fetch(`${domainURL}/api/publications/add-image`, {
    //           method: 'POST',
    //           body: article,
    //         })
    //       : await request('');
    //   console.log(res);
    //   setId(null);
    //   alert('Ok');
    // } catch (err) {}
  };

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML('');
      quill.on('text-change', (delta, oldDelta, source) => {
        quill.getModule('toolbar').addHandler('image', selectLocalImage);
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill, selectLocalImage]);

  return (
    <section className={styles.main}>
      <section className={styles.article}>
        <div className={styles.img_wrap}>
          <div className={styles.upload}>
            <label>
              Прикрепить изображение
              <input accept="image/jpg" type="file" onChange={handleChange} />
            </label>
          </div>
          {article.image !== '' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`http://localhost:5000/${article.image}`} alt="img" />
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
              });
            }}
          />
        </label>
        <label>
          Краткое содержание
          <textarea
            rows={5}
            maxLength={MAX_PREVIEW}
            value={article.description}
            onChange={(e) => {
              setArticle({
                ...article,
                description: e.target.value,
              });
              if (e.target.value.length > MAX_PREVIEW - 1) {
                alert('Максимум 360 символов в содержании');
              } else {
                alert('');
              }
            }}
          />
        </label>
        <div ref={quillRef} />
        <div className={styles.checkbox}>
          <label>
            Опубликовано
            <input
              name="published"
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
          <label>
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
        </div>
        <div className={styles.buttons}>
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
    </section>
  );
};

export default AdminEditPublication;
