/// <reference types="react" />
import { Response } from 'express';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Model, PaginateModel } from 'mongoose';
import { DeepRequired } from 'ts-essentials';
import { Auth, IncomingAuthType } from '../../auth/types';
import { Access, Endpoint, EntityDescription, GeneratePreviewURL } from '../../config/types';
import { PayloadRequest } from '../../express/types';
import { Field } from '../../fields/config/types';
import { IncomingUploadType, Upload } from '../../uploads/types';
import { IncomingCollectionVersions, SanitizedCollectionVersions } from '../../versions/types';
declare type Register<T = any> = (doc: T, password: string) => T;
interface PassportLocalModel {
    register: Register;
    authenticate: any;
}
export interface CollectionModel extends Model<any>, PaginateModel<any>, PassportLocalModel {
    buildQuery: (query: unknown, locale?: string) => Record<string, unknown>;
}
export interface AuthCollectionModel extends CollectionModel {
    resetPasswordToken: string;
    resetPasswordExpiration: Date;
}
export declare type HookOperationType = 'create' | 'autosave' | 'read' | 'update' | 'delete' | 'refresh' | 'login' | 'forgotPassword';
declare type CreateOrUpdateOperation = Extract<HookOperationType, 'create' | 'update'>;
export declare type BeforeOperationHook = (args: {
    args?: any;
    /**
     * Hook operation being performed
     */
    operation: HookOperationType;
}) => any;
export declare type BeforeValidateHook<T extends TypeWithID = any> = (args: {
    data?: Partial<T>;
    req?: PayloadRequest;
    /**
     * Hook operation being performed
     */
    operation: CreateOrUpdateOperation;
    /**
     * Original document before change
     *
     * `undefined` on 'create' operation
     */
    originalDoc?: T;
}) => any;
export declare type BeforeChangeHook<T extends TypeWithID = any> = (args: {
    data: Partial<T>;
    req: PayloadRequest;
    /**
     * Hook operation being performed
     */
    operation: CreateOrUpdateOperation;
    /**
     * Original document before change
     *
     * `undefined` on 'create' operation
     */
    originalDoc?: T;
}) => any;
export declare type AfterChangeHook<T extends TypeWithID = any> = (args: {
    doc: T;
    req: PayloadRequest;
    previousDoc: T;
    /**
     * Hook operation being performed
     */
    operation: CreateOrUpdateOperation;
}) => any;
export declare type BeforeReadHook<T extends TypeWithID = any> = (args: {
    doc: T;
    req: PayloadRequest;
    query: {
        [key: string]: any;
    };
}) => any;
export declare type AfterReadHook<T extends TypeWithID = any> = (args: {
    doc: T;
    req: PayloadRequest;
    query?: {
        [key: string]: any;
    };
    findMany?: boolean;
}) => any;
export declare type BeforeDeleteHook = (args: {
    req: PayloadRequest;
    id: string;
}) => any;
export declare type AfterDeleteHook<T extends TypeWithID = any> = (args: {
    doc: T;
    req: PayloadRequest;
    id: string;
}) => any;
export declare type AfterErrorHook = (err: Error, res: unknown) => {
    response: any;
    status: number;
} | void;
export declare type BeforeLoginHook<T extends TypeWithID = any> = (args: {
    req: PayloadRequest;
    user: T;
}) => any;
export declare type AfterLoginHook<T extends TypeWithID = any> = (args: {
    req: PayloadRequest;
    user: T;
    token: string;
}) => any;
export declare type AfterLogoutHook<T extends TypeWithID = any> = (args: {
    req: PayloadRequest;
    res: Response;
}) => any;
export declare type AfterMeHook<T extends TypeWithID = any> = (args: {
    req: PayloadRequest;
    response: unknown;
}) => any;
export declare type AfterRefreshHook<T extends TypeWithID = any> = (args: {
    req: PayloadRequest;
    res: Response;
    token: string;
    exp: number;
}) => any;
export declare type AfterForgotPasswordHook = (args: {
    args?: any;
}) => any;
declare type BeforeDuplicateArgs<T> = {
    data: T;
    locale?: string;
};
export declare type BeforeDuplicate<T = any> = (args: BeforeDuplicateArgs<T>) => T | Promise<T>;
export declare type CollectionAdminOptions = {
    /**
     * Field to use as title in Edit view and first column in List view
     */
    useAsTitle?: string;
    /**
     * Default columns to show in list view
     */
    defaultColumns?: string[];
    /**
     * Additional fields to be searched via the full text search
     */
    listSearchableFields?: string[];
    hooks?: {
        /**
         * Function that allows you to modify a document's data before it is duplicated
         */
        beforeDuplicate?: BeforeDuplicate;
    };
    /**
     * Place collections into a navigational group
     * */
    group?: Record<string, string> | string;
    /**
     * Custom description for collection
     */
    description?: EntityDescription;
    disableDuplicate?: boolean;
    /**
     * Hide the API URL within the Edit view
     */
    hideAPIURL?: boolean;
    /**
     * Custom admin components
     */
    components?: {
        views?: {
            Edit?: React.ComponentType<any>;
            List?: React.ComponentType<any>;
        };
    };
    pagination?: {
        defaultLimit?: number;
        limits?: number[];
    };
    enableRichTextRelationship?: boolean;
    /**
     * Function to generate custom preview URL
     */
    preview?: GeneratePreviewURL;
};
/** Manage all aspects of a data collection */
export declare type CollectionConfig = {
    slug: string;
    /**
     * The name of the collection in the database. By default it is generated from slug
     */
    collectionName?: string;
    /**
     * Label configuration
     */
    labels?: {
        singular?: Record<string, string> | string;
        plural?: Record<string, string> | string;
    };
    /**
     * GraphQL configuration
     */
    graphQL?: {
        singularName?: string;
        pluralName?: string;
    };
    /**
     * Options used in typescript generation
     */
    typescript?: {
        /**
         * Typescript generation name given to the interface type
         */
        interface?: string;
    };
    fields: Field[];
    /**
     * Collection admin options
     */
    admin?: CollectionAdminOptions;
    /**
     * Hooks to modify Payload functionality
     */
    hooks?: {
        beforeOperation?: BeforeOperationHook[];
        beforeValidate?: BeforeValidateHook[];
        beforeChange?: BeforeChangeHook[];
        afterChange?: AfterChangeHook[];
        beforeRead?: BeforeReadHook[];
        afterRead?: AfterReadHook[];
        beforeDelete?: BeforeDeleteHook[];
        afterDelete?: AfterDeleteHook[];
        afterError?: AfterErrorHook;
        beforeLogin?: BeforeLoginHook[];
        afterLogin?: AfterLoginHook[];
        afterLogout?: AfterLogoutHook[];
        afterMe?: AfterMeHook[];
        afterRefresh?: AfterRefreshHook[];
        afterForgotPassword?: AfterForgotPasswordHook[];
    };
    /**
     * Custom rest api endpoints
     */
    endpoints?: Omit<Endpoint, 'root'>[];
    /**
     * Access control
     */
    access?: {
        create?: Access;
        read?: Access;
        readVersions?: Access;
        update?: Access;
        delete?: Access;
        admin?: (args?: any) => boolean | Promise<boolean>;
        unlock?: Access;
    };
    /**
     * Collection login options
     *
     * Use `true` to enable with default options
     */
    auth?: IncomingAuthType | boolean;
    /**
     * Customize the handling of incoming file uploads
     *
     * @default false // disable uploads
     */
    upload?: IncomingUploadType | boolean;
    /**
     * Customize the handling of incoming file uploads
     *
     * @default false // disable versioning
     */
    versions?: IncomingCollectionVersions | boolean;
    /**
     * Add `createdAt` and `updatedAt` fields
     *
     * @default true
     */
    timestamps?: boolean;
};
export interface SanitizedCollectionConfig extends Omit<DeepRequired<CollectionConfig>, 'auth' | 'upload' | 'fields' | 'versions'> {
    auth: Auth;
    upload: Upload;
    fields: Field[];
    versions: SanitizedCollectionVersions;
}
export declare type Collection = {
    Model: CollectionModel;
    config: SanitizedCollectionConfig;
    graphQL?: {
        type: GraphQLObjectType;
        JWT: GraphQLObjectType;
        versionType: GraphQLObjectType;
        whereInputType: GraphQLInputObjectType;
        mutationInputType: GraphQLNonNull<any>;
        updateMutationInputType: GraphQLNonNull<any>;
    };
};
export declare type AuthCollection = {
    Model: AuthCollectionModel;
    config: SanitizedCollectionConfig;
};
export declare type TypeWithID = {
    id: string | number;
};
export declare type TypeWithTimestamps = {
    id: string | number;
    createdAt: string;
    updatedAt: string;
};
export {};
