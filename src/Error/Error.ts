"use static";

export class Error {
    public static serialize(message, code){
        return {"error": {"code": code, "message": message}}
    }
}