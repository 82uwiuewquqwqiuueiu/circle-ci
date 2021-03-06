
class ResponseLibrary {
    async ok(res, message, data) {
        return res.status(200).json({ status: 200, message: message, data: data });
    }
    async apiBadRequest(res, message, data) {
        return res.status(400).json({ status: 400, message: message, data: data });
    }
    async invalidParameters(res, message, data) {
        return res.status(406).json({ status: 406, message: message, data: data });
    }
    async existConflict(res, message, data) {
        return res.status(409).json({ status: 409, message: message, data: data });
    }
    async serverError(res, catchError = false, message = 'Internal server error.', data = {}) {
        if (catchError) {
            console.log('************************************************CATCH ERROR START************************************************');
            console.log(catchError);
            console.log('************************************************CATCH ERROR ENDS************************************************');
        }
        return res.status(500).json({ status: 500, message: message, data: data });
    }
    async recordCreated(res, message, data = {}) {
        return res.status(201).json({ status: 201, message: message, data: data });
    }
    async unauthorized(res, message, data = {}) {
        return res.status(401).json({ status: 401, message: message, data: data });
    }
    async notFound(res, message, data = {}) {
        return res.status(404).json({ status: 404, message: message, data: data });
    }

    async forBidden(res, message, data) {
        return res.status(403).json({ status: 403, message: message, data: data });
    }
}

let respObj = new ResponseLibrary();
export default respObj;