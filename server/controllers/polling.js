import Poll from './../models/poll';

export function getPolls(req, res, next) {
    Poll.find({})
        .select('id title')
        .sort('title')
        .exec((err, polls) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            return res.status(200).json({ polls: polls });
        });
}

export function getMyPolls(req, res, next) {
    Poll.find({ author: req.params.userId })
        .select('id title')
        .sort('createdAt')
        .exec((err, polls) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            return res.status(200).json({ polls: polls });
        });
}

export function getSinglePoll(req, res, next) {
    Poll.findOne({ id: req.params.pollId })
        .select('createdAt title author options')
        .sort('-createdAt')
        .populate('options')
        .exec((err, poll) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            return res.status(200).json({ poll: poll });
        });
}

export function addPoll(req, res, next) {
    if (!req.body.title) {
        res.status(422).send({ error: 'Please enter a title.' });
        return next();
    }

    if (!req.body.options || req.body.options.length < 2) {
        res.status(422).send({ error: 'Please enter 2 or more options.' });
        return next();
    }

    let arrOptions = [];
    req.body.options.map((val) => {
        arrOptions.push({ name: val.toString(), vote: 0});
    });

    const poll = new Poll({
        title: req.body.title,
        author: req.params.userId,
        options: arrOptions
    });

    poll.save((err, newPoll) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        return res.status(200).json({ message: `New poll (id:${newPoll.id}) has been created.` });
    });
}