package org.schrodinger.quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;



@RestController
public class QuizController {

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/quizAnswers")
    public ResponseEntity<String> processQuiz(@RequestBody QuizRequest quizRequest) {
        int[] answers = quizRequest.getAnswers();
        List<Book> filteredBookList = calculateQuizScore(answers);
        String bookListHTMLtable = "no books found in list";
        if(filteredBookList.isEmpty())
            return ResponseEntity.badRequest().body(bookListHTMLtable);
        else
            bookListHTMLtable = generateQuizResult(filteredBookList);
        return ResponseEntity.ok(bookListHTMLtable);
    }

    private List<Book> calculateQuizScore(int[] answers) {
        List<Book> books = bookRepository.findAll();
        Map<Integer, String> genreMap = getGenreMap();
        String[] genres = IntStream.range(0, 4)
                .mapToObj(i -> genreMap.get(answers[i]+(i*4)))
                .toArray(String[]::new);

        // Filter the list of books based on genre and tag
        return books.stream()
                .filter(book -> book.getGenre().equals(genres[0]) || book.getGenre().equals(genres[1])
                        || book.getGenre().equals(genres[2]) || book.getGenre().equals(genres[3])
                        || Arrays.asList(book.getTags()).contains(genres[0])
                        || Arrays.asList(book.getTags()).contains(genres[1])
                        || Arrays.asList(book.getTags()).contains(genres[2])
                        || Arrays.asList(book.getTags()).contains(genres[3]))
                .collect(Collectors.toList());
    }

        private String generateQuizResult(List<Book> books) {
        JSONArray rows = new JSONArray();

        for (Book book : books) {
            JSONObject row = new JSONObject();
            row.put("title", book.getName());
            row.put("author", book.getAuthor());
            row.put("isbn", book.getIsbn());
            row.put("description", book.getDescription());
            row.put("genre", book.getGenre());
            rows.put(row);
        }

        JSONObject result = new JSONObject();
        result.put("books", rows);

        return result.toString();
    }

    private Map<Integer, String> getGenreMap() {
        Map<Integer, String> genreMap = new HashMap<>();
        genreMap.put(0, "Fairy Tale");
        genreMap.put(1, "Young Adult Fiction");
        genreMap.put(2, "Fiction");
        genreMap.put(3, "Non-Fiction");
        genreMap.put(4, "Childrens Literature");
        genreMap.put(5, "Romance");
        genreMap.put(6, "Mystery");
        genreMap.put(7, "Self Help");
        genreMap.put(8, "True Crime");
        genreMap.put(9, "Travel");
        genreMap.put(10, "Western");
        genreMap.put(11, "Satire");
        genreMap.put(12, "Thriller");
        genreMap.put(13, "Comedy");
        genreMap.put(14, "Horror");
        genreMap.put(15, "Fantasy");
        return genreMap;
    }

}
