import { ChangeEventHandler } from "react";

interface InputControlProps {
    label: string;
    value: any;
    type: string;
    onChangeCallback: ChangeEventHandler;
    placeHolder?: string;
}

export function InputControl({ label, value, type, onChangeCallback, placeHolder }: InputControlProps) {
    return (
        <>
            <div className="input-control">
                <label>{label}</label>
                <input
                    autoComplete="off"
                    type={type}
                    value={value}
                    onChange={onChangeCallback}
                    placeholder={placeHolder}
                />
            </div>
        </>
    )
}