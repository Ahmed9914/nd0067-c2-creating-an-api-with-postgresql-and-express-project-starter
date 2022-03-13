import { User, UserStore } from '../models/user';
import app from '../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const userStore = new UserStore();

const request = supertest(app);

let authToken: unknown;
let adminResponse: User;
let testedUserId: number | undefined;

describe("Users tests", () => {

    describe("User CRUD operations tests", () => {
        it('Should insert a new user record into database', async () => {
            const admin: User = {
                firstname: 'ahmed',
                lastname: 'abdelaal',
                password: '123456'
            };
            adminResponse = await userStore.create(admin);

            testedUserId = adminResponse.id as number;
            
            expect(adminResponse.firstname).toBe('ahmed');
        });
     
    });
    
    describe('Authentication tests', () => {
        it('Should block logging on for wrong entered password',async () => {
            const result = await userStore.authenticate(testedUserId as number, 'password');
            expect(result).toBeNull();
        })
    
        it('Should allow logging on for right entered password',async () => {
            const result = await userStore.authenticate(testedUserId as number, '123456');
            expect(result).toBeTruthy();
        })
    
    })
    
    describe('Users endpoint requests tests', () => {
        
        it('should not create a new user without a token', async () => {
            const response = await request
            .post('/users/create')
            .send({
                firstname: 'Ahmed',
                lastname: 'Abdelaal1',
                password: 'password',
            });
            expect(response.statusCode).toBe(401);
        });

        it('should create a new user when a token submitted', async () => {
            jwt.sign({ user: adminResponse}, process.env.TOKEN_SECRET as string, async (err: unknown, genToken: unknown) => {
                authToken = await genToken;
                const response = await request
                .post('/users/create')
                .send({
                    firstname: 'Ahmed',
                    lastname: 'Abdelaal2',
                    password: 'password',
                    token: authToken
                });
                expect(response.statusCode).toBe(201);
            });
        });

        it('Should login using correct id and password', async () => {
            const response = await request
                .post('/users/1')
                .send({password: '123456'});
            expect(response.statusCode).toBe(200);

        })
    });

});
