package com.example.MobileLab2.service;

import com.example.MobileLab2.entity.LessonEntity;
import com.example.MobileLab2.repository.LessonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LessonService {
    @Autowired
    LessonRepo lessonRepo;
    public List<LessonEntity> whereTeacherNameAndPointsGreaterThen(String teacherName, Integer points){
        return lessonRepo.findAllByTeacherName(teacherName)
                .stream().filter(e -> e.getPoints() > points)
                .toList();
    }

    public Double getAveragePoints(){
        Double sum = 0.0;
        int count = 0;
        Iterable<LessonEntity> lessons = lessonRepo.findAll();
        for(LessonEntity lesson : lessons){
            sum += lesson.getPoints();
            count += 1;
        }
        return sum / count;
    }
}
