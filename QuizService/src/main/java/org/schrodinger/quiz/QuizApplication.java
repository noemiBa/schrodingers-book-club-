package org.schrodinger.quiz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableEurekaClient
public class QuizApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizApplication.class, args);

		RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<BookResponse> response = restTemplate.getForEntity("http://backend-service:3000/books", BookResponse.class);
        BookResponse bookResponse = response.getBody();
		BookData bookData = bookResponse.getData();
        
        if (bookResponse != null && bookData.getBooks() != null) {
            for (Book book : bookData.getBooks()) {
                System.out.println("Book ID: " + book.getId());
                System.out.println("ISBN: " + book.getIsbn());
                System.out.println("Title: " + book.getTitle());
                System.out.println("Author: " + book.getAuthor());
                System.out.println("Excerpt: " + book.getExcerpt());
                System.out.println("Cover: " + book.getCover());
                System.out.println("Genre: " + book.getGenre());
                System.out.println("Created At: " + book.getCreatedAt());
                System.out.println("Tags: " + book.getTags());
                System.out.println();
            }
        }
	}

}
