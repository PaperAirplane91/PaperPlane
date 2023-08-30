package zipcode.paperplane.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import zipcode.paperplane.domain.Document;

/**
 * Spring Data JPA repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    @Query("select document from Document document where document.user.login = ?#{principal.username}")
    List<Document> findByUserIsCurrentUser();
}
