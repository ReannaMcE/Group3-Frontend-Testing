import sinon from "sinon";
import * as AuthService from "../../../src/services/AuthService";
import * as AuthController from "../../../src/controllers/AuthController";
import { expect } from "chai";

 
 
const mockToken = "mockedtoken";
 
 
describe('AuthController', function () {
    afterEach(() => {
        sinon.restore();
    });
 
    describe('getLoginForm', function () {
      it('should login successfully with genuine credentials', async () => {
        sinon.stub(AuthService, 'getToken').resolves(mockToken);
        const req = { body: {username: "user", password: "user" }, session: {token: ""}};
        const res = {redirect: sinon.spy(), render: sinon.spy()};
 
        await AuthController.postLoginForm(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any
 
        expect(mockToken == req.session.token).to.be.true;
        expect(res.redirect.calledOnce).to.be.true;
      });
 
      it('should render the login form', async () => {
        const res = {redirect: sinon.spy(), render: sinon.spy()};
        const req = { body: {username: "user", password: "user" }, session: {token: ""}};
 
        await AuthController.getLoginForm(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any
 
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('loginForm.html'));
        });
 
      it('should throw an error when login fails with incorrect credentiatls', async () => {
        const res = {redirect: sinon.spy(), render: sinon.spy(), locals: { errormessage: ''}};
        const req = { body: {username: "wronguser", password: "wrongpassword" }, session: {token: ""}};
        
        const errorMessage: string = 'Error message';
        sinon.stub(AuthService, 'getToken').rejects(new Error(errorMessage));
 
        
        await AuthController.postLoginForm(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any
 
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('loginForm.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
 
      });
    });
    describe('logout', function () {
      it('should respond with 200 and "Logged out successfully" when session destruction succeeds', async () => {
        const req = { session: { destroy: sinon.stub().callsFake((callback) => callback(null))}};
        const res = { status: sinon.stub().returnsThis(), send: sinon.stub(), redirect: sinon.stub()};

        await AuthController.logout(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

      expect(req.session.destroy.calledOnce).to.be.true;
      expect(res.redirect.calledOnceWith(200, '/loginForm')).to.be.true;
      });
    it('should respond with 500 and "Failed to log out" when session destruction fails', async () => {
      const req = { session: { destroy: sinon.stub().callsFake((callback) => callback(new Error('Failed')))}};
      const res = { status: sinon.stub().returnsThis(), send: sinon.stub()};

      await AuthController.logout(req as any, res as any); // eslint-disable-line  @typescript-eslint/no-explicit-any

      expect(req.session.destroy.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith('Failed to log out')).to.be.true;
  });
});
});