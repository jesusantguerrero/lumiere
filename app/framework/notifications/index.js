import { Provider } from "../../providers";

class Notification {
    constructor(data, provider) {
        this.data = data;
        this.provider = provider;
    }

    getVia() {
        return ['notify', 'mail', 'database']
    }

    getTitle() {
        return 'Notification';
    }

    getMessage() {
        return 'message';
    }

    getIcon() {
        return '';
    }

    getLink() {
        return ''
    }

    static async send(user, notificationInstance) {
        const { notification: NotificationProvider } = Provider();
        const now = NotificationProvider.now();
        for (const via of notificationInstance.getVia()) {
            await NotificationProvider.add({
                due_time: now,
                created_at: now,
                channel: via,
                user_uid: user.uid,
                handlers: [],
                subject: notificationInstance.getTitle(),
                message: notificationInstance.getMessage(),
                data: {
                    title: notificationInstance.getTitle(),
                    email: user.email,
                    message: notificationInstance.getMessage(),
                    icon: notificationInstance.getIcon(),
                    link: notificationInstance.getLink(),
                },
                status: 'scheduled',
                type: 'system',
                read_at: null,
            });
        }
        return "done";
    }
}

exports.Notification = Notification;