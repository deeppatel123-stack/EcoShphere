export const createOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({ success: true, data: doc });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAll = (Model) => async (req, res, next) => {
    try {
        let query = Model.find();
        // Support simple filtering
        if (req.query.status) {
            query = query.where('status').equals(req.query.status);
        }
        const docs = await query.exec();
        res.status(200).json({ success: true, count: docs.length, data: docs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOne = (Model, popOptions) => async (req, res, next) => {
    try {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;
        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.status(200).json({ success: true, data: doc });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.status(200).json({ success: true, data: doc });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        res.status(200).json({ success: true, message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
