package org.schrodinger.quiz;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.JSONArray;
import org.json.JSONObject;

public class BookController {
    public static JSONArray getBooksJSONArray() {
        try {
            URL url = new URL("http://localhost:3000/books");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            connection.disconnect();

            // Parse the JSON response
            JSONObject jsonResponse = new JSONObject(response.toString());
            if (jsonResponse.has("statusCode") && jsonResponse.getInt("statusCode") == 200) {
                JSONArray booksArray = jsonResponse.getJSONObject("data").getJSONArray("books");
                return booksArray;
            }
        } catch (IOException e) {
            e.printStackTrace();
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
