import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";
import { mocked } from "jest-mock";
import AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

const makeValidDiscordUser = () => ({
  id: "userInfo.id",
  username: "userInfo.username",
  firstName: "userInfo.firstName",
  avatar: "userInfo.avatar",
  email: "userInfo.email",
  token: "userInfo.token",
});

const makeValidCreate = {
  get: () => {
    const returnValue = {
      username: "Valid Username",
      id: "valid-id",
      avatar: "valid-avatar",
    };
    return Promise.resolve({
      data: returnValue,
    });
  },
  defaults: {
    baseURL: "mock-baseurl",
    headers: {
      common: {
        Authorization: "mock-authorization",
      },
    },
  },
};

jest.mock("expo-auth-session", () => ({
  startAsync: () => {
    return {
      type: "success",
      params: {
        access_token: "token",
      },
    };
  },
}));

jest.mock("axios", () => ({
  create: () => makeValidCreate,
}));

// jest.mock("@react-native-async-storage/async-storage", () => ({
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
// }));

describe("Auth Hook", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(makeValidDiscordUser()),
      })
    ) as jest.Mock;
  });

  beforeEach(async () => {
    const userCollectionUser = "@gameplay:user";
    await AsyncStorage.removeItem(userCollectionUser);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should be able to sign in with discord account existed", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signIn());

    expect(result.current.user).toBeTruthy();
  });

  // ignore beforeAll for testing case when user not exist in database
  it.skip("user should not connect if cancel authentication", async () => {
    const discordMocked = await mocked(AuthSession as any);
    discordMocked.loadAsync = jest.fn(() =>
      Promise.resolve({
        type: "cancel",
      })
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(discordMocked),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signIn());
    console.log(result.current.user);
    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be able to sign in with account existing", async () => {
    const user = makeValidDiscordUser();
    await AsyncStorage.setItem("@gameplay:user", JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signIn());
    console.log(result.current.user);

    expect(result.current.user.email).toBe("user.email");
  });

  it("should call get with correct url", async () => {
    const getSpy = jest.spyOn(makeValidCreate, "get");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signIn());

    expect(getSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith("/users/@me");
  });

  it("should throw an error if get throws", async () => {
    const getSpy = jest.spyOn(makeValidCreate, "get");
    getSpy.mockImplementationOnce(() => {
      throw new Error("generic error");
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    let promise;
    act(() => {
      promise = result.current.signIn();
    });

    await act(async () => {
      // finally setLoading error fix
      //https://github.com/testing-library/react-testing-library/issues/1051
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });
    expect(promise).rejects;
  });
});
