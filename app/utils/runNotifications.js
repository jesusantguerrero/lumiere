const { Provider } = require("../providers/index");
const { useMail } = require("./useMail");
const { defaultConfig } = require("../config");
const { notification: notificationProvider, email: emailProvider } = Provider()

exports.runNotifications = () => {
    notificationProvider.getAll(defaultConfig.maxNotificationsPerRun).then(notifications => {
        notifications.forEach( notification => workers[notification.channel](notification));
    }).catch(error => {
        console.log(error)
    });
}

const workers = {
    email: emailWorker,
    database: databaseWorker
}

//  send emails
async function emailWorker (notification) {
    emailProvider.send(notification.handlers.map(handler => handler.email).join(','), notification.subject, notification.message);
    notificationProvider.update(notification.id, { status: "sent" });
}

async function databaseWorker (notification) {
    await notificationProvider.add(notification.user_handlers.map( handler => ({
        due_time: notification.due_time,
        created_at: new Date(),
        channel: notification.via,
        user_uid: handler.id,
        handlers: [handler.id],
        user_handlers: [handler],
        subject: notification.subject,
        message: notification.message,
        data: notification.data,
        status: 'sent',
        type: 'user',
        read_at: null,
    }))).catch(error => {
        console.log(error);
    })

    notificationProvider.update(notification.id, { status: "sent" });
}

// maybe a slack, zen, telegram or another channel 
