export interface IconProps {
  className?: string;
}

export function Icon() {
  return <div></div>;
}

function Loading({ className }: IconProps) {
  return (
    <svg
      width='21'
      height='20'
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5 1.66666V4.99999'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10.5 15V18.3333'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.6084 4.10834L6.96673 6.46667'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M14.0332 13.5333L16.3915 15.8917'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M2.1665 10H5.49984'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M15.5 10H18.8333'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.6084 15.8917L6.96673 13.5333'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M14.0332 6.46667L16.3915 4.10834'
        stroke='#1A1A1D'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
Icon.Loading = Loading;

function Success({ className }: IconProps) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M26.6667 8L12 22.6667L5.33337 16'
        stroke='#66A784'
        strokeWidth='4.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.Success = Success;

function ChevronDown({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='14'
      height='8'
      viewBox='0 0 14 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 1L7 7L13 1'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.ChevronDown = ChevronDown;

function Copy({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='2'
        y='6'
        width='8'
        height='8'
        rx='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6 6V4C6 2.89543 6.89543 2 8 2H12C13.1046 2 14 2.89543 14 4V8C14 9.10457 13.1046 10 12 10H10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.Copy = Copy;

function Check({ className }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.3337 4.33325L6.00033 11.6666L2.66699 8.33325'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
Icon.Check = Check;
