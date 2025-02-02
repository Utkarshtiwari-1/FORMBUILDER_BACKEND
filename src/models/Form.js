const mongoose = require('mongoose');

// Schema for individual questions in the form
const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['single', 'multiple', 'text', 'email', 'contact', 'phoneNum', 'document', 'textarea', 'dropdown', 'radio'], // Added missing types
        required: true
    },
    options: [{ type: String }],
    isRequired: { type: Boolean, default: false },
    order: { type: Number, required: true }
});

// Schema for form responses (optional if you want to store responses)
const ResponseSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Reference to the specific question
    answer: { type: mongoose.Schema.Types.Mixed, required: true } // Answer provided by the user, can be a string or array (for checkboxes)
});

// Schema for the form
const FormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    Banner_url: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to the admin user who created the form
    questions: [QuestionSchema],
    responses: [ResponseSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: false }
});

module.exports = mongoose.model('Form', FormSchema);
