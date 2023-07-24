import { expect, test } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

const BASE_URL = 'https://bookstore.demoqa.com/Account/v1';
const API_KEY = '1c3c8d38-c7d5-4aa4-b357-121fb9474799';

describe('POST /Account/v1/User - Создание пользователя', () => {
  it('с ошибкой, логин уже используется', async () => {
    const newUser = {
      username: 'existingUser', // Здесь указываем существующий логин
      password: 'password123',
    };

    const response = await fetch(`${BASE_URL}/User`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}` },
      
    });

    expect(response.status).toBe(400);
  });

  it('с ошибкой, пароль не подходит', async () => {
    const newUser = {
      username: 'newUser123',
      password: 'short', // Здесь указываем невалидный пароль
    };

    const response = await fetch(`${BASE_URL}/User`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}` },
    });

    expect(response.status).toBe(400);
  });

  it('успешно', async () => {
    const newUser = {
      username: 'newUser665',
      password: '!kingAndJester357!',
    };

    const response = await fetch(`${BASE_URL}/User`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}` },
    });

    expect(response.status).toBe(200);
  });
});

describe('POST /Account/v1/GenerateToken - Генерация токена', () => {
  it('с ошибкой', async () => {
    const credentials = {
      username: 'invalidUser',
      password: 'invalidPassword',
    };

    const response = await fetch(`${BASE_URL}/GenerateToken`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}` },
    });

    expect(response.status).toBe(400);
  });

  it('успешно', async () => {
    const credentials = {
      username: 'validUser',
      password: 'validPassword',
    };

    const response = await fetch(`${BASE_URL}/GenerateToken`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`},
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
  });
});
