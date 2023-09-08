package zipcode.paperplane.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import zipcode.paperplane.domain.Document;

/**
 * Spring Data JPA repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    @Query("SELECT d FROM Document d WHERE lower(d.title) = lower(:title)")
    Document findByTitle(@Param("title") String title);
}
