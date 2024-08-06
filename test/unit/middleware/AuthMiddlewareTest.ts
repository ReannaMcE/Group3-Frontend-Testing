import express from 'express';
import { expect } from 'chai';
import sinon from 'sinon';
import { allowRoles } from '../../../src/middleware/AuthMiddleware';
import { JwtToken, UserRole } from '../../../src/models/JwtToken';
import { jwtDecode } from 'jwt-decode';

describe('allowRoles Middleware', function () {
    let req, res, next;

    beforeEach(() => {
        req = { session: {} } as express.Request;
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy()
        } as unknown as express.Response;
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 401 when token is not present', () => {
        req.session.token = null;

        allowRoles([UserRole.Admin])(req, res, next);

        expect(res.status.calledOnceWith(401)).to.be.true;
        expect(res.send.calledOnceWith('Not logged in')).to.be.true;
        expect(next.notCalled).to.be.true;
    });

    it('should return 403 when user role is not authorized', () => {
        req.session.token = 'mockToken';
        const decodedToken: JwtToken = { Role: UserRole.User } as JwtToken;
        sinon.stub(jwtDecode, 'default').returns(decodedToken);

        allowRoles([UserRole.Admin])(req, res, next);

        expect(res.status.calledOnceWith(403)).to.be.true;
        expect(res.send.calledOnceWith('User role not authorised for action')).to.be.true;
        expect(next.notCalled).to.be.true;
    });

    it('should call next when user role is authorized', () => {
        req.session.token = 'mockToken';
        const decodedToken: JwtToken = { Role: UserRole.Admin } as JwtToken;
        sinon.stub(jwtDecode, 'default').returns(decodedToken);

        allowRoles([UserRole.Admin])(req, res, next);

        expect(res.status.notCalled).to.be.true;
        expect(res.send.notCalled).to.be.true;
        expect(next.calledOnce).to.be.true;
    });
});
