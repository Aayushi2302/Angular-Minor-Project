export interface SuccessResponseInterface<T> {
    data: Array<T>;
    message: string;
    success: boolean;
}