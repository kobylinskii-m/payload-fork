import { CSSProperties } from "react";
import { Editor } from "slate";
import type { TFunction } from "i18next";
import { Operation, Where } from "../../types";
import { TypeWithID } from "../../collections/config/types";
import { PayloadRequest } from "../../express/types";
import { ConditionalDateProps } from "../../admin/components/elements/DatePicker/types";
import { Description } from "../../admin/components/forms/FieldDescription/types";
import { User } from "../../auth";
import { Payload } from "../..";
import { RowLabel } from "../../admin/components/forms/RowLabel/types";
export declare type FieldHookArgs<T extends TypeWithID = any, P = any, S = any> = {
    /** The data passed to update the document within create and update operations, and the full document itself in the afterRead hook. */
    data?: Partial<T>;
    /** Boolean to denote if this hook is running against finding one, or finding many within the afterRead hook. */
    findMany?: boolean;
    /** The full original document in `update` operations. In the `afterChange` hook, this is the resulting document of the operation. */
    originalDoc?: T;
    /** The document before changes were applied, only in `afterChange` hooks. */
    previousDoc?: T;
    /** The sibling data from the previous document in `afterChange` hook. */
    previousSiblingDoc?: T;
    /** A string relating to which operation the field type is currently executing within. Useful within beforeValidate, beforeChange, and afterChange hooks to differentiate between create and update operations. */
    operation?: "create" | "read" | "update" | "delete";
    /** The Express request object. It is mocked for Local API operations. */
    req: PayloadRequest;
    /** The sibling data passed to a field that the hook is running against. */
    siblingData: Partial<S>;
    /** The value of the field. */
    value?: P;
    previousValue?: P;
};
export declare type FieldHook<T extends TypeWithID = any, P = any, S = any> = (args: FieldHookArgs<T, P, S>) => Promise<P> | P;
export declare type FieldAccess<T extends TypeWithID = any, P = any, U = any> = (args: {
    req: PayloadRequest<U>;
    id?: string | number;
    data?: Partial<T>;
    siblingData?: Partial<P>;
    doc?: T;
}) => Promise<boolean> | boolean;
export declare type Condition<T extends TypeWithID = any, P = any> = (data: Partial<T>, siblingData: Partial<P>) => boolean;
export declare type FilterOptionsProps<T = any> = {
    id: string | number;
    user: Partial<User>;
    data: T;
    siblingData: unknown;
    relationTo: string | string[];
};
export declare type FilterOptions<T = any> = Where | ((options: FilterOptionsProps<T>) => Where);
declare type Admin = {
    position?: "sidebar";
    width?: string;
    style?: CSSProperties;
    className?: string;
    readOnly?: boolean;
    disabled?: boolean;
    condition?: Condition;
    description?: Description;
    components?: {
        Filter?: React.ComponentType<any>;
        Cell?: React.ComponentType<any>;
        Field?: React.ComponentType<any>;
    };
    hidden?: boolean;
};
export declare type Labels = {
    singular: Record<string, string> | string;
    plural: Record<string, string> | string;
};
export declare type ValidateOptions<T, S, F> = {
    data: Partial<T>;
    siblingData: Partial<S>;
    id?: string | number;
    user?: Partial<User>;
    operation?: Operation;
    payload?: Payload;
    t: TFunction;
} & F;
export declare type Validate<T = any, S = any, F = any> = (value?: T, options?: ValidateOptions<F, S, Partial<F>>) => string | true | Promise<string | true>;
export declare type OptionObject = {
    label: Record<string, string> | string;
    value: string;
};
export declare type Option = OptionObject | string;
export interface FieldBase {
    name: string;
    label?: Record<string, string> | string | false;
    required?: boolean;
    unique?: boolean;
    index?: boolean;
    defaultValue?: any;
    hidden?: boolean;
    saveToJWT?: boolean;
    localized?: boolean;
    validate?: Validate;
    hooks?: {
        beforeValidate?: FieldHook[];
        beforeChange?: FieldHook[];
        afterChange?: FieldHook[];
        afterRead?: FieldHook[];
    };
    admin?: Admin;
    access?: {
        create?: FieldAccess;
        read?: FieldAccess;
        update?: FieldAccess;
    };
}
export declare type NumberField = FieldBase & {
    type: "number";
    admin?: Admin & {
        autoComplete?: string;
        placeholder?: Record<string, string> | string;
        step?: number;
    };
    min?: number;
    max?: number;
};
export declare type TextField = FieldBase & {
    type: "text";
    maxLength?: number;
    minLength?: number;
    admin?: Admin & {
        placeholder?: Record<string, string> | string;
        autoComplete?: string;
    };
};
export declare type EmailField = FieldBase & {
    type: "email";
    admin?: Admin & {
        placeholder?: Record<string, string> | string;
        autoComplete?: string;
    };
};
export declare type TextareaField = FieldBase & {
    type: "textarea";
    maxLength?: number;
    minLength?: number;
    admin?: Admin & {
        placeholder?: Record<string, string> | string;
        rows?: number;
    };
};
export declare type CheckboxField = FieldBase & {
    type: "checkbox";
};
export declare type DateField = FieldBase & {
    type: "date";
    admin?: Admin & {
        placeholder?: Record<string, string> | string;
        date?: ConditionalDateProps;
    };
};
export declare type GroupField = FieldBase & {
    type: "group";
    fields: Field[];
    admin?: Admin & {
        hideGutter?: boolean;
    };
};
export declare type RowAdmin = Omit<Admin, "description">;
export declare type RowField = Omit<FieldBase, "admin" | "name"> & {
    admin?: RowAdmin;
    type: "row";
    fields: Field[];
};
export declare type CollapsibleField = Omit<FieldBase, "name" | "label"> & {
    type: "collapsible";
    label: RowLabel;
    fields: Field[];
    admin?: Admin & {
        initCollapsed?: boolean | false;
    };
};
export declare type TabsAdmin = Omit<Admin, "description">;
declare type TabBase = {
    fields: Field[];
    description?: Description;
};
export declare type NamedTab = TabBase & FieldBase;
export declare type UnnamedTab = TabBase & Omit<FieldBase, "name"> & {
    label: Record<string, string> | string;
    localized?: never;
};
export declare type Tab = NamedTab | UnnamedTab;
export declare type TabsField = Omit<FieldBase, "admin" | "name" | "localized"> & {
    type: "tabs";
    tabs: Tab[];
    admin?: TabsAdmin;
};
export declare type TabAsField = Tab & {
    type: "tab";
    name?: string;
};
export declare type UIField = {
    name: string;
    label?: Record<string, string> | string;
    admin: {
        position?: string;
        width?: string;
        condition?: Condition;
        components?: {
            Filter?: React.ComponentType<any>;
            Cell?: React.ComponentType<any>;
            Field: React.ComponentType<any>;
        };
    };
    type: "ui";
};
export declare type UploadField = FieldBase & {
    type: "upload";
    relationTo: string;
    maxDepth?: number;
    filterOptions?: FilterOptions;
};
declare type CodeAdmin = Admin & {
    language?: string;
};
export declare type CodeField = Omit<FieldBase, "admin"> & {
    admin?: CodeAdmin;
    minLength?: number;
    maxLength?: number;
    type: "code";
};
export declare type SelectField = FieldBase & {
    type: "select";
    options: Option[];
    hasMany?: boolean;
    admin?: Admin & {
        isClearable?: boolean;
        isSortable?: boolean;
    };
};
export declare type RelationshipField = FieldBase & {
    type: "relationship";
    relationTo: string | string[];
    hasMany?: boolean;
    maxDepth?: number;
    filterOptions?: FilterOptions;
    admin?: Admin & {
        isSortable?: boolean;
    };
};
export declare type SearchableRelationshipField = RelationshipField & {
    fields?: Field[];
};
export declare type ValueWithRelation = {
    relationTo: string;
    value: string | number;
};
export declare function valueIsValueWithRelation(value: unknown): value is ValueWithRelation;
export declare type RelationshipValue = (string | number) | (string | number)[] | ValueWithRelation | ValueWithRelation[];
declare type RichTextPlugin = (editor: Editor) => Editor;
export declare type RichTextCustomElement = {
    name: string;
    Button: React.ComponentType<any>;
    Element: React.ComponentType<any>;
    plugins?: RichTextPlugin[];
};
export declare type RichTextCustomLeaf = {
    name: string;
    Button: React.ComponentType<any>;
    Leaf: React.ComponentType<any>;
    plugins?: RichTextPlugin[];
};
export declare type RichTextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote" | "ul" | "ol" | "link" | "relationship" | "upload" | "indent" | RichTextCustomElement;
export declare type RichTextLeaf = "bold" | "italic" | "underline" | "strikethrough" | "code" | RichTextCustomLeaf;
export declare type RichTextField = FieldBase & {
    type: "richText";
    admin?: Admin & {
        placeholder?: Record<string, string> | string;
        elements?: RichTextElement[];
        leaves?: RichTextLeaf[];
        hideGutter?: boolean;
        upload?: {
            collections: {
                [collection: string]: {
                    fields: Field[];
                };
            };
        };
        link?: {
            fields?: Field[];
        };
    };
};
export declare type ArrayField = FieldBase & {
    type: "array";
    minRows?: number;
    maxRows?: number;
    labels?: Labels;
    fields: Field[];
    admin?: Admin & {
        initCollapsed?: boolean | false;
        components?: {
            RowLabel?: RowLabel;
        } & Admin["components"];
    };
};
export declare type RadioField = FieldBase & {
    type: "radio";
    options: Option[];
    admin?: Admin & {
        layout?: "horizontal" | "vertical";
    };
};
export declare type Block = {
    slug: string;
    labels?: Labels;
    fields: Field[];
    imageURL?: string;
    imageAltText?: string;
    graphQL?: {
        singularName?: string;
    };
};
export declare type BlockField = FieldBase & {
    type: "blocks";
    minRows?: number;
    maxRows?: number;
    blocks: Block[];
    defaultValue?: unknown;
    labels?: Labels;
    admin?: Admin & {
        initCollapsed?: boolean | false;
    };
};
export declare type PointField = FieldBase & {
    type: "point";
};
export declare type Field = TextField | NumberField | EmailField | TextareaField | CheckboxField | DateField | BlockField | GroupField | RadioField | RelationshipField | ArrayField | RichTextField | SelectField | UploadField | CodeField | PointField | RowField | CollapsibleField | TabsField | UIField;
export declare type SearchableField = TextField | NumberField | EmailField | TextareaField | CheckboxField | DateField | BlockField | GroupField | RadioField | SearchableRelationshipField | ArrayField | RichTextField | SelectField | UploadField | CodeField | PointField | RowField | CollapsibleField | TabsField | UIField;
export declare type FieldAffectingData = TextField | NumberField | EmailField | TextareaField | CheckboxField | DateField | BlockField | GroupField | RadioField | RelationshipField | ArrayField | RichTextField | SelectField | UploadField | CodeField | PointField | TabAsField;
export declare type NonPresentationalField = TextField | NumberField | EmailField | TextareaField | CheckboxField | DateField | BlockField | GroupField | RadioField | RelationshipField | ArrayField | RichTextField | SelectField | UploadField | CodeField | PointField | RowField | TabsField | CollapsibleField;
export declare type FieldWithPath = Field & {
    path?: string;
};
export declare type FieldWithSubFields = GroupField | ArrayField | RowField | CollapsibleField;
export declare type FieldPresentationalOnly = UIField;
export declare type FieldWithMany = SelectField | RelationshipField;
export declare type FieldWithMaxDepth = UploadField | RelationshipField;
export declare function fieldHasSubFields(field: Field): field is FieldWithSubFields;
export declare function fieldIsArrayType(field: Field): field is ArrayField;
export declare function fieldIsBlockType(field: Field): field is BlockField;
export declare function optionIsObject(option: Option): option is OptionObject;
export declare function optionsAreObjects(options: Option[]): options is OptionObject[];
export declare function optionIsValue(option: Option): option is string;
export declare function fieldSupportsMany(field: Field): field is FieldWithMany;
export declare function fieldHasMaxDepth(field: Field): field is FieldWithMaxDepth;
export declare function fieldIsPresentationalOnly(field: Field | TabAsField): field is UIField;
export declare function fieldAffectsData(field: Field | TabAsField): field is FieldAffectingData;
export declare function tabHasName(tab: Tab): tab is NamedTab;
export declare function fieldIsLocalized(field: Field | Tab): boolean;
export declare type HookName = "beforeRead" | "beforeChange" | "beforeValidate" | "afterChange" | "afterRead";
export {};
