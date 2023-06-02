import { useCallback, useState } from "react";
import {getAuthToken} from "@/utils/auth";

interface RequestConfig {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: Object;
}


const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = useCallback(
        async (
            requestConfig: RequestConfig,
            applyData: ((data: any, responseCode: number) => void) | null = null,
            includeBearerToken: boolean = false
        ) => {
            setIsLoading(true);
            setError(null);
            try {
                const headers: Record<string, string> = {};

                if (includeBearerToken) {
                    const authToken = getAuthToken(); // Replace with your function to get the authentication token
                    headers["Authorization"] = `Bearer ${authToken}`;
                }

                if (!requestConfig.headers || !requestConfig.headers["Content-Type"]) {
                    headers["Content-Type"] = "application/json";
                }

                const response = await fetch(requestConfig.url, {
                    method: requestConfig.method ?? "GET",
                    headers: requestConfig.headers ?? headers,
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                });

                let data: any;
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    data = await response.json();
                } else if (contentType && contentType.includes("text/html")) {
                    data = await response.text();
                } else {
                    setError("Unsupported content type");
                }

                if (data.error) {
                    setError(data.error.message);
                }

                if (applyData !== null) {
                    applyData(data, response.status);
                }
            } catch (err: any) {
                setError(err.message || "Something went wrong!");
            }
            setIsLoading(false);
        },
        []
    );

    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;
