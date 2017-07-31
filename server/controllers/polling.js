import Poll from '../models/poll';

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

export function newPoll(req, res, next) {
    if (!req.params.title) {
        res.status(422).send({ error: 'Please enter a title.' });
        return next();
    }

    if (!req.params.options || req.params.options.length < 2) {
        res.status(422).send({ error: 'Please enter 2 or more options.' });
        return next();
    }

    const poll = new Poll({
        title: req.params.title,
        author: req.user._id,
        options: req.params.options
    });

    poll.save((err, newPoll) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        return res.status(200).json({ pollId: newPoll._id });
    });
}