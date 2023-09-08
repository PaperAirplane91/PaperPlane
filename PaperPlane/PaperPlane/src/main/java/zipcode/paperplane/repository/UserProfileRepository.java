package zipcode.paperplane.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import zipcode.paperplane.domain.UserProfile;

/**
 * Spring Data JPA repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {}
