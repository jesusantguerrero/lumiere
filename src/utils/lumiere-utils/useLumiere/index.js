import { inject } from "vue"

export const useLumiere = (provider) => {
    const notifications = inject('notificiations', []);
    const settings = inject('settings', {});
    
    return {
       notifications,
       settings
    }
}
