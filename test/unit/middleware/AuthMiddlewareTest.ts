import express from "express";
import { expect } from 'chai';
import sinon from 'sinon';
import { allowRoles } from '../../../src/middleware/AuthMiddleware';
import * as jwtDecode from 'jwt-decode';
import { JwtToken, UserRole } from "../../../src/models/JwtToken";

describe('allowRoles middleware', function () {
    afterEach(() => {
        sinon.restore();
    });

    it('should return 401 if no token is present', () => {
        const req = { session: {} } as express.Request;
        const res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy(),
            redirect: sinon.spy()
        } as unknown as express.Response;
        const next = sinon.spy();

        allowRoles([UserRole.Admin])(req, res, next);

        expect((res.status as sinon.SinonStub).calledOnceWith(401)).to.be.true;
        expect((res.redirect as sinon.SinonSpy).calledOnceWith('/loginForm')).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 403 if user role is not authorised', () => {
        const decodedToken: JwtToken = { Role: UserRole.User };
        const jwtDecodeStub = sinon.stub(jwtDecode as any, 'jwtDecode').returns(decodedToken); // eslint-disable-line  @typescript-eslint/no-explicit-any

        const req = { session: { token: 'mockToken' } } as unknown as express.Request; 
        const res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy()
        } as unknown as express.Response;
        const next = sinon.spy();

        allowRoles([UserRole.Admin])(req, res, next);

        expect((res.status as sinon.SinonStub).calledOnceWith(403)).to.be.true;
        expect((res.send as sinon.SinonStub).calledOnceWith('User role not authorised for action')).to.be.true;

        jwtDecodeStub.restore();
    });

    it('should call next if user role is authorised', () => {
        const decodedToken: JwtToken = { Role: UserRole.Admin };
        const jwtDecodeStub = sinon.stub(jwtDecode as any, 'jwtDecode').returns(decodedToken); // eslint-disable-line  @typescript-eslint/no-explicit-any

        const req = { session: { token: 'mockToken' } } as unknown as express.Request;
        const res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy()
        } as unknown as express.Response;
        const next = sinon.spy();

        allowRoles([UserRole.Admin])(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect((res.status as sinon.SinonStub).notCalled).to.be.true;
        expect((res.send as sinon.SinonStub).notCalled).to.be.true;

        jwtDecodeStub.restore();
    });
});
