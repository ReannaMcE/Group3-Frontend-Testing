import sinon from "sinon";
import * as AuthService from "../../../src/services/AuthService";
import * as AuthController from "../../../src/controllers/AuthController";

import { render } from "nunjucks";
import { expect } from "chai";



const mockToken = "mockedtoken";



describe('AuthController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getLoginForm', function () {
      it('should login successfully with genuine credentials', async () => {
        const stub = sinon.stub(AuthService, 'getToken').resolves(mockToken);
        const req = { body: {username: "user", password: "user" }, session: {token: ""}};
        const res = {redirect: sinon.spy(), render: sinon.spy()};

        await AuthController.postLoginForm(req as any, res as any);

        expect(mockToken == req.session.token).to.be.true;
        expect(res.redirect.calledOnce).to.be.true;

        stub.restore();
      });

      it('should render the login form', async () => {
        const res = {redirect: sinon.spy(), render: sinon.spy()};
        const req = { body: {username: "user", password: "user" }, session: {token: ""}};

        await AuthController.getLoginForm(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('loginForm.html'));
        });

      it('should throw an error when login fails with incorrect credentiatls', async () => { 
        const res = {redirect: sinon.spy(), render: sinon.spy(), locals: { errormessage: ''}};
        const req = { body: {username: "wronguser", password: "wrongpassword" }, session: {token: ""}};
        
        const errorMessage: string = 'Error message';
        sinon.stub(AuthService, 'getToken').rejects(new Error(errorMessage));

        
        await AuthController.getLoginForm(req as any, res as any);

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('loginForm.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);

      });
    });
});
