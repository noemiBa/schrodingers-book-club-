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

    @GetMapping("/quizQuestions")
    public ResponseEntity<String> createQuizQuestions() {
        JSONArray quizQuestions = new JSONArray();

        // Question 1
        JSONObject question1 = new JSONObject();
        question1.put("title", "Which of the four do you prefer?");
        JSONArray options1 = new JSONArray();
        options1.put("Obvious hero and villain.");
        options1.put("Smart hero and villain.");
        options1.put("Ensemble heroes and villains.");
        options1.put("No heroes, only villains.");
        question1.put("options", options1);
        quizQuestions.put(question1);

        // Question 2
        JSONObject question2 = new JSONObject();
        question2.put("title", "What type of endings do you prefer?");
        JSONArray options2 = new JSONArray();
        options2.put("Happy endings.");
        options2.put("Sappy endings.");
        options2.put("Cliffhangers.");
        options2.put("No ending, just cut to the credits.");
        question2.put("options", options2);
        quizQuestions.put(question2);

        // Question 3
        JSONObject question3 = new JSONObject();
        question3.put("title", "For wherever you happen to live in the world, which best describes your area?");
        JSONArray options3 = new JSONArray();
        options3.put("I'm from the north.");
        options3.put("I'm from the east.");
        options3.put("I'm from the west.");
        options3.put("I'm from the south.");
        question3.put("options", options3);
        quizQuestions.put(question3);

        // Question 4
        JSONObject question4 = new JSONObject();
        question4.put("title", "What's your favourite category?");
        JSONArray options4 = new JSONArray();
        options4.put("Drama");
        options4.put("Not Drama");
        options4.put("Dramedy");
        options4.put("Fantasy");
        question4.put("options", options4);
        quizQuestions.put(question4);

        JSONObject result = new JSONObject();
        result.put("quizQuestions", quizQuestions);

        return ResponseEntity.ok(result.toString());
    }


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
