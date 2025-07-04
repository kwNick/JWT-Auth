import Role from "./roleModel";
import Shop from "./shopModel";

export default interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    shops: Shop[];
    roles: Role[];
    _links: {
        self: { href: string; };
        roles: { href: string; };
        shops: { href: string; };
        user: { href: string; };
    };
}