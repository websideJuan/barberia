import DB from './local.js'

export class Auth {
  constructor() {
    this.authenticated = false;
    this.newUserActivated = {};
  }

  async isAuthenticated() {
    const response = await DB.get('auth');

    if (response === null) return false;
    return await response;
  }

  async register (user) {
    try {
      const response = await DB.get('users') || [];
      const userFounded = response.find(user => user.userName === user.userName)
   
      if (userFounded) {
        throw new Error('User already exists');
      }
      

      response.push(user);
      DB.save('users', JSON.stringify(response));
    }
    catch (error) {
      console.error(error);
    }
  }

  async login(user) {
    try {
      const response = await DB.get('users');
      const eventos = await DB.get('eventos');
      const clientes = await DB.get('clientes');
      
      const userFounded = response.find(user => user.userName === user.userName)
   
      if (!userFounded) {
        throw new Error('User not found');
      }


      if (userFounded.password !== user.password) {
        return false;
      }


      this.authenticated = true;
      this.stateAutenticated(this.authenticated);
      
      const unityCandE = clientes.map(cliente => ({
        ...cliente,
          eventos: eventos.filter(evento => evento.clienteID === cliente.id)
        }))

      this.newUserActivated = {
        userNamr: userFounded.username,
        email: userFounded.email,
        role: userFounded.role,
        clientes: unityCandE,
        statePay: 'pendiente'
      }
      
      this.userActive(this.newUserActivated);
      return true;
    }
    catch (error) {
      console.error(error);
    }
  }

  async getUserActive() {
    return await DB.get('userActive');
  }

  userActive(user) {
    return  DB.save('userActive', JSON.stringify(user));
  }

  logout() {
    this.authenticated = false;
    this.stateAutenticated(this.authenticated);
    DB.remove('userActive');
  }

  stateAutenticated(authenticated) {
    if (authenticated) {
      return DB.save('auth', 'true');
    } else {
      return DB.save('auth', 'false');
    }
  }

  navegate() {

    const routeActual = window.location.href.split('/').pop();
    if (this.authenticated) {
      return window.location.href = '/src/vista/admin/';
    }
  }


}