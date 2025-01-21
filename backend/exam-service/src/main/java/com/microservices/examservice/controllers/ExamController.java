package com.microservices.examservice.controllers;

import com.microservices.examservice.models.Exam;
import com.microservices.examservice.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/exams")
@CrossOrigin(origins = "http://localhost:4200")
public class ExamController {

    @Autowired
    private ExamService examService;

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.findAll();
        return ResponseEntity.ok(exams);
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@Valid @RequestBody Exam exam) {
        Exam createdExam = examService.save(exam);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        Exam exam = examService.findById(id);
        return ResponseEntity.ok(exam);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable Long id, @Valid @RequestBody Exam exam) {
        exam.setId(id);
        Exam updatedExam = examService.update(exam);
        return ResponseEntity.ok(updatedExam);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
