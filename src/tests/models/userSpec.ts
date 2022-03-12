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

    describe('Authentication tests', () => {
        it('Should block logging on for wrong entered password',async () => {
            const result = await userStore.authenticate('admin', 'password');
            expect(result).toBeNull();
        })
    
        it('Should block logging on for non existing users',async () => {
            const result = await userStore.authenticate('adminstrator', '123456');
            expect(result).toBeNull();
        })
    
        it('Should allow logging on for right entered password',async () => {
            const result = await userStore.authenticate('admin', '123456');
            expect(result).toBeTruthy();
        })

    })

    
});