import { API_BASE_URL } from "@/config/api";

const APP_ENVIRONMENT = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || API_BASE_URL || ""
}

export default APP_ENVIRONMENT;