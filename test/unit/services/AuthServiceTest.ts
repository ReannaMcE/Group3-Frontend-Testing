import MockAdapter from 'axios-mock-adapter';
import { getToken } from "../../../src/services/AuthService";
import { LoginRequest } from '../../../src/models/LoginRequest';
import { expect } from 'chai';
import { requestInstance } from '../../../src/models';

const loginRequest: LoginRequest = { 
    username: "testuser", 
    password: "password123" 
};

const mock = new MockAdapter(requestInstance);

describe('getToken', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should return a token when login is successful', async () => {
        const mockToken = "mockedtoken";
        mock.onPost("http://localhost:8080/api/auth/login", loginRequest).reply(200, mockToken);

        const token = await getToken(loginRequest);

        expect(token == mockToken).to.be.true;
    });

    it('should throw an error when login fails', async () => {
    
        const loginRequest: LoginRequest = { username: 'testuser', password: 'wrongpassword' };
        const mockErrorMessage = 'Invalid credentials';
        mock.onPost('http://localhost:8080/api/auth/login', loginRequest).reply(401, mockErrorMessage);

        try {
            await getToken(loginRequest);
            throw new Error('Error not thrown');
          } catch (e) {
            expect(e.message).to.equal('Failed to Login');
            return;
    }});
});
