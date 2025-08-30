import { toast } from "sonner"

type APIResponse = {
    code: number
    success: boolean
    data: any
    msg: string
}

// 封装GET请求
export const getAPIRequest = async (url: string, header:any={}): Promise<APIResponse> => {
    try {
        const response = await fetch(url,{
            method: "GET",
            headers:header
        });
        const data: APIResponse = await response.json();
        return data;
    } catch (error) {
        let response: APIResponse = {
            success: false,
            code: 500,
            data: null,
            msg: `服务器异常: ${error}`
        }
        return response
    }
}

// 封装POST请求--json
export const postByJSON = async (
    url: string, body: any = null, header: any = {}
): Promise<APIResponse> => {
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify(body)
        });
        const data: APIResponse = await response.json();
        return data;
    } catch (error) {
        let response: APIResponse = {
            success: false,
            code: 500,
            data: null,
            msg: `服务器异常: ${error}`
        }
        toast.error("服务器异常")
        return response
    }
}


// 封装POST请求--formData
export const postByFormData = async (
    url: string, body: any = null, header: any = {}
): Promise<APIResponse> => {
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: header,
            body: body
        });
        const data: APIResponse = await response.json();
        return data;
    } catch (error) {
        let response: APIResponse = {
            success: false,
            code: 500,
            data: null,
            msg: `服务器异常: ${error}`
        }
        return response
    }
}