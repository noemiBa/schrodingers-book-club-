package org.schrodinger.quiz;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.CollectionTable;
import javax.persistence.JoinColumn;

import java.util.List;


@Entity
@Table(name = "books")
public class Book {
    @Id
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "author")
    private String author;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "description")
    private String description;

    @Column(name = "quote")
    private String quote;

    @Column(name = "genre")
    private String genre;

    @ElementCollection
    @CollectionTable(name = "book_tags", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "tag")
    private List<String> tags;

    // getters and setters
    public String[] getTags() {
        return tags.toArray(new String[tags.size()]);
    }

    public String getGenre() {
        return genre;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getDescription() {
        return description;
    }

    public String getQuote() {
        return quote;
    }
}
