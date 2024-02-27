interface IError {
    status: number,
    data: {
        statusCode: number,
        message: string,
        error: string
    }
}