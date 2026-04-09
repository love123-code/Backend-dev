const Student = require("../models/student.model");

exports.createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

exports.getStudentByEmail = async (req, res) => {
    const student = await Student.findOne({ email: req.params.email });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
};

exports.updateGPA = async (req, res) => {
    const student = await Student.findOneAndUpdate(
        { email: req.params.email },
        { gpa: req.body.gpa },
        { new: true }
    );
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
};

exports.deleteStudent = async (req, res) => {
    const student = await Student.findOneAndDelete({ email: req.params.email });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
};

exports.gpaRange = async (req, res) => {
    const students = await Student.find({
        gpa: { $gte: 3.0, $lte: 3.5 }
    });
    res.json(students);
};

exports.moreCourses = async (req, res) => {
    const students = await Student.find({
        $expr: { $gt: [{ $size: "$courses" }, 5] }
    });
    res.json(students);
};

exports.topStudents = async (req, res) => {
    const students = await Student.find().sort({ gpa: -1 }).limit(10);
    res.json(students);
};

exports.countByCity = async (req, res) => {
    const result = await Student.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 } } }
    ]);
    res.json(result);
};