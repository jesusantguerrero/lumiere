exports.notifications = (supabase) => {
    const update = async (notificationId, notification) => {
        const { data, error } = await supabase.from('notifications').update(notification, { returning: 'minimal' }).eq('id', notificationId);
        if (error) throw error;
        return data;
    }

    const getAll = async (limit = 100, status = 'scheduled') => {
        const {data, error} = await supabase.from('notifications').select('*').eq('status', status).limit(limit);
        if (error) throw error;
        return data;
    }

    const add = async (notifications) => {
        const {data, error} = await supabase.from('notifications').insert(notifications);
        if (error) throw error;
        return data;
    } 

    return {
        add,
        update,
        getAll,
    };
}