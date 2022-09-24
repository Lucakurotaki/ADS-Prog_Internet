import { MouseEventHandler } from "react";

interface ButtonProps{
    label?: string;
    onClickCallback: MouseEventHandler;
}

export function Button({label, onClickCallback}: ButtonProps){
    return(
        <>
        <button className="btn" onClick={onClickCallback}>{label}</button>
        </>
    )
}