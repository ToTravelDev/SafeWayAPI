class BaseController {
    setParametros(id, params)
    {
        this.usu_id = id || undefined;
        this.params = params
    }
}

module.exports = BaseController;