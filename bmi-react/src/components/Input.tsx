import { ChangeEventHandler } from "react";

interface InputProps{
    type: string;
    value: any;
    onChangeCallback: ChangeEventHandler;
    placeHolder?: string;
}

export function Input({type, value, onChangeCallback, placeHolder}: InputProps) {
    return (
        <input
            autoComplete="off"
            type={type}
            value={value}
            onChange={onChangeCallback}
            placeholder={placeHolder}
        />
    )
}