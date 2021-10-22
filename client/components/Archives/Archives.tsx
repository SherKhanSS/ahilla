import { FC, useState } from 'react';
import styles from './archives.module.scss';
import { useContextState } from '../../context/state';
import Link from 'next/link';
import { formatDateForArchives } from '../../utils';
import Arrow from '../Icons/Arrow';

const fillMonth = (
  year: number,
  startMoth: string,
  endMoth: string
): number[][] => {
  const result = [];
  for (let i = +startMoth; i <= +endMoth; i++) {
    result.push([+year, i]);
  }
  return result;
};

const fullYear = (startArr: string[], endArr: string[]) => {
  const result = [];
  for (let i = +startArr[0]; i <= +endArr[0]; i++) {
    if (i === +startArr[0]) {
      result.push(...fillMonth(i, startArr[1], '12'));
    } else if (i === +endArr[0]) {
      result.push(...fillMonth(i, '1', startArr[1]));
    } else result.push(...fillMonth(i, '1', '12'));
  }
  return result;
};

const getDateId = (dateArr: number[]): string => {
  const day = dateArr[1] < 10 ? `0${dateArr[1]}` : `${dateArr[1]}`;
  return `${dateArr[0]}-${day}`;
};

const Archives: FC = () => {
  const { datesMark } = useContextState();
  const { first, last } = datesMark;
  const trimmingFirst = first.slice(0, 7).split('-');
  const trimmingLast = last.slice(0, 7).split('-');
  const options = fullYear(trimmingFirst, trimmingLast);
  const [isShowList, setIsShowList] = useState(false);

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Архивы:</h2>
      <div className={styles.wrap}>
        <div className={styles.select}>
          <div className={styles.info}>
            <span>Выберите месяц</span>
            <button
              className={styles.button}
              style={isShowList ? { transform: 'rotate(180deg)' } : {}}
              onClick={() => {
                setIsShowList(!isShowList);
              }}
            >
              <Arrow />
            </button>
          </div>
          {isShowList && (
            <ul className={styles.list}>
              {options.map((it, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={`/archives/${getDateId(
                        it
                      )}?order=0&sort=date&page=1`}
                    >
                      <a className={styles.link}>{formatDateForArchives(it)}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Archives;
