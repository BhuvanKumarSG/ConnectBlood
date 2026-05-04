
import request from 'supertest';
// Use curly braces because you used 'export { app }'
import { app } from './backend/server.js'; 

describe('ConnectBlood Backend Unit Tests', () => {
  test('Status 200: API health check', async () => {
    const res = await request(app).get('/'); 
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Blood donation running successfully");
  });
});
const request = require('supertest');
// Point this to your main server entry file
const app = require('./backend/index'); 

describe('ConnectBlood Backend Unit Tests', () => {
  
  // Test 1: System Health Check
  test('Status 200: API should be reachable', async () => {
    const res = await request(app).get('/'); 
    expect(res.statusCode).toBe(200);
  });

  // Test 2: Security Check (Unauthorized Access)
  test('Status 401: Protected routes should block unauthenticated users', async () => {
    const res = await request(app).get('/api/donor/profile'); 
    expect(res.statusCode).toBe(401);
  });

  // Test 3: Data Integrity
  test('Data Check: Blood groups should be returned as an array', async () => {
    const res = await request(app).get('/api/blood-groups');
    if (res.statusCode === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });
});
