export class ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
}