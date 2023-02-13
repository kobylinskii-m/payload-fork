"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTransportOptions = exports.hasTransport = void 0;
/**
 * type guard for EmailOptions
 * @param emailConfig
 */
function hasTransport(emailConfig) {
    return emailConfig.transport !== undefined;
}
exports.hasTransport = hasTransport;
/**
 * type guard for EmailOptions
 * @param emailConfig
 */
function hasTransportOptions(emailConfig) {
    return emailConfig.transportOptions !== undefined;
}
exports.hasTransportOptions = hasTransportOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQXFEQTs7O0dBR0c7QUFDSCxTQUFnQixZQUFZLENBQzFCLFdBQXlCO0lBRXpCLE9BQVEsV0FBOEIsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDO0FBQ2pFLENBQUM7QUFKRCxvQ0FJQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLG1CQUFtQixDQUNqQyxXQUF5QjtJQUV6QixPQUFRLFdBQXFDLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDO0FBQy9FLENBQUM7QUFKRCxrREFJQyJ9