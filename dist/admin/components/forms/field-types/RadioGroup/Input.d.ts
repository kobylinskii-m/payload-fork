import React from 'react';
import { RadioField } from '../../../../../fields/config/types';
import { Description } from '../../FieldDescription/types';
import { OnChange } from './types';
import './index.scss';
export declare type RadioGroupInputProps = Omit<RadioField, 'type'> & {
    showError?: boolean;
    errorMessage?: string;
    readOnly?: boolean;
    path?: string;
    required?: boolean;
    layout?: 'horizontal' | 'vertical';
    description?: Description;
    onChange?: OnChange;
    value?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
    width?: string;
};
declare const RadioGroupInput: React.FC<RadioGroupInputProps>;
export default RadioGroupInput;