import { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { requestInstance } from "../models";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const response: AxiosResponse = await requestInstance.post("http://localhost:8080/api/auth/login", loginRequest);
        
        return response.data;
    } catch (e) {
        throw new Error('Failed to Login');
        
    }
}