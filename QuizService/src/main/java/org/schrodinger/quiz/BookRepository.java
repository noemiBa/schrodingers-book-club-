package org.schrodinger.quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import java.util.List;


@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    List<Book> findAll();
    List<Book> findByGenre(String genre);
}
