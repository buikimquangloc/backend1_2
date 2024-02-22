const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");

// exports.create = (req, res) => {
//     res.send({ message: "create handler"});
// };

exports.findAll = (req, res) => {
    res.send({ message: "find all handler"});
};

exports.findOne = (req, res) => {
    res.send({ message: "find one handler"});
};

exports.update = (req, res) => {
    res.send({ message: "update handler"});
};

exports.delete = (req, res) => {
    res.send({ message: "Delete handler"});
};
exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler"});
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFovorite handler"});
};

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty"));
    } 
    try {
        const ContactService = new ContactService(Mongodb.client);
        const document = await ContactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next( new ApiError(500, "An error occurred while creating the contact"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents =  [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    }catch (error) {
        return next( new ApiError(500, "An error occurred while creating the contacts"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findById(req.params.id);
        if(!documents) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(documents);
    } catch (error) {
        return next( new ApiError(500, `Error retrieving contact with id=${req.params.id}`)); 
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0 ) {
        return next(new ApiError(400, "Data to update cannot be empty"));
    } 
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.update(req.params.id, req.body);
        if(!documents) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(documents);
    } catch (error) {
        return next( new ApiError(500, `Error updating contact with id=${req.params.id}`)); 
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.delete(req.params.id);
        if(!documents) {
            return next(new ApiError(404, "Contact not found"));
        }
    } catch (error) {
        return next( new ApiError(500, `Could not delete contact with id=${req.params.id}`)); 
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findAllFavorite();
        return res.send(documents);
    } catch (error) {
        return next( new ApiError(500, "An error occurred while retrieving favorite contacts")); 
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({message: `${deletedCount} contacts were deleted successfully`,});
    } catch (error) {
        return next( new ApiError(500, "An error occurred while removing all contacts")); 
    }
};
