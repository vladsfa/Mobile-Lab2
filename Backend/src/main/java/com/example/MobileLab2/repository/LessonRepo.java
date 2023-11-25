package com.example.MobileLab2.repository;

import com.example.MobileLab2.entity.LessonEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LessonRepo extends CrudRepository<LessonEntity, Long> {
    List<LessonEntity> findAllByTeacherName(String teacherName);
}
