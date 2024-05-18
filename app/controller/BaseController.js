class BaseController {
    setParametros(id, params)
    {
        this.id = id || undefined;
        this.params = params
    }
}

module.exports = BaseController;