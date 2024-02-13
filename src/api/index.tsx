const baseUrl = "http://localhost:3000"; //import.meta.env.VITE_BASE_URL;
const token: string = localStorage.getItem("token")!; //non-null assertion

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

interface IOrders {
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  amount: number;
}

interface IRecentTopup {
  id: number;
  date: string;
  name: string;
  paymentMethod: string;
  amount: number;
}

interface Params {
  baseUrl: string;
  headers: any;
  method: string;
}

const postConfig: Params = {
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    // Cookie: cookie_token,
  },
  method: "post",
};

const postUploadConfig: Params = {
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
    // Cookie: cookie_token,
  },
  method: "post",
};

const getConfig: Params = {
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    // Cookie: cookie_token,
  },
  method: "get",
};

const patchConfig: Params = {
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    // Cookie: cookie_token,
  },
  method: "patch",
};

const putConfig: Params = {
  baseUrl: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    // Cookie: cookie_token,
  },
  method: "put",
};

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

export const getOrders = async (limit: number): Promise<any> => {
  const res: IOrders[] = await fetch(`${baseUrl}/orders?_limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
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
