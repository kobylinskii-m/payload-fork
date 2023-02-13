/// <reference types="react" />
import { CollectionConfig } from "../collections/config/types";
import { Field } from "../fields/config/types";
export default function appendFields(collections: CollectionConfig[], fields: Field[]): (import("../fields/config/types").TextField | import("../fields/config/types").NumberField | import("../fields/config/types").EmailField | import("../fields/config/types").TextareaField | import("../fields/config/types").CheckboxField | import("../fields/config/types").DateField | import("../fields/config/types").BlockField | import("../fields/config/types").GroupField | import("../fields/config/types").RadioField | import("../fields/config/types").RelationshipField | import("../fields/config/types").ArrayField | import("../fields/config/types").RichTextField | import("../fields/config/types").SelectField | import("../fields/config/types").UploadField | import("../fields/config/types").CodeField | import("../fields/config/types").PointField | import("../fields/config/types").RowField | import("../fields/config/types").CollapsibleField | import("../fields/config/types").TabsField | import("../fields/config/types").UIField | {
    fields: Field[];
    name: string;
    label?: string | false | Record<string, string>;
    required?: boolean;
    unique?: boolean;
    index?: boolean;
    defaultValue?: any;
    hidden?: boolean;
    saveToJWT?: boolean;
    localized?: boolean;
    validate?: import("../fields/config/types").Validate<any, any, any>;
    hooks?: {
        beforeValidate?: import("../fields/config/types").FieldHook<any, any, any>[];
        beforeChange?: import("../fields/config/types").FieldHook<any, any, any>[];
        afterChange?: import("../fields/config/types").FieldHook<any, any, any>[];
        afterRead?: import("../fields/config/types").FieldHook<any, any, any>[];
    };
    admin?: {
        position?: "sidebar";
        width?: string;
        style?: import("react").CSSProperties;
        className?: string;
        readOnly?: boolean;
        disabled?: boolean;
        condition?: import("../fields/config/types").Condition<any, any>;
        description?: import("../admin/components/forms/FieldDescription/types").Description;
        components?: {
            Filter?: import("react").ComponentType<any>;
            Cell?: import("react").ComponentType<any>;
            Field?: import("react").ComponentType<any>;
        };
        hidden?: boolean;
    } & {
        isSortable?: boolean;
    };
    access?: {
        create?: import("../fields/config/types").FieldAccess<any, any, any>;
        read?: import("../fields/config/types").FieldAccess<any, any, any>;
        update?: import("../fields/config/types").FieldAccess<any, any, any>;
    };
    type: "relationship";
    relationTo: string | string[];
    hasMany?: boolean;
    maxDepth?: number;
    filterOptions?: import("../fields/config/types").FilterOptions<any>;
})[];
