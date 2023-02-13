"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
async function registerFirstUser(args) {
    const { collection: { Model, config: { slug, auth: { verify, }, }, }, req: { payload, }, req, data, } = args;
    const count = await Model.countDocuments({});
    if (count >= 1)
        throw new errors_1.Forbidden(req.t);
    // /////////////////////////////////////
    // Register first user
    // /////////////////////////////////////
    const result = await payload.create({
        req,
        collection: slug,
        data,
        overrideAccess: true,
    });
    // auto-verify (if applicable)
    if (verify) {
        await payload.update({
            id: result.id,
            collection: slug,
            data: {
                _verified: true,
            },
        });
    }
    // /////////////////////////////////////
    // Log in new user
    // /////////////////////////////////////
    const { token } = await payload.login({
        ...args,
        collection: slug,
    });
    const resultToReturn = {
        ...result,
        token,
    };
    return {
        message: 'Registered and logged in successfully. Welcome!',
        user: resultToReturn,
    };
}
exports.default = registerFirstUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJGaXJzdFVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9vcGVyYXRpb25zL3JlZ2lzdGVyRmlyc3RVc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseUNBQXlDO0FBbUJ6QyxLQUFLLFVBQVUsaUJBQWlCLENBQUMsSUFBZTtJQUM5QyxNQUFNLEVBQ0osVUFBVSxFQUFFLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFBRSxFQUNOLElBQUksRUFDSixJQUFJLEVBQUUsRUFDSixNQUFNLEdBQ1AsR0FDRixHQUNGLEVBQ0QsR0FBRyxFQUFFLEVBQ0gsT0FBTyxHQUNSLEVBQ0QsR0FBRyxFQUNILElBQUksR0FDTCxHQUFHLElBQUksQ0FBQztJQUVULE1BQU0sS0FBSyxHQUFHLE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUU3QyxJQUFJLEtBQUssSUFBSSxDQUFDO1FBQUUsTUFBTSxJQUFJLGtCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNDLHdDQUF3QztJQUN4QyxzQkFBc0I7SUFDdEIsd0NBQXdDO0lBRXhDLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBYTtRQUM5QyxHQUFHO1FBQ0gsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSTtRQUNKLGNBQWMsRUFBRSxJQUFJO0tBQ3JCLENBQUMsQ0FBQztJQUVILDhCQUE4QjtJQUM5QixJQUFJLE1BQU0sRUFBRTtRQUNWLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNuQixFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDYixVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUU7Z0JBQ0osU0FBUyxFQUFFLElBQUk7YUFDaEI7U0FDRixDQUFDLENBQUM7S0FDSjtJQUVELHdDQUF3QztJQUN4QyxrQkFBa0I7SUFDbEIsd0NBQXdDO0lBRXhDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDcEMsR0FBRyxJQUFJO1FBQ1AsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxjQUFjLEdBQUc7UUFDckIsR0FBRyxNQUFNO1FBQ1QsS0FBSztLQUNOLENBQUM7SUFFRixPQUFPO1FBQ0wsT0FBTyxFQUFFLGlEQUFpRDtRQUMxRCxJQUFJLEVBQUUsY0FBYztLQUNyQixDQUFDO0FBQ0osQ0FBQztBQUVELGtCQUFlLGlCQUFpQixDQUFDIn0=