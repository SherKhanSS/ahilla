import { FC } from 'react';

const Arrow: FC<{ fill?: string }> = ({ fill }) => {
  const currentFill = fill === undefined ? '#000' : fill;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="4"
      fill="none"
      viewBox="0 0 6 4"
    >
      <path
        fill={currentFill}
        d="M2.293 3.818L.113.887C-.144.542.065 0 .456 0h4.36a.41.41 0 01.246.085.52.52 0 01.168.229.62.62 0 01-.072.573l-2.18 2.93a.468.468 0 01-.154.135.398.398 0 01-.376 0 .469.469 0 01-.155-.135z"
      />
    </svg>
  );
};

export default Arrow;
