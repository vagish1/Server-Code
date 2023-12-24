class SuccessResponse{
    constructor(code, message,details = {}){
        this.code= code;
        this.message = message;
        this.details = details
    }

    toJson(){
        return {
            status:"Success",
            code : this.code,
            message :this.message,
            data:this.details,
        }
    }
}

module.exports = {SuccessResponse}