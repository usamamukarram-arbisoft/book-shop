import { fetchBooks, loginRequest } from "./Api";
import axios from "axios";
import { Messages } from "./CommonMessages";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("loginRequest API", () => {
  const mockUsers = [
    { email: "test@example.com", password: "12345" },
    { email: "alice@example.com", password: "secret" },
  ];

  const mockBooks = [
    { id: 1, title: "The Great Book", author: "John Doe" },
    { id: 2, title: "Adventures of Code", author: "Jane Dev" },
  ];

  test("resolves matched user on valid credentials", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    const result = await loginRequest({
      email: "test@example.com",
      password: "12345",
    });

    expect(result).toEqual(mockUsers[0]);
    expect(mockedAxios.get).toHaveBeenCalledWith("src/Users.json");
  });

  test("rejects on invalid credentials", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    await expect(
      loginRequest({
        email: "wrong@example.com",
        password: "wrongpass",
      })
    ).rejects.toBe(Messages.SignIn.error.value);
  });
  test("fetch books", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBooks });

    const promise = fetchBooks();
    // jest.advanceTimersByTime(1000);

    const result = await promise;

    expect(result).toEqual(mockBooks);
    expect(mockedAxios.get).toHaveBeenCalledWith("src/BooksListing.json");
  });
});
