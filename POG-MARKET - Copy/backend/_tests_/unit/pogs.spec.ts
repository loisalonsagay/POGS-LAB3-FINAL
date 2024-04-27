import request from 'supertest';
import app from '../../app'; 


describe('GET /users', () => {
  it('should respond with an array of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});


describe('POST /users/buy-pogs', () => {
    it('should respond with success message when buying pogs', async () => {
      const pogsToBuy = {
        "pogsToBuy": [
          {
            "name": "Pog1",
            "quantity": 2
          },
          {
            "name": "Pog2",
            "quantity": 1
          }
        ]
      };
  
      const response = await request(app).post('/users/buy-pogs').send(pogsToBuy);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Pogs bought successfully' });
    });
  });


describe('GET /pogs', () => {
  it('should respond with an array of pogs', async () => {
    const response = await request(app).get('/pogs');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});


describe('GET /ticker', () => {
  it('should respond with an array of pog names and display as ticker maquee', async () => {
    const response = await request(app).get('/ticker');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
