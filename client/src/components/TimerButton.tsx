import React from "react";

interface Props
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    children?: React.ReactNode;
}

const TimerButton: React.FC<Props> = ({ children, onClick, className }) => {
    return (
        <button
            className={
                "w-full h-12 transition-all bg-grey-dark hover:text-white hover:bg-opacity-75 active:bg-opacity-50 " +
                className
            }
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default TimerButton;
