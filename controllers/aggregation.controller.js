const Student = require("../models/student.model");
const Grade = require("../models/grade.model");

exports.avgGpaByDept = async (req, res) => {
    const result = await Student.aggregate([
        { $group: { _id: "$department", avgGPA: { $avg: "$gpa" } } }
    ]);
    res.json(result);
};

exports.popularCourses = async (req, res) => {
    const result = await Student.aggregate([
        { $unwind: "$courses" },
        { $group: { _id: "$courses", total: { $sum: 1 } } },
        { $sort: { total: -1 } }
    ]);
    res.json(result);
};

exports.performance = async (req, res) => {
    const result = await Grade.aggregate([
        {
            $lookup: {
                from: "students",
                localField: "student",
                foreignField: "_id",
                as: "student"
            }
        },
        { $unwind: "$student" },
        {
            $group: {
                _id: "$student.name",
                avgGrade: { $avg: "$grade" },
                totalCourses: { $sum: 1 }
            }
        }
    ]);
    res.json(result);
};