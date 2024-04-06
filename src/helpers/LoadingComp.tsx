import React, { CSSProperties } from 'react'
import { SyncLoader } from 'react-spinners'
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

const LoadingComp = () => {
    return (
        <div className='flex justify-center items-center'>
            <SyncLoader
                color="#361AE3"
                loading={true}
                cssOverride={MainSpinner}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default React.memo(LoadingComp)