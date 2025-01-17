import React from 'react';

interface DialogProps {
    open: boolean;
    children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, children }) => {
    return (
        <div>
            {open && children}
        </div>
    );
};

export default Dialog;

