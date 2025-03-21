import { AuthResponse } from "@supabase/supabase-js";
import $api from "../http";
import {AxiosResponse} from "axios";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/login", {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/registration", {email, password})
    }

    static async logout(): Promise<any> {
        return $api.post("/logout")
    }

}
