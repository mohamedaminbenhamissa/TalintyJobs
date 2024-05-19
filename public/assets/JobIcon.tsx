function JobIcon({
  width = 22,
  height = 23,
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
        d="M6.7508 21.3657H14.7508C18.7708 21.3657 19.4908 19.7557 19.7008 17.7957L20.4508 9.79566C20.7208 7.35566 20.0208 5.36566 15.7508 5.36566H5.7508C1.4808 5.36566 0.780803 7.35566 1.0508 9.79566L1.8008 17.7957C2.0108 19.7557 2.7308 21.3657 6.7508 21.3657Z"
        stroke="#F3CB05"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75085 5.36566V4.56566C6.75085 2.79566 6.75085 1.36566 9.95085 1.36566H11.5509C14.7509 1.36566 14.7509 2.79566 14.7509 4.56566V5.36566"
        stroke="#F3CB05"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7509 12.3657V13.3657C12.7509 13.3757 12.7509 13.3757 12.7509 13.3857C12.7509 14.4757 12.7409 15.3657 10.7509 15.3657C8.77085 15.3657 8.75085 14.4857 8.75085 13.3957V12.3657C8.75085 11.3657 8.75085 11.3657 9.75085 11.3657H11.7509C12.7509 11.3657 12.7509 11.3657 12.7509 12.3657Z"
        stroke="#F3CB05"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4009 10.3657C18.0909 12.0457 15.4509 13.0457 12.7509 13.3857"
        stroke="#F3CB05"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.37085 10.6357C3.62085 12.1757 6.16085 13.1057 8.75085 13.3957"
        stroke="#F3CB05"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default JobIcon;
