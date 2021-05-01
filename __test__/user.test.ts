import mongoose from 'mongoose';
import request from 'supertest';
import User, { UserDocument } from '../src/services/user/model';
import app from '../src/app';
import { createRoles } from '../src/config/bootstrap';

type UserParams = {
  email: string;
  name?: string;
  lastname?: string;
  password?: string;
  roles?: string[];
};

const genFakeUser = ({
  name,
  lastname,
  email,
  password,
  roles,
}: UserParams): UserParams => ({
  email,
  name: name ?? 'Dave',
  lastname: lastname ?? 'Arenas',
  password: password ?? 'admin134',
  roles: roles ?? ['608d6f531ecb231af486e135'],
});

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/parkingTest', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  await createRoles();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('GET /v1/users', () => {
  test('It should respond returning all users created', async () => {
    const user = await User.create(genFakeUser({ email: 'davejs1@gmail.com' }));

    const { body, status } = await request(app).get('/v1/users');

    // Check type and length
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();

    // Check data
    expect(body[0].roles[0]).toBe('608d6f531ecb231af486e135');
    expect(body[0].name).toBe(user.name);
    expect(body[0].lastname).toBe(user.lastname);
    expect(body[0].email).toBe(user.email);
    expect(body[0].password).toBe(user.password);
  });
});

describe('GET /v1/users/:id', () => {
  test('It should respond with user filtred by id', async () => {
    const user = await User.create(genFakeUser({ email: 'davejs2@gmail.com' }));

    const { body, status } = await request(app).get(`/v1/users/${user._id}`);

    // Check type and length
    expect(status).toBe(200);

    // Check data
    expect(body.roles[0]).toBe('608d6f531ecb231af486e135');
    expect(body.name).toBe(user.name);
    expect(body.lastname).toBe(user.lastname);
    expect(body.email).toBe(user.email);
    expect(body.password).toBe(user.password);
  });
});

describe('POST /v1/users/', () => {
  test('It should respond with user already exists', async () => {
    const data = genFakeUser({ email: 'davejs2@gmail.com' });

    const { status, body } = await request(app).post(`/v1/users/`).send(data);

    console.log({ body });

    expect(status).toBe(400);
    expect(body).toEqual({
      message: 'User davejs2@gmail.com already exists',
    });
  });

  test('It should respond with the new user created', async () => {
    const data = genFakeUser({ email: 'davejs3@gmail.com' });

    const { status, body } = await request(app).post(`/v1/users/`).send(data);

    // Check the response
    expect(status).toBe(201);
    expect(body).toBe('New user added');

    // Check data in the database
    const user = (await User.findOne({ email: data.email })) as UserDocument;
    expect(user).toBeTruthy();
    expect(user.name).toBe(data.name);
    expect(user.lastname).toBe(data.lastname);
    expect(user.email).toBe(data.email);
    expect(user.password).toBe(data.password);
    expect(Array.isArray(user.roles)).toBeTruthy();
    expect(user.roles).toHaveLength(1);
  });
});

describe('PUT /v1/users/:id', () => {
  test('It should return with error "User with id: $id does not exists" ', async () => {
    // const user = await User.create(genFakeUser({ email: 'davejs@gmail.com' }));
    const data = genFakeUser({
      email: 'davejs@gmail.com',
      name: 'David',
      lastname: 'Serrano',
      password: 'admin987',
    });

    const fakeID = '608d9bf66a9aa53b65e83a32';

    const { status, body } = await request(app)
      .put(`/v1/users/${fakeID}`)
      .send(data);

    expect(status).toBe(404);
    expect(body.message).toBe("User with id: 608d9bf66a9aa53b65e83a32 doesn't exists");
  });

  test('It should update user and return update message', async () => {
    const user = await User.create(genFakeUser({ email: 'davejs4@gmail.com' }));
    const data = genFakeUser({
      email: 'davejs4@gmail.com',
      name: 'David',
      lastname: 'Serrano',
      password: 'admin987',
    });

    const { status, body } = await request(app)
      .put(`/v1/users/${user._id}`)
      .send(data);

    // Check the response
    expect(status).toBe(200);
    expect(body).toBe('Update');

    // Check data in the database
    const newUser = (await User.findOne({ email: data.email })) as UserDocument;
    expect(newUser).toBeTruthy();
    expect(newUser.name).toBe(data.name);
    expect(newUser.lastname).toBe(data.lastname);
    expect(newUser.email).toBe(data.email);
    expect(newUser.password).toBe(data.password);
    expect(Array.isArray(newUser.roles)).toBeTruthy();
    expect(newUser.roles).toHaveLength(1);
  });
});

describe('DELETE /v1/users/:id', () => {
  test('It should respond with error not found', async () => {
    const fakeID = '608d9bf66a9aa53b65e83a32'
    const { status, body } = await request(app).delete(`/v1/users/${fakeID}`);

    expect(status).toBe(404);
    expect(body.message).toBe(`User with id "${fakeID}" not found`)
  });

  test('It should delete the user', async () => {
    const user = await User.create(genFakeUser({ email: 'davejs7@gmail.com' }));
  
    const { status } = await request(app).delete(`/v1/users/${user._id}`);
  
    // check the response
    expect(status).toBe(200);
  
    // Check data in database
    const deletedUser = await User.findOne({ _id: user._id });
    expect(deletedUser).toBeFalsy();
  });
});
