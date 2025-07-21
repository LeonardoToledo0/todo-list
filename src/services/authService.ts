import { LoginInput, RegisterInput } from "@/shared/types/User";
import { apiClient } from "./apiClient";

export const register = async (data: RegisterInput) => {
    const response = await apiClient.post("/auth/user", data);
    return response.data;
};
export const login = async (data: LoginInput) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;

}