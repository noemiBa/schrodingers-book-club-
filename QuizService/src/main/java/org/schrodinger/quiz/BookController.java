package org.schrodinger.quiz;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
