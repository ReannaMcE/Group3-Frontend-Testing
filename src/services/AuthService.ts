import axios, { AxiosResponse } from "axios";
import { LoginRequest } from "../models/LoginRequest";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const response: AxiosResponse = await axios.post("http://localhost:8080/api/auth/login", loginRequest);
        console.log(response)

        return response.data;
    } catch (e) {
        throw new Error('Failed to Login');
        
    }
}