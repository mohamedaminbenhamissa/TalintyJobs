function ExpirationIcon({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
  fill?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M15.24 2H8.76001C5.00001 2 4.71001 5.38 6.74001 7.22L17.26 16.78C19.29 18.62 19 22 15.24 22H8.76001C5.00001 22 4.71001 18.62 6.74001 16.78L17.26 7.22C19.29 5.38 19 2 15.24 2Z"
        stroke="#F3CB05"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ExpirationIcon;
