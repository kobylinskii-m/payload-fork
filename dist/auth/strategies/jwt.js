"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const getExtractJWT_1 = __importDefault(require("../getExtractJWT"));
const JwtStrategy = passport_jwt_1.default.Strategy;
exports.default = ({ secret, config, collections }) => {
    const opts = {
        passReqToCallback: true,
        jwtFromRequest: (0, getExtractJWT_1.default)(config),
        secretOrKey: secret,
    };
    return new JwtStrategy(opts, async (req, token, done) => {
        if (req.user) {
            done(null, req.user);
        }
        try {
            const collection = collections[token.collection];
            const parsedURL = url_1.default.parse(req.url);
            const isGraphQL = parsedURL.pathname === config.routes.graphQL;
            const user = await req.payload.findByID({
                id: token.id,
                collection: token.collection,
                req,
                depth: isGraphQL ? 0 : collection.config.auth.depth,
            });
            if (user && (!collection.config.auth.verify || user._verified)) {
                user.collection = collection.config.slug;
                user._strategy = 'local-jwt';
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            done(null, false);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvc3RyYXRlZ2llcy9qd3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIsZ0VBQTREO0FBRzVELHFFQUE2QztBQUU3QyxNQUFNLFdBQVcsR0FBRyxzQkFBVyxDQUFDLFFBQVEsQ0FBQztBQUV6QyxrQkFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQVcsRUFBb0IsRUFBRTtJQUM1RSxNQUFNLElBQUksR0FBb0I7UUFDNUIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixjQUFjLEVBQUUsSUFBQSx1QkFBYSxFQUFDLE1BQU0sQ0FBQztRQUNyQyxXQUFXLEVBQUUsTUFBTTtLQUNwQixDQUFDO0lBRUYsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdEQsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7UUFFRCxJQUFJO1lBQ0YsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRCxNQUFNLFNBQVMsR0FBRyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBRS9ELE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ3RDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDWixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLEdBQUc7Z0JBQ0gsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLO2FBQ3BELENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25CO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9