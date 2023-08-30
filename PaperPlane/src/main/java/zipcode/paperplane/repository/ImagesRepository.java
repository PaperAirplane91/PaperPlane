package zipcode.paperplane.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import zipcode.paperplane.domain.Images;

/**
 * Spring Data JPA repository for the Images entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagesRepository extends JpaRepository<Images, Long> {}
