export interface ValidationErrorDetail {
    type: string;
    loc: (string | number)[];
    msg: string;
    input?: unknown;
    ctx?: Record<string, unknown>;
}

export interface ApiErrorResponse {
    success?: boolean;
    error?: string;
    message?: string;
    detail?: string;
    details?: ValidationErrorDetail[];
}
