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


@RestController
public class QuizController {

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/quiz")
    public ResponseEntity<String> processQuiz(@RequestBody int[] answers) {
        // implement quiz logic to process the answers array
        List<Book> filteredBookList = calculateQuizScore(answers);
        String bookListHTMLtable = generateQuizResult(filteredBookList);

        // return the quiz result as a response to the HTTP request
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
        // implement quiz result generation logic based on the quiz score
        // e.g. using conditional statements and string concatenation
        StringBuilder html = new StringBuilder();
        html.append("<table>");
        html.append("<tr><th>ID</th><th>Name</th><th>Author</th><th>ISBN</th><th>Description</th><th>Quote</th><th>Genre</th><th>Tags</th></tr>");
        for (Book book : books) {
            html.append("<tr>");
            html.append("<td>").append(book.getId()).append("</td>");
            html.append("<td>").append(book.getName()).append("</td>");
            html.append("<td>").append(book.getAuthor()).append("</td>");
            html.append("<td>").append(book.getIsbn()).append("</td>");
            html.append("<td>").append(book.getDescription()).append("</td>");
            html.append("<td>").append(book.getQuote()).append("</td>");
            html.append("<td>").append(book.getGenre()).append("</td>");
            html.append("<td>").append(String.join(",", book.getTags())).append("</td>");
            html.append("</tr>");
        }
        html.append("</table>");
        return html.toString();
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
