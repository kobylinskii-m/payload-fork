import React, { ChangeEvent } from 'react';
import { TextareaField } from '../../../../../fields/config/types';
import { Description } from '../../FieldDescription/types';
import './index.scss';
export declare type TextAreaInputProps = Omit<TextareaField, 'type'> & {
    showError?: boolean;
    errorMessage?: string;
    readOnly?: boolean;
    path: string;
    required?: boolean;
    value?: string;
    description?: Description;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: Record<string, string> | string;
    style?: React.CSSProperties;
    className?: string;
    width?: string;
    rows?: number;
};
declare const TextareaInput: React.FC<TextAreaInputProps>;
export default TextareaInput;