package org.schrodinger.quiz;

import java.io.IOException;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class BookController {
    // public static JSONArray getBooksJSONArray() {
    //     try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
    //         HttpGet request = new HttpGet("http://backend-service:3000/books");
    //         HttpResponse response = httpClient.execute(request);
    //         HttpEntity entity = response.getEntity();

    //         if (entity != null) {
    //             String responseBody = EntityUtils.toString(entity);
    //             JSONObject jsonResponse = new JSONObject(responseBody);

    //             if (jsonResponse.has("statusCode") && jsonResponse.getInt("statusCode") == 200) {
    //                 JSONArray booksArray = jsonResponse.getJSONObject("data").getJSONArray("books");
    //                 return booksArray;
    //             }
    //         }
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }

    //     return null;
    // }

    public static JSONArray getBooksJSONArray() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<BookResponse> response = restTemplate.getForEntity("http://backend-service:3000/books", BookResponse.class);
        BookResponse bookResponse = response.getBody();
		BookData bookData = bookResponse.getData();
        JSONArray booksArray = new JSONArray(bookData.getBooks());
        System.out.println("booksArray = " + booksArray.toString());

        System.out.println("response.getStatusCode() = " + response.getStatusCode());
        
        if (response.getStatusCode() == HttpStatus.OK) {
            // JSONObject jsonResponse = response.getBody();
            // System.out.println("jsonResponse = " + jsonResponse);
            // JSONArray booksArray = jsonResponse.getJSONObject("data").getJSONArray("books");
            return booksArray;
        }
        
        return null;
    }
    

    public static JSONArray getEmptyResponse(){
        JSONArray emptyArray = new JSONArray();
        JSONObject empty = new JSONObject();
        empty.put("author","empty author");
        empty.put("isbn","1234567891234");
        empty.put("genre","none");
        empty.put("description","none");
        empty.put("title","blank");
        emptyArray.put(empty);
        return emptyArray;
    }
}
