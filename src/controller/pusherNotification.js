const pusher = require('pusher');


const pusherInstance = new Pusher({
    appId: "1818955",
    key: "2c50447b9a6ca009a1ec",
    secret: "fb04052ce5908cacddb4",
    cluster: "ap2",
    useTLS: true
});

const triggerEvent = (req, res) => {
    const { channel, event, data } = req.body; 

    pusherInstance.trigger(channel, event, data, (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Pusher event failed');
            return;
        }

        console.log('Pusher event triggered successfully');
        res.json({ message: 'Event triggered' });
    });
};

module.exports = {
    triggerEvent
};