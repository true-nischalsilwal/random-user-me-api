import { TIMEOUT } from "dns";

export const API_CONFIG = {
    BASE_URL : process.env.NEXT_PUBLIC_API_URL,
    TIMEOUT: 10000
    
} as const; 



