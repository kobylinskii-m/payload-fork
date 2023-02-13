"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    equality: ['equals', 'not_equals'],
    partial: ['like', 'contains'],
    contains: ['in', 'not_in', 'all'],
    comparison: ['greater_than_equal', 'greater_than', 'less_than_equal', 'less_than'],
    geo: ['near'],
};
exports.default = operators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dyYXBocWwvc2NoZW1hL29wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7SUFDbEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztJQUM3QixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUNqQyxVQUFVLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxDQUFDO0lBQ2xGLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztDQUNkLENBQUM7QUFFRixrQkFBZSxTQUFTLENBQUMifQ==