import TryCatch from "../middlewares/TryCatch.js";
import { Courses } from "../models/Courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/User.js";

export const createCourse = TryCatch(async(req,res) => {
    const {title,description,category,createdBy,duration,price} = req.body

    const image = req.file;

    await Courses.create({
        title,
        description,
        category,
        createdBy,
        duration,
        price,
        image: image?.path,
    });
    res.status(201).json({
        message:"Course created successfully",
    });
});

export const addLectures = TryCatch(async(req,res)=>{
    const course = await Courses.findById(req.params.id)

    if(!course) 
        return res.status(404).json({
            message: "No courses with this id",
    });

    const {title,description} = req.body

    const file = req.file

    const lecture = await Lecture.create({
        title,
        description,
        video: file?.path,
        course: course._id,
    });

    res.status(201).json({
        message:'Lecture Added',
        lecture,
    });
});

export const deleteLecture = TryCatch(async(req,res) => {
    const lecture = await Lecture.findById(req.params.id)

    rm(lecture.video,() => {
        console.log("Video deleted");
    })

    await lecture.deleteOne()

    res.json({message: "Lecture Deleted"})

});

const unlinkAsync = promisify(fs.unlink)

export const deleteCourse = TryCatch(async (req, res) => {
    const course = await Courses.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    // Fetch all lectures associated with the course
    const lectures = await Lecture.find({ course: req.params.id });

    // Delete all lecture videos
    await Promise.all(
        lectures.map(async (lecture) => {
            if (lecture.video) {
                await unlinkAsync(lecture.video);
                console.log("Video deleted");
            }
        })
    );

    // Delete course image
    if (course.image) {
        await unlinkAsync(course.image);
        console.log("Image deleted");
    }

    // Delete all lectures associated with the course
    await Lecture.deleteMany({ course: req.params.id });

    // Remove course from users' subscriptions
    await User.updateMany({}, { $pull: { subscription: req.params.id } });

    // Delete the course
    await course.deleteOne();

    res.json({
        message: "Course Deleted",
    });
});

export const getAllStats = TryCatch(async(req,res) => {
    const totalCourse = (await Courses.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUser = (await User.find()).length;

    const stats = {
        totalCourse,
        totalLectures,
        totalUser,
    };

    res.json({
        stats,
    });

})

export const getAllUser = TryCatch(async (req,res) => {
    const users = await User.find({_id:{$ne: req.user._id}}).select("password");

    res.json({users});
})

export const updateRole = TryCatch(async(req,res) => {

    if(req.user.mainrole !== "superadmin")
        return res.status(403).json({
            message:"This endpoint is assign to superadmin",
        });

    const user = await User.findById(req.params.id)

    if(user.role === "user"){
        user.role = "admin";
        await user.save();

        return res.status(200).json({
            message:"Role updated to admin",
        });
    }

    if(user.role === "admin"){
        user.role = "user";
        await user.save();

        return res.status(200).json({
            message:"Role updated to user",
        });
    }
})