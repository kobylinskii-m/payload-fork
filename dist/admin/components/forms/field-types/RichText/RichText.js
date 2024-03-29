import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import isHotkey from 'is-hotkey';
import { createEditor, Transforms, Node, Element as SlateElement, Text } from 'slate';
import { Editable, withReact, Slate } from 'slate-react';
import { withHistory } from 'slate-history';
import { useTranslation } from 'react-i18next';
import { richText } from '../../../../../fields/validations';
import useField from '../../useField';
import withCondition from '../../withCondition';
import Label from '../../Label';
import Error from '../../Error';
import leafTypes from './leaves';
import elementTypes from './elements';
import toggleLeaf from './leaves/toggle';
import hotkeys from './hotkeys';
import enablePlugins from './enablePlugins';
import defaultValue from '../../../../../fields/richText/defaultValue';
import FieldDescription from '../../FieldDescription';
import withHTML from './plugins/withHTML';
import listTypes from './elements/listTypes';
import mergeCustomFunctions from './mergeCustomFunctions';
import withEnterBreakOut from './plugins/withEnterBreakOut';
import { getTranslation } from '../../../../../utilities/getTranslation';
import './index.scss';
const defaultElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'indent', 'link', 'relationship', 'upload'];
const defaultLeaves = ['bold', 'italic', 'underline', 'strikethrough', 'code'];
const baseClass = 'rich-text';
const RichText = (props) => {
    const { path: pathFromProps, name, required, validate = richText, label, admin, admin: { readOnly, style, className, width, placeholder, description, condition, hideGutter, } = {}, } = props;
    const elements = (admin === null || admin === void 0 ? void 0 : admin.elements) || defaultElements;
    const leaves = (admin === null || admin === void 0 ? void 0 : admin.leaves) || defaultLeaves;
    const path = pathFromProps || name;
    const { i18n } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [enabledElements, setEnabledElements] = useState({});
    const [enabledLeaves, setEnabledLeaves] = useState({});
    const [initialValueKey, setInitialValueKey] = useState('');
    const editorRef = useRef(null);
    const toolbarRef = useRef(null);
    const renderElement = useCallback(({ attributes, children, element }) => {
        const matchedElement = enabledElements[element === null || element === void 0 ? void 0 : element.type];
        const Element = matchedElement === null || matchedElement === void 0 ? void 0 : matchedElement.Element;
        if (Element) {
            return (React.createElement(Element, { attributes: attributes, element: element, path: path, fieldProps: props, editorRef: editorRef }, children));
        }
        return React.createElement("div", { ...attributes }, children);
    }, [enabledElements, path, props]);
    const renderLeaf = useCallback(({ attributes, children, leaf }) => {
        const matchedLeaves = Object.entries(enabledLeaves).filter(([leafName]) => leaf[leafName]);
        if (matchedLeaves.length > 0) {
            return matchedLeaves.reduce((result, [leafName], i) => {
                var _a, _b;
                if ((_a = enabledLeaves[leafName]) === null || _a === void 0 ? void 0 : _a.Leaf) {
                    const Leaf = (_b = enabledLeaves[leafName]) === null || _b === void 0 ? void 0 : _b.Leaf;
                    return (React.createElement(Leaf, { key: i, leaf: leaf, path: path, fieldProps: props, editorRef: editorRef }, result));
                }
                return result;
            }, React.createElement("span", { ...attributes }, children));
        }
        return (React.createElement("span", { ...attributes }, children));
    }, [enabledLeaves, path, props]);
    const memoizedValidate = useCallback((value, validationOptions) => {
        return validate(value, { ...validationOptions, required });
    }, [validate, required]);
    const fieldType = useField({
        path,
        validate: memoizedValidate,
        condition,
    });
    const { value, showError, setValue, errorMessage, initialValue, } = fieldType;
    const classes = [
        baseClass,
        'field-type',
        className,
        showError && 'error',
        readOnly && `${baseClass}--read-only`,
        !hideGutter && `${baseClass}--gutter`,
    ].filter(Boolean).join(' ');
    const editor = useMemo(() => {
        let CreatedEditor = withEnterBreakOut(withHistory(withReact(createEditor())));
        CreatedEditor = withHTML(CreatedEditor);
        CreatedEditor = enablePlugins(CreatedEditor, elements);
        CreatedEditor = enablePlugins(CreatedEditor, leaves);
        return CreatedEditor;
    }, [elements, leaves]);
    useEffect(() => {
        if (!loaded) {
            const mergedElements = mergeCustomFunctions(elements, elementTypes);
            const mergedLeaves = mergeCustomFunctions(leaves, leafTypes);
            setEnabledElements(mergedElements);
            setEnabledLeaves(mergedLeaves);
            setLoaded(true);
        }
    }, [loaded, elements, leaves]);
    useEffect(() => {
        setInitialValueKey(JSON.stringify(initialValue || ''));
    }, [initialValue]);
    useEffect(() => {
        function setClickableState(clickState) {
            var _a, _b;
            const selectors = 'button, a, [role="button"]';
            const toolbarButtons = (_a = toolbarRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selectors);
            const editorButtons = (_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.querySelectorAll(selectors);
            [...(toolbarButtons || []), ...(editorButtons || [])].forEach((child) => {
                const isButton = child.tagName === 'BUTTON';
                const isDisabling = clickState === 'disabled';
                child.setAttribute('tabIndex', isDisabling ? '-1' : '0');
                if (isButton)
                    child.setAttribute('disabled', isDisabling ? 'disabled' : null);
            });
        }
        if (loaded && readOnly) {
            setClickableState('disabled');
        }
        return () => {
            if (loaded && readOnly) {
                setClickableState('enabled');
            }
        };
    }, [loaded, readOnly]);
    if (!loaded) {
        return null;
    }
    let valueToRender = value;
    if (typeof valueToRender === 'string') {
        try {
            const parsedJSON = JSON.parse(valueToRender);
            valueToRender = parsedJSON;
        }
        catch (err) {
            // do nothing
        }
    }
    if (!valueToRender)
        valueToRender = defaultValue;
    return (React.createElement("div", { key: initialValueKey, className: classes, style: {
            ...style,
            width,
        } },
        React.createElement("div", { className: `${baseClass}__wrap` },
            React.createElement(Error, { showError: showError, message: errorMessage }),
            React.createElement(Label, { htmlFor: `field-${path.replace(/\./gi, '__')}`, label: label, required: required }),
            React.createElement(Slate, { editor: editor, value: valueToRender, onChange: (val) => {
                    if (!readOnly && val !== defaultValue && val !== value) {
                        setValue(val);
                    }
                } },
                React.createElement("div", { className: `${baseClass}__wrapper` },
                    React.createElement("div", { className: `${baseClass}__toolbar`, ref: toolbarRef },
                        React.createElement("div", { className: `${baseClass}__toolbar-wrap` },
                            elements.map((element, i) => {
                                let elementName;
                                if (typeof element === 'object' && (element === null || element === void 0 ? void 0 : element.name))
                                    elementName = element.name;
                                if (typeof element === 'string')
                                    elementName = element;
                                const elementType = enabledElements[elementName];
                                const Button = elementType === null || elementType === void 0 ? void 0 : elementType.Button;
                                if (Button) {
                                    return (React.createElement(Button, { fieldProps: props, key: i, path: path }));
                                }
                                return null;
                            }),
                            leaves.map((leaf, i) => {
                                let leafName;
                                if (typeof leaf === 'object' && (leaf === null || leaf === void 0 ? void 0 : leaf.name))
                                    leafName = leaf.name;
                                if (typeof leaf === 'string')
                                    leafName = leaf;
                                const leafType = enabledLeaves[leafName];
                                const Button = leafType === null || leafType === void 0 ? void 0 : leafType.Button;
                                if (Button) {
                                    return (React.createElement(Button, { fieldProps: props, key: i, path: path }));
                                }
                                return null;
                            }))),
                    React.createElement("div", { className: `${baseClass}__editor`, ref: editorRef },
                        React.createElement(Editable, { id: `field-${path.replace(/\./gi, '__')}`, className: `${baseClass}__input`, renderElement: renderElement, renderLeaf: renderLeaf, placeholder: getTranslation(placeholder, i18n), spellCheck: true, readOnly: readOnly, onKeyDown: (event) => {
                                if (event.key === 'Enter') {
                                    if (event.shiftKey) {
                                        event.preventDefault();
                                        editor.insertText('\n');
                                    }
                                    else {
                                        const selectedElement = Node.descendant(editor, editor.selection.anchor.path.slice(0, -1));
                                        if (SlateElement.isElement(selectedElement)) {
                                            // Allow hard enter to "break out" of certain elements
                                            if (editor.shouldBreakOutOnEnter(selectedElement)) {
                                                event.preventDefault();
                                                const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path);
                                                if (Text.isText(selectedLeaf) && String(selectedLeaf.text).length === editor.selection.anchor.offset) {
                                                    Transforms.insertNodes(editor, { children: [{ text: '' }] });
                                                }
                                                else {
                                                    Transforms.splitNodes(editor);
                                                    Transforms.setNodes(editor, {});
                                                }
                                            }
                                        }
                                    }
                                }
                                if (event.key === 'Backspace') {
                                    const selectedElement = Node.descendant(editor, editor.selection.anchor.path.slice(0, -1));
                                    if (SlateElement.isElement(selectedElement) && selectedElement.type === 'li') {
                                        const selectedLeaf = Node.descendant(editor, editor.selection.anchor.path);
                                        if (Text.isText(selectedLeaf) && String(selectedLeaf.text).length === 1) {
                                            Transforms.unwrapNodes(editor, {
                                                match: (n) => SlateElement.isElement(n) && listTypes.includes(n.type),
                                                split: true,
                                            });
                                            Transforms.setNodes(editor, {});
                                        }
                                    }
                                    else if (editor.isVoid(selectedElement)) {
                                        Transforms.removeNodes(editor);
                                    }
                                }
                                Object.keys(hotkeys).forEach((hotkey) => {
                                    if (isHotkey(hotkey, event)) {
                                        event.preventDefault();
                                        const mark = hotkeys[hotkey];
                                        toggleLeaf(editor, mark);
                                    }
                                });
                            } })))),
            React.createElement(FieldDescription, { value: value, description: description }))));
};
export default withCondition(RichText);
