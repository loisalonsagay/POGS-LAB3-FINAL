import request from 'supertest';
import app from '../../app'; // Adjust the path to your app file

describe('CRUD operations for pogs', () => {
    let createdPogId: number; // Store the ID of the created pog for update and delete tests
  
    it('should create a new pog', async () => {
      const newPog = { name: 'Test Pog', price: 10, color: 'red', ticker: 'TST', ownerId: 1 }; // Adjust the data according to your schema
      const response = await request(app).post('/pogs').send(newPog);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      createdPogId = response.body.id; 
    });
  
    it('should fetch all pogs', async () => {
      const response = await request(app).get('/pogs');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  
    it('should update an existing pog', async () => {
      const updatedPogData = { name: 'Updated Test Pog', price: 20, color: 'blue', ticker: 'TST', ownerId: 2 }; // Adjust the updated data
      const response = await request(app).put(`/pogs/${createdPogId}`).send(updatedPogData);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedPogData);
    });
});
