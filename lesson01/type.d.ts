const enum Role {
    admin = 'admin',
    user = 'user',
}
type User = {
    userId: number;
    username: string;
    role: Role;
    password: string;
};
