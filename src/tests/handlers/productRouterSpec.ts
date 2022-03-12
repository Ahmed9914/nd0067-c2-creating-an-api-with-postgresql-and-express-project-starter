import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Api requests tests', () => {
    it('request to index returns empty list before creating any products', async () => {
        const response = await request.get('/products');
        expect(response.text).toBe('[]');
    });
});
