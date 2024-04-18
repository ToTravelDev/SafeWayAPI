import db from "./../database/connection.js";

class MotoristaModel
{
    getAll()
    {
        return db.query("select * from motorista");
    }
}

export default MotoristaModel;