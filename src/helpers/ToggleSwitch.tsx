import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/Store';
import { blockOrUnBlock, toggleBlockUser } from '../Redux/Reducers/customers/customerSlice';

const ToggleSwitch = ({ isChecked, userId, index }: { isChecked: boolean, userId: string, index: number }) => {
    const dispatch: AppDispatch = useDispatch()

    const handleToggle = () => {
        dispatch(blockOrUnBlock({ userId: userId.toString(), isBlocked: isChecked }))
        dispatch(toggleBlockUser({ index: index, value: !isChecked }))
    };
    return (
        <div className="toggle-wrapper">
            <input onChange={handleToggle} checked={isChecked} className="toggle-checkbox" type="checkbox" />
            <div className="toggle-container">
                <div className="toggle-button">
                    <div className="toggle-button-circles-container">
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                        <div className="toggle-button-circle"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ToggleSwitch);