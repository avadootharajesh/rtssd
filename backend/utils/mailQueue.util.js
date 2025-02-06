const queue = require("bull");
const sendmail = require("./sendmail.util");

const mailQueue = new queue('mailQueue',
    {
        limiter: {
            max: 1,
            duration: 1000
        },
    }
);

mailQueue.process(async (job, done) => {
    const mailOptions = job.data;
    try{
        await sendmail(mailOptions);
        done();
    } catch(error) {
        done(error);
    }
});

module.exports = mailQueue