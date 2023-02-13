import React, { useCallback } from 'react';
import Select, { components, } from 'react-select';
import { SortableContainer, SortableElement, SortableHandle, } from 'react-sortable-hoc';
import { useTranslation } from 'react-i18next';
import { arrayMove } from '../../../../utilities/arrayMove';
import Chevron from '../../icons/Chevron';
import { getTranslation } from '../../../../utilities/getTranslation';
import './index.scss';
const SortableMultiValue = SortableElement((props) => {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    const onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const classes = [
        props.className,
        !props.isDisabled && 'draggable',
    ].filter(Boolean).join(' ');
    return (React.createElement(components.MultiValue, { ...props, className: classes, innerProps: { ...props.innerProps, onMouseDown } }));
});
const SortableMultiValueLabel = SortableHandle((props) => React.createElement(components.MultiValueLabel, { ...props }));
const SortableSelect = SortableContainer(Select);
const ReactSelect = (props) => {
    const { t, i18n } = useTranslation();
    const { className, showError = false, options, onChange, value, disabled = false, placeholder = t('general:selectValue'), isSearchable = true, isClearable = true, isMulti, isSortable, filterOption = undefined, isLoading, onMenuOpen, } = props;
    const classes = [
        className,
        'react-select',
        showError && 'react-select--error',
    ].filter(Boolean).join(' ');
    const onSortStart = useCallback(({ helper }) => {
        const portalNode = helper;
        if (portalNode && portalNode.style) {
            portalNode.style.cssText += 'pointer-events: auto; cursor: grabbing;';
        }
    }, []);
    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        onChange(arrayMove(value, oldIndex, newIndex));
    }, [onChange, value]);
    if (isMulti && isSortable) {
        return (React.createElement(SortableSelect, { useDragHandle: true, 
            // react-sortable-hoc props:
            axis: "xy", onSortStart: onSortStart, onSortEnd: onSortEnd, 
            // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
            getHelperDimensions: ({ node }) => node.getBoundingClientRect(), 
            // react-select props:
            placeholder: getTranslation(placeholder, i18n), ...props, value: value, onChange: onChange, disabled: disabled ? 'disabled' : undefined, className: classes, classNamePrefix: "rs", captureMenuScroll: true, options: options, isSearchable: isSearchable, isClearable: isClearable, isLoading: isLoading, onMenuOpen: onMenuOpen, components: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore We're failing to provide a required index prop to SortableElement
                MultiValue: SortableMultiValue,
                MultiValueLabel: SortableMultiValueLabel,
                DropdownIndicator: Chevron,
            }, filterOption: filterOption }));
    }
    return (React.createElement(Select, { isLoading: isLoading, placeholder: getTranslation(placeholder, i18n), captureMenuScroll: true, ...props, value: value, onChange: onChange, disabled: disabled ? 'disabled' : undefined, components: { DropdownIndicator: Chevron }, className: classes, classNamePrefix: "rs", options: options, isSearchable: isSearchable, isClearable: isClearable, filterOption: filterOption, onMenuOpen: onMenuOpen }));
};
export default ReactSelect;
