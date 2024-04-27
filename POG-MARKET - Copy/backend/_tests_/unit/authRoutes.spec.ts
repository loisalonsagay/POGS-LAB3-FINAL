// authRoutes.spec.ts
import request from 'supertest';
import express, { Express } from 'express';
import authRoutes from '../../routes/auth'; 

const app: Express = express();

app.use(express.json()); 
app.use('/auth', authRoutes);

describe('Authentication Routes', () => {
  it('should return 401 for missing credentials', async () => {
    await request(app)
      .post('/auth/login')
      .expect(401);
  });


  it('should return 401 for invalid credentials', async () => {
    await request(app)
      .post('/auth/login')
      .send({ username: 'invalidUser', password: 'invalidPassword' })
      .expect(401);
  });


  it('should successfully log in with valid credentials', async () => {
    await request(app)
      .post('/auth/login')
      .send({ username: 'validUser', password: 'password123' })
      .expect(200)
      .then((response) => {
        // Assuming your API returns user data in the response body
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('email');
      });
  });


  it('should register a new user successfully', async () => {
    const newUser = {
      username: 'uniqueUsername123', // Unique username
      email: 'newuser@example.com',
      password: 'newPassword'
    };
  
    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(201);
  
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toEqual(newUser.username);
    expect(response.body.email).toEqual(newUser.email);
  });

  
  it('should return 409 for existing user during registration', async () => {
    const existingUser = {
      username: 'validUser', // Using an existing username
      email: 'user@example.com',
      password: 'password123'
    };

    await request(app)
      .post('/auth/register')
      .send(existingUser)
      .expect(409);
  });
});
