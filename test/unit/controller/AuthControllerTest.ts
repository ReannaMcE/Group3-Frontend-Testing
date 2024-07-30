// import express from 'express';
// import { getToken } from "../../../src/services/AuthService";
// import { getLoginForm, postLoginForm } from '../../../src/controllers/AuthController';
// import { expect } from 'chai';

// jest.mock('../services/AuthService');

// // Create a mock response object
// const mockResponse = (): express.Response => {
//     const res: any = {};
//     res.render = jest.fn().mockReturnValue(res);
//     res.redirect = jest.fn().mockReturnValue(res);
//     res.locals = {};
//     return res;
// };

// // Create a mock request object
// const mockRequest = (body: any = {}, session: any = {}): express.Request => {
//     return {
//         body,
//         session,
//     } as express.Request;
// };

// describe('AuthController', () => {
//     describe('getLoginForm', () => {
//         it('should render the login form', async () => {
//             // Arrange
//             const req = mockRequest();
//             const res = mockResponse();

//             // Act
//             await getLoginForm(req, res);

//             // Assert
//             expect(res.render).toHaveBeenCalledWith('loginForm.html');
//         });
//     });

//     describe('postLoginForm', () => {
//         it('should set session token and redirect on successful login', async () => {
//             // Arrange
//             const reqBody = { username: 'testuser', password: 'password123' };
//             const req = mockRequest(reqBody, {});
//             const res = mockResponse();
//             const mockToken = 'mocked-token';
//             (getToken as jest.Mock).mockResolvedValue(mockToken);

//             // Act
//             await postLoginForm(req, res);

//             // Assert
//             expect(getToken).toHaveBeenCalledWith(reqBody);
//             expect(req.session.token).toBe(mockToken);
//             expect(res.redirect).toHaveBeenCalledWith('/jobRoles');
//         });

//         it('should render login form with error message on failed login', async () => {
//             // Arrange
//             const reqBody = { username: 'testuser', password: 'wrongpassword' };
//             const req = mockRequest(reqBody, {});
//             const res = mockResponse();
//             const mockErrorMessage = 'Invalid credentials';
//             (getToken as jest.Mock).mockRejectedValue(new Error(mockErrorMessage));

//             // Act
//             await postLoginForm(req, res);

//             // Assert
//             expect(getToken).toHaveBeenCalledWith(reqBody);
//             expect(res.locals.errormessage).toBe(mockErrorMessage);
//             expect(res.render).toHaveBeenCalledWith('loginForm.html', reqBody);
//         });
//     });
// });
