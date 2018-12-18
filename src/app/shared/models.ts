export const URL = 'http://localhost:3000';

export class User {
  constructor() {}
  balance: number;
}

export class Stock {
  constructor() {}
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

export class SnackBar {
  constructor() {}
  msg: string;
  err: boolean;
}


