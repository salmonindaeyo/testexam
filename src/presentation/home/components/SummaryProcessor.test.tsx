import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import { useSummaryProcessor } from "./SummaryProcessor";
import { User } from "@/data/domain/users.domain";

describe("useSummaryProcessor", () => {
  it("should return empty object when users is undefined", () => {
    const { result } = renderHook(() => useSummaryProcessor(undefined));
    expect(result.current).toEqual({});
  });

  it("should process users data correctly", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        age: 30,
        gender: "Male",
        company: { department: "IT" },
        address: { postalCode: "10100" },
        hair: { color: "Black" },
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        age: 25,
        gender: "Female",
        company: { department: "IT" },
        address: { postalCode: "10200" },
        hair: { color: "Brown" },
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        age: 40,
        gender: "Male",
        company: { department: "HR" },
        address: { postalCode: "10300" },
        hair: { color: "Black" },
      },
    ] as User[];

    const { result } = renderHook(() => useSummaryProcessor(mockUsers));

    expect(result.current).toEqual({
      IT: {
        male: 1,
        female: 1,
        ageRange: "25-30",
        hair: {
          Black: 1,
          Brown: 1,
        },
        addressUser: {
          JohnDoe: "10100",
          JaneSmith: "10200",
        },
      },
      HR: {
        male: 1,
        female: 0,
        ageRange: "40-40",
        hair: {
          Black: 1,
        },
        addressUser: {
          BobJohnson: "10300",
        },
      },
    });
  });

  it("should update age range correctly", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "User",
        lastName: "1",
        age: 30,
        gender: "Male",
        company: { department: "IT" },
        address: { postalCode: "10100" },
        hair: { color: "Black" },
      },
      {
        id: 2,
        firstName: "User",
        lastName: "2",
        age: 25,
        gender: "Male",
        company: { department: "IT" },
        address: { postalCode: "10200" },
        hair: { color: "Black" },
      },
      {
        id: 3,
        firstName: "User",
        lastName: "3",
        age: 40,
        gender: "Male",
        company: { department: "IT" },
        address: { postalCode: "10300" },
        hair: { color: "Black" },
      },
    ] as User[];

    const { result } = renderHook(() => useSummaryProcessor(mockUsers));

    expect(result.current["IT"].ageRange).toBe("25-40");
  });

  it("should count gender correctly", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "User1",
        lastName: "",
        age: 30,
        gender: "Male",
        company: { department: "Finance" },
        address: { postalCode: "10100" },
        hair: { color: "Black" },
      },
      {
        id: 2,
        firstName: "User2",
        lastName: "",
        age: 25,
        gender: "Female",
        company: { department: "Finance" },
        address: { postalCode: "10200" },
        hair: { color: "Black" },
      },
      {
        id: 3,
        firstName: "User3",
        lastName: "",
        age: 40,
        gender: "Female",
        company: { department: "Finance" },
        address: { postalCode: "10300" },
        hair: { color: "Black" },
      },
    ] as User[];

    const { result } = renderHook(() => useSummaryProcessor(mockUsers));

    expect(result.current["Finance"].male).toBe(1);
    expect(result.current["Finance"].female).toBe(2);
  });

  it("should count hair colors correctly", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "User1",
        lastName: "",
        age: 30,
        gender: "Male",
        company: { department: "Marketing" },
        address: { postalCode: "10100" },
        hair: { color: "Black" },
      },
      {
        id: 2,
        firstName: "User2",
        lastName: "",
        age: 25,
        gender: "Male",
        company: { department: "Marketing" },
        address: { postalCode: "10200" },
        hair: { color: "Brown" },
      },
      {
        id: 3,
        firstName: "User3",
        lastName: "",
        age: 40,
        gender: "Male",
        company: { department: "Marketing" },
        address: { postalCode: "10300" },
        hair: { color: "Black" },
      },
    ] as User[];

    const { result } = renderHook(() => useSummaryProcessor(mockUsers));

    expect(result.current["Marketing"].hair).toEqual({
      Black: 2,
      Brown: 1,
    });
  });

  it("should fail intentionally for demonstration", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "Test",
        lastName: "User",
        age: 30,
        gender: "Male",
        company: { department: "Testing" },
        address: { postalCode: "10100" },
        hair: { color: "Black" },
      },
    ] as User[];

    const { result } = renderHook(() => useSummaryProcessor(mockUsers));

    expect(result.current).toEqual({
      WrongDepartment: {
        male: 999,
        female: 0,
        ageRange: "1-100",
        hair: {
          Red: 1,
        },
        addressUser: {
          WrongName: "99999",
        },
      },
    });
  });

  it("should verify incorrect age range", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "User",
        lastName: "1",
        age: 30,
        gender: "Male",
        company: { department: "IT" },
        address: { postalCode: "10100" },
        hair: { color: "Black" },
      },
    ] as User[];

    const { result } = renderHook(() => useSummaryProcessor(mockUsers));

    expect(result.current["IT"].ageRange).toBe("20-40");
  });
});
