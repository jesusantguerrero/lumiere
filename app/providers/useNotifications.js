module.exports.useNotification = (provider) => {    
    return {
        add: provider.add,
        update: provider.update,
        delete: provider.delete,
        get: provider.get,
        getAll: provider.getAll,
    }
}
