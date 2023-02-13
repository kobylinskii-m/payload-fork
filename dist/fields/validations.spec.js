"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validations_1 = require("./validations");
const t = jest.fn((string) => string);
let options = {
    operation: 'create',
    data: undefined,
    siblingData: undefined,
    t,
};
describe('Field Validations', () => {
    describe('text', () => {
        it('should validate', () => {
            const val = 'test';
            const result = (0, validations_1.text)(val, options);
            expect(result).toBe(true);
        });
        it('should show required message', () => {
            const val = undefined;
            const result = (0, validations_1.text)(val, { ...options, required: true });
            expect(result).toBe('validation:required');
        });
        it('should handle undefined', () => {
            const val = undefined;
            const result = (0, validations_1.text)(val, options);
            expect(result).toBe(true);
        });
        it('should validate maxLength', () => {
            const val = 'toolong';
            const result = (0, validations_1.text)(val, { ...options, maxLength: 5 });
            expect(result).toBe('validation:shorterThanMax');
        });
        it('should validate minLength', () => {
            const val = 'short';
            const result = (0, validations_1.text)(val, { ...options, minLength: 10 });
            expect(result).toBe('validation:longerThanMin');
        });
        it('should validate maxLength with no value', () => {
            const val = undefined;
            const result = (0, validations_1.text)(val, { ...options, maxLength: 5 });
            expect(result).toBe(true);
        });
        it('should validate minLength with no value', () => {
            const val = undefined;
            const result = (0, validations_1.text)(val, { ...options, minLength: 10 });
            expect(result).toBe(true);
        });
    });
    describe('textarea', () => {
        options = { ...options, field: { type: 'textarea', name: 'test' } };
        it('should validate', () => {
            const val = 'test';
            const result = (0, validations_1.textarea)(val, options);
            expect(result).toBe(true);
        });
        it('should show required message', () => {
            const val = undefined;
            const result = (0, validations_1.textarea)(val, { ...options, required: true });
            expect(result).toBe('validation:required');
        });
        it('should handle undefined', () => {
            const val = undefined;
            const result = (0, validations_1.textarea)(val, options);
            expect(result).toBe(true);
        });
        it('should validate maxLength', () => {
            const val = 'toolong';
            const result = (0, validations_1.textarea)(val, { ...options, maxLength: 5 });
            expect(result).toBe('validation:shorterThanMax');
        });
        it('should validate minLength', () => {
            const val = 'short';
            const result = (0, validations_1.textarea)(val, { ...options, minLength: 10 });
            expect(result).toBe('validation:longerThanMin');
        });
        it('should validate maxLength with no value', () => {
            const val = undefined;
            const result = (0, validations_1.textarea)(val, { ...options, maxLength: 5 });
            expect(result).toBe(true);
        });
        it('should validate minLength with no value', () => {
            const val = undefined;
            const result = (0, validations_1.textarea)(val, { ...options, minLength: 10 });
            expect(result).toBe(true);
        });
    });
    describe('password', () => {
        options.type = 'password';
        options.name = 'test';
        it('should validate', () => {
            const val = 'test';
            const result = (0, validations_1.password)(val, options);
            expect(result).toBe(true);
        });
        it('should show required message', () => {
            const val = undefined;
            const result = (0, validations_1.password)(val, { ...options, required: true });
            expect(result).toBe('validation:required');
        });
        it('should handle undefined', () => {
            const val = undefined;
            const result = (0, validations_1.password)(val, options);
            expect(result).toBe(true);
        });
        it('should validate maxLength', () => {
            const val = 'toolong';
            const result = (0, validations_1.password)(val, { ...options, maxLength: 5 });
            expect(result).toBe('validation:shorterThanMax');
        });
        it('should validate minLength', () => {
            const val = 'short';
            const result = (0, validations_1.password)(val, { ...options, minLength: 10 });
            expect(result).toBe('validation:longerThanMin');
        });
        it('should validate maxLength with no value', () => {
            const val = undefined;
            const result = (0, validations_1.password)(val, { ...options, maxLength: 5 });
            expect(result).toBe(true);
        });
        it('should validate minLength with no value', () => {
            const val = undefined;
            const result = (0, validations_1.password)(val, { ...options, minLength: 10 });
            expect(result).toBe(true);
        });
    });
    describe('point', () => {
        options.type = 'point';
        options.name = 'point';
        it('should validate numbers', () => {
            const val = ['0.1', '0.2'];
            const result = (0, validations_1.point)(val, options);
            expect(result).toBe(true);
        });
        it('should validate strings that could be numbers', () => {
            const val = ['0.1', '0.2'];
            const result = (0, validations_1.point)(val, options);
            expect(result).toBe(true);
        });
        it('should show required message when undefined', () => {
            const val = undefined;
            const result = (0, validations_1.point)(val, { ...options, required: true });
            expect(result).not.toBe(true);
        });
        it('should show required message when array', () => {
            const val = [];
            const result = (0, validations_1.point)(val, { ...options, required: true });
            expect(result).not.toBe(true);
        });
        it('should show required message when array of undefined', () => {
            const val = [undefined, undefined];
            const result = (0, validations_1.point)(val, { ...options, required: true });
            expect(result).not.toBe(true);
        });
        it('should handle undefined not required', () => {
            const val = undefined;
            const result = (0, validations_1.password)(val, options);
            expect(result).toBe(true);
        });
        it('should handle empty array not required', () => {
            const val = [];
            const result = (0, validations_1.point)(val, options);
            expect(result).toBe(true);
        });
        it('should handle array of undefined not required', () => {
            const val = [undefined, undefined];
            const result = (0, validations_1.point)(val, options);
            expect(result).toBe(true);
        });
        it('should prevent text input', () => {
            const val = ['bad', 'input'];
            const result = (0, validations_1.point)(val, options);
            expect(result).not.toBe(true);
        });
        it('should prevent missing value', () => {
            const val = [0.1];
            const result = (0, validations_1.point)(val, options);
            expect(result).not.toBe(true);
        });
    });
    describe('select', () => {
        options.type = 'select';
        options.options = ['one', 'two', 'three'];
        const optionsRequired = {
            ...options,
            required: true,
            options: [{
                    value: 'one',
                    label: 'One',
                }, {
                    value: 'two',
                    label: 'two',
                }, {
                    value: 'three',
                    label: 'three',
                }],
        };
        const optionsWithEmptyString = {
            ...options,
            options: [{
                    value: '',
                    label: 'None',
                }, {
                    value: 'option',
                    label: 'Option',
                }],
        };
        it('should allow valid input', () => {
            const val = 'one';
            const result = (0, validations_1.select)(val, options);
            expect(result).toStrictEqual(true);
        });
        it('should prevent invalid input', () => {
            const val = 'bad';
            const result = (0, validations_1.select)(val, options);
            expect(result).not.toStrictEqual(true);
        });
        it('should allow null input', () => {
            const val = null;
            const result = (0, validations_1.select)(val, options);
            expect(result).toStrictEqual(true);
        });
        it('should allow undefined input', () => {
            let val;
            const result = (0, validations_1.select)(val, options);
            expect(result).toStrictEqual(true);
        });
        it('should prevent empty string input', () => {
            const val = '';
            const result = (0, validations_1.select)(val, options);
            expect(result).not.toStrictEqual(true);
        });
        it('should prevent undefined input with required', () => {
            let val;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should prevent empty string input with required', () => {
            const result = (0, validations_1.select)('', optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should prevent undefined input with required and hasMany', () => {
            let val;
            options.hasMany = true;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should prevent empty array input with required and hasMany', () => {
            optionsRequired.hasMany = true;
            const result = (0, validations_1.select)([], optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should prevent empty string array input with required and hasMany', () => {
            options.hasMany = true;
            const result = (0, validations_1.select)([''], optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should prevent null input with required and hasMany', () => {
            const val = null;
            options.hasMany = true;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should allow valid input with option objects', () => {
            const val = 'one';
            options.hasMany = false;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).toStrictEqual(true);
        });
        it('should prevent invalid input with option objects', () => {
            const val = 'bad';
            options.hasMany = false;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
        it('should allow empty string input with option object', () => {
            const val = '';
            const result = (0, validations_1.select)(val, optionsWithEmptyString);
            expect(result).toStrictEqual(true);
        });
        it('should allow empty string input with option object and required', () => {
            const val = '';
            optionsWithEmptyString.required = true;
            const result = (0, validations_1.select)(val, optionsWithEmptyString);
            expect(result).toStrictEqual(true);
        });
        it('should allow valid input with hasMany', () => {
            const val = ['one', 'two'];
            const result = (0, validations_1.select)(val, options);
            expect(result).toStrictEqual(true);
        });
        it('should prevent invalid input with hasMany', () => {
            const val = ['one', 'bad'];
            const result = (0, validations_1.select)(val, options);
            expect(result).not.toStrictEqual(true);
        });
        it('should allow valid input with hasMany option objects', () => {
            const val = ['one', 'three'];
            optionsRequired.hasMany = true;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).toStrictEqual(true);
        });
        it('should prevent invalid input with hasMany option objects', () => {
            const val = ['three', 'bad'];
            optionsRequired.hasMany = true;
            const result = (0, validations_1.select)(val, optionsRequired);
            expect(result).not.toStrictEqual(true);
        });
    });
    describe('number', () => {
        options.type = 'number';
        options.name = 'test';
        it('should validate', () => {
            const val = 1;
            const result = (0, validations_1.number)(val, options);
            expect(result).toBe(true);
        });
        it('should validate 2', () => {
            const val = 1.5;
            const result = (0, validations_1.number)(val, options);
            expect(result).toBe(true);
        });
        it('should show invalid number message', () => {
            const val = 'test';
            const result = (0, validations_1.number)(val, { ...options });
            expect(result).toBe('validation:enterNumber');
        });
        it('should handle empty value', () => {
            const val = '';
            const result = (0, validations_1.number)(val, { ...options });
            expect(result).toBe(true);
        });
        it('should handle required value', () => {
            const val = '';
            const result = (0, validations_1.number)(val, { ...options, required: true });
            expect(result).toBe('validation:enterNumber');
        });
        it('should validate minValue', () => {
            const val = 2.4;
            const result = (0, validations_1.number)(val, { ...options, min: 2.5 });
            expect(result).toBe('validation:lessThanMin');
        });
        it('should validate maxValue', () => {
            const val = 1.25;
            const result = (0, validations_1.number)(val, { ...options, max: 1 });
            expect(result).toBe('validation:greaterThanMax');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbnMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWVsZHMvdmFsaWRhdGlvbnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFnRjtBQUdoRixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUV0QyxJQUFJLE9BQU8sR0FBbUM7SUFDNUMsU0FBUyxFQUFFLFFBQVE7SUFDbkIsSUFBSSxFQUFFLFNBQVM7SUFDZixXQUFXLEVBQUUsU0FBUztJQUN0QixDQUFDO0NBQ0YsQ0FBQztBQUVGLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFDcEIsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtZQUN6QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBQSxrQkFBSSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtZQUN0QyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxrQkFBSSxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7WUFDakMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUEsa0JBQUksRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUEsa0JBQUksRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1lBQ25DLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQztZQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFBLGtCQUFJLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtZQUNqRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxrQkFBSSxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBRyxFQUFFO1lBQ2pELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFBLGtCQUFJLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDeEIsT0FBTyxHQUFHLEVBQUUsR0FBRyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUNwRSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFRLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFRLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBUSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtZQUNuQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBUSxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUEsc0JBQVEsRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBRyxFQUFFO1lBQ2pELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFRLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFHLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUEsc0JBQVEsRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtRQUN4QixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUMxQixPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN0QixFQUFFLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1lBQ3pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFRLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFRLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBUSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtZQUNuQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBUSxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxHQUFHLEVBQUU7WUFDbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLElBQUEsc0JBQVEsRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMseUNBQXlDLEVBQUUsR0FBRyxFQUFFO1lBQ2pELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUN0QixNQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFRLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxHQUFHLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUEsc0JBQVEsRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtRQUNyQixPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUN2QixPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUN2QixFQUFFLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFHLEVBQUU7WUFDdkQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsRUFBRTtZQUNyRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtZQUNqRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDZixNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFLLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsc0RBQXNELEVBQUUsR0FBRyxFQUFFO1lBQzlELE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQUssRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7WUFDOUMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUEsc0JBQVEsRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxHQUFHLEVBQUU7WUFDaEQsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtZQUN2RCxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFBLG1CQUFLLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1lBQ25DLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUEsbUJBQUssRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDdEIsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDeEIsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUMsTUFBTSxlQUFlLEdBQUc7WUFDdEIsR0FBRyxPQUFPO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsS0FBSztvQkFDWixLQUFLLEVBQUUsS0FBSztpQkFDYixFQUFFO29CQUNELEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRSxLQUFLO2lCQUNiLEVBQUU7b0JBQ0QsS0FBSyxFQUFFLE9BQU87b0JBQ2QsS0FBSyxFQUFFLE9BQU87aUJBQ2YsQ0FBQztTQUNILENBQUM7UUFDRixNQUFNLHNCQUFzQixHQUFHO1lBQzdCLEdBQUcsT0FBTztZQUNWLE9BQU8sRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxFQUFFO29CQUNULEtBQUssRUFBRSxNQUFNO2lCQUNkLEVBQUU7b0JBQ0QsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7aUJBQ2hCLENBQUM7U0FDSCxDQUFDO1FBQ0YsRUFBRSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtZQUNsQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtZQUN0QyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUU7WUFDakMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUEsb0JBQU0sRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7WUFDdEMsSUFBSSxHQUFHLENBQUM7WUFDUixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO1lBQzNDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNmLE1BQU0sTUFBTSxHQUFHLElBQUEsb0JBQU0sRUFBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO1lBQ3RELElBQUksR0FBRyxDQUFDO1lBQ1IsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7WUFDekQsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywwREFBMEQsRUFBRSxHQUFHLEVBQUU7WUFDbEUsSUFBSSxHQUFHLENBQUM7WUFDUixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDREQUE0RCxFQUFFLEdBQUcsRUFBRTtZQUNwRSxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEdBQUcsRUFBRTtZQUMzRSxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxxREFBcUQsRUFBRSxHQUFHLEVBQUU7WUFDN0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUEsb0JBQU0sRUFBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO1lBQ3RELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNsQixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsa0RBQWtELEVBQUUsR0FBRyxFQUFFO1lBQzFELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztZQUNsQixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG9EQUFvRCxFQUFFLEdBQUcsRUFBRTtZQUM1RCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDZixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7WUFDekUsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2Ysc0JBQXNCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxHQUFHLEVBQUU7WUFDL0MsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtZQUNuRCxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHNEQUFzRCxFQUFFLEdBQUcsRUFBRTtZQUM5RCxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QixlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMERBQTBELEVBQUUsR0FBRyxFQUFFO1lBQ2xFLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdCLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUEsb0JBQU0sRUFBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7WUFDekIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtZQUMzQixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDaEIsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtZQUM1QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1lBQ25DLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNmLE1BQU0sTUFBTSxHQUFHLElBQUEsb0JBQU0sRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLEVBQUU7WUFDdEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQkFBTSxFQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7WUFDbEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUEsb0JBQU0sRUFBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQztZQUNqQixNQUFNLE1BQU0sR0FBRyxJQUFBLG9CQUFNLEVBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9