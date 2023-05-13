const cron = require('node-cron');
const Tasks = require('../models/tasks');
const User = require('../models/users');
const Notification = require('../models/notification');
const CulturePlan = require('../models/culturePlan');

cron.schedule('* * * * *', async () => {
    try {
        const culturePlans = await CulturePlan.findAllOnTransition();

        if (culturePlans.length == 0) {
            return
        }
        const admins = await User.findAllAdmin();
        if (admins.length > 0) {
            for (const culturePlan of culturePlans) {
                await Notification.notifyCulturePlan(culturePlan, admins.map(e => e.User_Name));
            }
        }

    } catch (err) {
        console.log(err);
    }
});