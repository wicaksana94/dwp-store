const baseUrl = "http://localhost:3000"; //import.meta.env.VITE_BASE_URL;

interface IUser {
  id?: string;
  email: string;
  password: string;
  token?: string;
}

interface IResponse {
  code: number;
  message: string;
  data?: any;
}

interface ISalesChart {
  time: string;
  amount?: number;
}

interface ICustomers {
  id?: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
}

interface ITransactionData {
  id?: string;
  date: string;
  name: string;
  paymentMethod: string;
  sale?: number;
  amount: number;
  orderedBy: string;
}

interface IRecentTopup {
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  amount: number;
}

export const createResponse = async (
  code: number,
  message: string,
  data: any
): Promise<any> => {
  const response: IResponse = {
    code,
    message,
    data,
  };
  return response;
};

export const checkExistingUser = async (data: IUser): Promise<any> => {
  const res: IUser[] = await fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

  // Check existing user process
  if (res.find((element: IUser) => element.email === data.email)) {
    return { ...res[0] };
  } else {
    return null;
  }
};

export const loginAPI = async (data: IUser): Promise<any> => {
  const user: IUser = await checkExistingUser(data);
  user.token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  // Simulate login process
  if (user) {
    return createResponse(200, "Login success.", user);
  } else {
    return createResponse(404, "Account not found.", []);
  }
};

export const registerApi = async (data: IUser): Promise<any> => {
  const users: IUser[] = await checkExistingUser(data);

  // Simulate register process
  if (users === null) {
    return await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (data) => {
      const registeredUser = await data.json();
      return createResponse(201, "Register success.", registeredUser);
    });
  } else {
    return createResponse(409, "Account already registered.", []);
  }
};

export const getTodaySalesChart = async (limit: number): Promise<any> => {
  const res: ISalesChart[] = await fetch(
    `${baseUrl}/sales-chart?_limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
  return res;
};

export const getTransactions = async (limit?: number): Promise<any> => {
  const res: ITransactionData[] = await fetch(
    `${baseUrl}/orders?_limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
  return res;
};

export const getRecentTopup = async (): Promise<any> => {
  const res: IRecentTopup[] = await fetch(`${baseUrl}/recent-topup?_limit=1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  return res;
};

export const getCustomers = async (): Promise<any> => {
  const res: ICustomers[] = await fetch(`${baseUrl}/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  return res.reverse();
};

export const postNewCustomer = async (data: ICustomers): Promise<any> => {
  console.log("param data = ", data);

  const customerData = await getCustomers();

  // Get the latest 'id'
  const latestId: number = Number(customerData[0].id);
  data.id = latestId + 1;

  if (data !== null) {
    return await fetch(`${baseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async () => {
      return createResponse(201, "Create new customer success.", []);
    });
  } else {
    return createResponse(500, "Internal error.", []);
  }
};
