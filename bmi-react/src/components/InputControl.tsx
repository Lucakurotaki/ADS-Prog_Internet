import { ChangeEventHandler } from "react";
import { Input } from "./Input";

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
                <Input type={type} value={value} onChangeCallback={onChangeCallback} placeHolder={placeHolder}/>
            </div>
        </>
    )
}