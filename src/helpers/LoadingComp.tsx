import React, { CSSProperties } from 'react'
import { SyncLoader } from 'react-spinners'

// Positioning and size (unchanged)
const MainSpinner: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: 380,
  position: 'absolute',
  top: "50%",
  left: "50%",
  transform: 'translateX(-50%, -50%)'
};

type LoadingCompProps = {
  theme?: 'light' | 'dark';
};

const LoadingComp: React.FC<LoadingCompProps> = ({ theme = 'light' }) => {
  const spinnerColor = theme === 'dark' ? '#E5E7EB' : '#361AE3'; // Light gray or Indigo
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';

  return (
    <div className={`fixed top-0 left-0 w-full h-screen z-50 ${bgColor} bg-opacity-60 flex justify-center items-center`}>
      <SyncLoader
        color={spinnerColor}
        loading={true}
        cssOverride={MainSpinner}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default React.memo(LoadingComp);
