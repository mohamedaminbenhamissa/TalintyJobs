function CalanderIcon({
  width = 17,
  height = 19,
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
      viewBox="0 0 17 19"
    >
      <path
        d="M16 7.60368H1M11.8333 0.937012V4.27035M5.16667 0.937012V4.27035M5 17.6037H12C13.4001 17.6037 14.1002 17.6037 14.635 17.3312C15.1054 17.0915 15.4878 16.7091 15.7275 16.2387C16 15.7039 16 15.0038 16 13.6037V6.60368C16 5.20355 16 4.50348 15.7275 3.9687C15.4878 3.4983 15.1054 3.11585 14.635 2.87616C14.1002 2.60368 13.4001 2.60368 12 2.60368H5C3.59987 2.60368 2.8998 2.60368 2.36502 2.87616C1.89462 3.11585 1.51217 3.4983 1.27248 3.9687C1 4.50348 1 5.20355 1 6.60368V13.6037C1 15.0038 1 15.7039 1.27248 16.2387C1.51217 16.7091 1.89462 17.0915 2.36502 17.3312C2.8998 17.6037 3.59987 17.6037 5 17.6037Z"
        stroke="#f1e719"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CalanderIcon;
