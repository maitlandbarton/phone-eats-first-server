const { Schema, model } = require("mongoose");

const eventSchema = newSchema({
    imageUrl: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        // min characters?
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        refPath: "likedByModel"
    }],
    likedByModel: [{
        type: String,
        required: true,
        enum: ["User", "Admin"]
    }],
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    date: {
        type: Date,
        required: true
    }, 
    time: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Business"
    },
    // location: String
})