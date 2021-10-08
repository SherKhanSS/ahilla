import { FC, useEffect, useState } from 'react';
import styles from './go-top.module.scss';
import ArrowUp from '../Icons/ArrowUp';
// import useWindowDimensions from '../../hooks/useWindowDimensions';
// import { number } from 'prop-types';

const GoTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [buttonTop, setButtonTop] = useState(0);
  // const { height } = useWindowDimensions();

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);

    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // useEffect(() => {
  //   if (height !== null) {
  //     setButtonTop(height - 80);
  //   }
  // }, [height]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  if (isVisible) {
    return (
      <button className={styles.top} onClick={() => scrollToTop()}>
        <ArrowUp />
      </button>
    );
  }

  return null;
};

export default GoTop;
