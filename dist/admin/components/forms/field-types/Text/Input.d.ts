import React, { ChangeEvent } from 'react';
import { TextField } from '../../../../../fields/config/types';
import { Description } from '../../FieldDescription/types';
import './index.scss';
export declare type TextInputProps = Omit<TextField, 'type'> & {
    showError?: boolean;
    errorMessage?: string;
    readOnly?: boolean;
    path: string;
    required?: boolean;
    value?: string;
    description?: Description;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: Record<string, string> | string;
    style?: React.CSSProperties;
    className?: string;
    width?: string;
    inputRef?: React.MutableRefObject<HTMLInputElement>;
};
declare const TextInput: React.FC<TextInputProps>;
export default TextInput;
