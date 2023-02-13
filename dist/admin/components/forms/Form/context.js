"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWatchForm = exports.FormWatchContext = exports.useAllFormFields = exports.useFormFields = exports.FormFieldsContext = exports.FormContext = exports.useForm = exports.useFormModified = exports.useFormProcessing = exports.useFormSubmitted = exports.ModifiedContext = exports.ProcessingContext = exports.SubmittedContext = void 0;
const react_1 = require("react");
const use_context_selector_1 = require("use-context-selector");
const FormContext = (0, react_1.createContext)({});
exports.FormContext = FormContext;
const FormWatchContext = (0, react_1.createContext)({});
exports.FormWatchContext = FormWatchContext;
const SubmittedContext = (0, react_1.createContext)(false);
exports.SubmittedContext = SubmittedContext;
const ProcessingContext = (0, react_1.createContext)(false);
exports.ProcessingContext = ProcessingContext;
const ModifiedContext = (0, react_1.createContext)(false);
exports.ModifiedContext = ModifiedContext;
const FormFieldsContext = (0, use_context_selector_1.createContext)([{}, () => null]);
exports.FormFieldsContext = FormFieldsContext;
/**
 * Get the state of the form, can be used to submit & validate the form.
 *
 * @see https://payloadcms.com/docs/admin/hooks#useform
 */
const useForm = () => (0, react_1.useContext)(FormContext);
exports.useForm = useForm;
const useWatchForm = () => (0, react_1.useContext)(FormWatchContext);
exports.useWatchForm = useWatchForm;
const useFormSubmitted = () => (0, react_1.useContext)(SubmittedContext);
exports.useFormSubmitted = useFormSubmitted;
const useFormProcessing = () => (0, react_1.useContext)(ProcessingContext);
exports.useFormProcessing = useFormProcessing;
const useFormModified = () => (0, react_1.useContext)(ModifiedContext);
exports.useFormModified = useFormModified;
/**
 * Get and set the value of a form field based on a selector
 *
 * @see https://payloadcms.com/docs/admin/hooks#useformfields
 */
const useFormFields = (selector) => (0, use_context_selector_1.useContextSelector)(FormFieldsContext, selector);
exports.useFormFields = useFormFields;
/**
 * Get the state of all form fields.
 *
 * @see https://payloadcms.com/docs/admin/hooks#useallformfields
 */
const useAllFormFields = () => (0, use_context_selector_1.useContext)(FormFieldsContext);
exports.useAllFormFields = useAllFormFields;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hZG1pbi9jb21wb25lbnRzL2Zvcm1zL0Zvcm0vY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0Q7QUFDbEQsK0RBQWdJO0FBR2hJLE1BQU0sV0FBVyxHQUFHLElBQUEscUJBQWEsRUFBQyxFQUFhLENBQUMsQ0FBQztBQXlDL0Msa0NBQVc7QUF4Q2IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLHFCQUFhLEVBQUMsRUFBYSxDQUFDLENBQUM7QUE0Q3BELDRDQUFnQjtBQTNDbEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLHFCQUFhLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFnQzVDLDRDQUFnQjtBQS9CbEIsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLHFCQUFhLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFnQzdDLDhDQUFpQjtBQS9CbkIsTUFBTSxlQUFlLEdBQUcsSUFBQSxxQkFBYSxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBZ0MzQywwQ0FBZTtBQS9CakIsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLG9DQUFxQixFQUF3QixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBcUN2Riw4Q0FBaUI7QUFuQ25COzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxHQUFZLEVBQUUsQ0FBQyxJQUFBLGtCQUFVLEVBQUMsV0FBVyxDQUFDLENBQUM7QUE0QnJELDBCQUFPO0FBM0JULE1BQU0sWUFBWSxHQUFHLEdBQVksRUFBRSxDQUFDLElBQUEsa0JBQVUsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBaUMvRCxvQ0FBWTtBQWhDZCxNQUFNLGdCQUFnQixHQUFHLEdBQVksRUFBRSxDQUFDLElBQUEsa0JBQVUsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBdUJuRSw0Q0FBZ0I7QUF0QmxCLE1BQU0saUJBQWlCLEdBQUcsR0FBWSxFQUFFLENBQUMsSUFBQSxrQkFBVSxFQUFDLGlCQUFpQixDQUFDLENBQUM7QUF1QnJFLDhDQUFpQjtBQXRCbkIsTUFBTSxlQUFlLEdBQUcsR0FBWSxFQUFFLENBQUMsSUFBQSxrQkFBVSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBdUJqRSwwQ0FBZTtBQXBCakI7Ozs7R0FJRztBQUNILE1BQU0sYUFBYSxHQUFHLENBQWtCLFFBQW1ELEVBQVMsRUFBRSxDQUFDLElBQUEseUNBQWtCLEVBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFtQnJKLHNDQUFhO0FBakJmOzs7O0dBSUc7QUFDSCxNQUFNLGdCQUFnQixHQUFHLEdBQTBCLEVBQUUsQ0FBQyxJQUFBLGlDQUFjLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztBQWF0Riw0Q0FBZ0IifQ==