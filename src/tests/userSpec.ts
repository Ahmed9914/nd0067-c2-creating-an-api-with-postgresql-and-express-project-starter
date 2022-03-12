import { User, UserStore } from '../models/user';
import app from '../server';
import supertest from 'supertest';

const userStore = new UserStore();

const request = supertest(app);

describe("Users tests", () => {
    
    describe("User CRUD operations tests", () => {
        it('Should insert a new user record into database', async () => {
            const user: User = {
                firstName: 'ahmed',
                lastName: 'abdelaal',
                password: '123456'
            };
            const result = userStore.create(user);
            expect((await result).id).toBe(1);
        });
     
    });
    
    describe('Authentication tests', () => {
        it('Should block logging on for wrong entered password',async () => {
            const result = await userStore.authenticate(1, 'password');
            expect(result).toBeNull();
        })
    
        it('Should block logging on for non existing users',async () => {
            const result = await userStore.authenticate(2, '123456');
            expect(result).toBeNull();
        })
    
        it('Should allow logging on for right entered password',async () => {
            const result = await userStore.authenticate(1, '123456');
            expect(result).toBeTruthy();
        })
    
    })
    
    
    describe('Users endpoint requests tests', () => {
        it('should create a new user', async () => {
            const response = await request
            .post('/users/create')
            .send({
                firstName: 'Ahmed',
                lastName: 'Abdelaal',
                password: 'password'
            });
            expect(response.statusCode).toBe(201);
        });
    });

});
