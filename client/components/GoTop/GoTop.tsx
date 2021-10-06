import { FC, useEffect, useState } from 'react';
import styles from './go-top.module.scss';
import ArrowUp from '../Icons/ArrowUp';

const GoTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);

    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <div className={styles.back_to_top}>
      <div className={styles.wrap}>
        {isVisible && (
          <button className={styles.top} onClick={() => scrollToTop()}>
            <ArrowUp />
          </button>
        )}
      </div>
    </div>
  );
};

export default GoTop;
