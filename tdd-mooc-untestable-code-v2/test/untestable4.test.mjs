import { assert, expect } from "chai";
import argon2, { verify } from "@node-rs/argon2";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  const newPassword = 'newPassword';

  let service;
  let userDao;
  beforeEach(() => {
    service = new PasswordService();
    userDao = PostgresUserDao.getInstance();
  });

  // this should be afterEach, but for some reason it did not work.
  after(() => {
    PostgresUserDao.getInstance().close();
  });

  const verifyPassword = (hash, pw) => {
    return argon2.verifySync(hash, pw);
  }

  it("user can be added to the database", async () => {
    const user = { userId: 1, passwordHash: 'testPassword' };
    await userDao.save(user);
    const savedUser = await userDao.getById(1);
    expect(savedUser).to.not.be.null;

  });

  it("user's password can be changed", async () => {
    const user = { userId: 2, passwordHash: 'testPassword' };
    await userDao.save(user);
    const savedUser = await userDao.getById(2);
    expect(verifyPassword(savedUser.passwordHash, user.passwordHash)).to.be.true;

    await service.changePassword(user.userId, user.passwordHash, newPassword);
    const savedUserNew = await userDao.getById(2);
    expect(verifyPassword(savedUserNew.passwordHash, newPassword)).to.be.true;    
  });

  it("trying to change password with wrong old password throws exception", async () => {
  const user = { userId: 3, passwordHash: 'testPassword' };
   await userDao.save(user);
   try {
    await service.changePassword(user.userId, newPassword, newPassword);  } catch (error) {
    expect(error.message).to.equal("wrong old password");
  }
  });

  it("password cannot be changed for non-existing user", async () => {
    try {
      await service.changePassword(4, user.passwordHash, newPassword)
    } catch (error) {
      expect(error.message).to.equal("user is not defined");
    }
  });
});


