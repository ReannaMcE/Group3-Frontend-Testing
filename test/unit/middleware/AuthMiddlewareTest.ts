import express from "express";
import { allowRoles } from "../../../src/middleware/AuthMiddleware";
import { JwtToken, UserRole } from "../../../src/models/JwtToken";
import * from "../../../src/middleware/jwtDecodeWrapper";
import sinon from "sinon";
import { expect } from 'chai';


describe("allowRoles middleware", () => {
    let req: express.Request;
    let res: express.Response;
    let next: sinon.SinonStub;

    beforeEach(() => {
        req = {
            session: {}
        } as express.Request;

        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.stub()
        } as unknown as express.Response;

        next = sinon.stub() as sinon.SinonStub;
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should return 401 if no token is present", () => {
        const middleware = allowRoles([UserRole.Admin]);

        middleware(req, res, next as unknown as express.NextFunction);

        expect((res.status as sinon.SinonStub).calledWith(401)).to.be.true;
        expect((res.send as sinon.SinonStub).calledWith("Not logged in")).to.be.true;
    });

    it("should return 403 if user role is not authorised", () => {
        req.session.token = "fakeToken";
        const decodedToken: JwtToken = { Role: UserRole.User } as JwtToken;
        sinon.stub(jwtDecode, "default").returns(decodedToken); // Stub the default export

        const middleware = allowRoles([UserRole.Admin]);

        middleware(req, res, next as unknown as express.NextFunction);

        expect((res.status as sinon.SinonStub).calledWith(403)).to.be.true;
        expect((res.send as sinon.SinonStub).calledWith("User role not authorised for action")).to.be.true;
    });

    it("should call next if user role is authorised", () => {
        req.session.token = "fakeToken";
        const decodedToken: JwtToken = { Role: UserRole.Admin } as JwtToken;
        sinon.replace(jwtDecode, "default", sinon.fake.returns(decodedToken));

        const middleware = allowRoles([UserRole.Admin]);

        middleware(req, res, next as unknown as express.NextFunction);

        expect(next.calledOnce).to.be.true;
    });
});
