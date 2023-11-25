package com.example.MobileLab2.controler;

import com.example.MobileLab2.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @GetMapping
    public ResponseEntity getLessons(
            @RequestParam String teacherName,
            @RequestParam Integer pointsGreaterThen
    ){
        return ResponseEntity.ok(lessonService.whereTeacherNameAndPointsGreaterThen(teacherName, pointsGreaterThen));
    }

    @GetMapping("/average-points")
    public ResponseEntity getAverageGrade(){
        return ResponseEntity.ok(lessonService.getAveragePoints());
    }
}
