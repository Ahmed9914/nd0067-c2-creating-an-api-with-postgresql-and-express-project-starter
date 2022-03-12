import { User, UserStore } from '../../models/user';

const userStore = new UserStore();

describe("User CRUD operations tests", () => {
    it('Should insert a new user record into database', async () => {
        const user: User = {
            username: 'admin',
            firstName: 'ahmed',
            lastName: 'abdelaal',
            password: '123456'
        };
        const result = userStore.create(user);
        expect((await result).username).toBe('admin');
    });
});