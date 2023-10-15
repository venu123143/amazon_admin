import { CSSProperties, useMemo } from "react"
export const data = [
  {
    type: 'Jan',
    sales: 38,
  },
  {
    type: 'Feb',
    sales: 52,
  },
  {
    type: 'Mar',
    sales: 61,
  },
  {
    type: 'Apr',
    sales: 65,
  },
  {
    type: 'Jun',
    sales: 48,
  },
  {
    type: 'Jul',
    sales: 38,
  },
  {
    type: 'Aug',
    sales: 68,
  },
  {
    type: 'Sep',
    sales: 48,
  },
  {
    type: 'Oct',
    sales: 148,
  },
  {
    type: 'Nov',
    sales: 78,
  },
  {
    type: 'Dec',
    sales: 104,
  },
];

export const override: CSSProperties = useMemo(
  () => ({
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
    width: 380,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%, -50%)',
  }),
  []
);