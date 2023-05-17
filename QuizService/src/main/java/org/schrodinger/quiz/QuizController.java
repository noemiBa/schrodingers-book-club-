package org.schrodinger.quiz;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.stream.IntStream;
import java.util.HashMap;
import org.json.JSONArray;
import org.json.JSONObject;

@RestController
public class QuizController {
    private JSONArray books;
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
//        System.out.println(result.toString());
        return ResponseEntity.ok(quizQuestions.toString());
//        return ResponseEntity.ok(result.toString());
    }

    @PostMapping("/quizAnswers")
    public ResponseEntity<String> postQuizMapping(@RequestBody QuizRequest quizRequest) {
        int[] answers = quizRequest.getAnswers();
        JSONArray recommendedBooks = processQuiz(answers);

        if(recommendedBooks == null){
            JSONArray errorResponse = BookController.getEmptyResponse();
            return ResponseEntity.ok(errorResponse.toString());
        } else {
            return ResponseEntity.ok(recommendedBooks.toString());
        }
    }


    private JSONArray processQuiz(int[] answers){
        books = BookController.getBooksJSONArray();
        if(books == null) return null;
        return calculateQuizScore(answers);
    }

    private JSONArray calculateQuizScore(int[] answers) {
        Map<Integer, String> genreMap = getGenreMap();
        String[] genres = IntStream.range(0, 4)
                .mapToObj(i -> genreMap.get(answers[i]+(i*4)))
                .toArray(String[]::new);

        JSONArray filteredBooks = new JSONArray();

        for (int i = 0; i < books.length(); i++) {
            JSONObject book = books.getJSONObject(i);
            String genre = book.getString("genre");
            String tags = book.getString("tags");
            // Check if the genre matches
            for (String desiredGenre : genres) {
                if (genre.equalsIgnoreCase(desiredGenre)) {
                    filteredBooks.put(book);
                    break; // Break out of the inner loop once a match is found
                }}
            // Check if the tags contain any genre matches
            if (tags != null) {
                String[] bookTags = tags.split(",");
                for (String tag : bookTags) {
                    for (String desiredGenre : genres) {
                        if (tag.trim().equalsIgnoreCase(desiredGenre)) {
                            filteredBooks.put(book);
                            break; // Break out of the inner loop once a match is found
                        }}}}}

        return formatHTTPResponseForBooks(filteredBooks);
    }

    private JSONArray formatHTTPResponseForBooks(JSONArray filteredBooks){
        JSONArray recommendedBooks = new JSONArray();

        for (int i = 0; i < filteredBooks.length(); i++) {
            JSONObject filteredBook = filteredBooks.getJSONObject(i);

            JSONObject recommendedBook = new JSONObject();
            recommendedBook.put("author", filteredBook.getString("author"));
            recommendedBook.put("isbn", filteredBook.getString("ISBN"));
            recommendedBook.put("genre", filteredBook.getString("genre"));
            recommendedBook.put("description", filteredBook.getString("excerpt"));
            recommendedBook.put("title", filteredBook.getString("title"));

            recommendedBooks.put(recommendedBook);
        }
        return recommendedBooks;
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
