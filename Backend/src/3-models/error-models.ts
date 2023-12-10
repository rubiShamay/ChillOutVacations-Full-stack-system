import CodeStatus from "./status-codes"

abstract class BaseError {
    public constructor(public status: number, public message: string) { }
}

export class RouteNotFound extends BaseError {
    public constructor(route: string) {
        super(CodeStatus.NotFound, `Route ${route} not found.`)
    }
}

export class ResourceNotFound extends BaseError {
    public constructor(id: number) {
        super(CodeStatus.NotFound, `Id ${id} not found.`)
    }
}

export class Validation extends BaseError {
    public constructor(message: string) {
        super(CodeStatus.BadRequest, message)
    }

}

export class Unauthorized extends BaseError {
    public constructor(message: string) {
        super(CodeStatus.Unauthorized, message)
    }
}

export class Forbidden extends BaseError {
    public constructor(message: string) {
        super(CodeStatus.Forbidden, message)
    }
}