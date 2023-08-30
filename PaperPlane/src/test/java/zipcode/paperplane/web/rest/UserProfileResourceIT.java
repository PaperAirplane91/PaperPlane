package zipcode.paperplane.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import zipcode.paperplane.IntegrationTest;
import zipcode.paperplane.domain.UserProfile;
import zipcode.paperplane.repository.UserProfileRepository;

/**
 * Integration tests for the {@link UserProfileResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserProfileResourceIT {

    private static final Integer DEFAULT_USER_ID = 1;
    private static final Integer UPDATED_USER_ID = 2;

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/user-profiles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserProfileMockMvc;

    private UserProfile userProfile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProfile createEntity(EntityManager em) {
        UserProfile userProfile = new UserProfile().userId(DEFAULT_USER_ID).username(DEFAULT_USERNAME).password(DEFAULT_PASSWORD);
        return userProfile;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProfile createUpdatedEntity(EntityManager em) {
        UserProfile userProfile = new UserProfile().userId(UPDATED_USER_ID).username(UPDATED_USERNAME).password(UPDATED_PASSWORD);
        return userProfile;
    }

    @BeforeEach
    public void initTest() {
        userProfile = createEntity(em);
    }

    @Test
    @Transactional
    void createUserProfile() throws Exception {
        int databaseSizeBeforeCreate = userProfileRepository.findAll().size();
        // Create the UserProfile
        restUserProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userProfile)))
            .andExpect(status().isCreated());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeCreate + 1);
        UserProfile testUserProfile = userProfileList.get(userProfileList.size() - 1);
        assertThat(testUserProfile.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testUserProfile.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testUserProfile.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    void createUserProfileWithExistingId() throws Exception {
        // Create the UserProfile with an existing ID
        userProfile.setId(1L);

        int databaseSizeBeforeCreate = userProfileRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserProfileMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userProfile)))
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllUserProfiles() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        // Get all the userProfileList
        restUserProfileMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userProfile.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }

    @Test
    @Transactional
    void getUserProfile() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        // Get the userProfile
        restUserProfileMockMvc
            .perform(get(ENTITY_API_URL_ID, userProfile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userProfile.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }

    @Test
    @Transactional
    void getNonExistingUserProfile() throws Exception {
        // Get the userProfile
        restUserProfileMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserProfile() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();

        // Update the userProfile
        UserProfile updatedUserProfile = userProfileRepository.findById(userProfile.getId()).get();
        // Disconnect from session so that the updates on updatedUserProfile are not directly saved in db
        em.detach(updatedUserProfile);
        updatedUserProfile.userId(UPDATED_USER_ID).username(UPDATED_USERNAME).password(UPDATED_PASSWORD);

        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserProfile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
        UserProfile testUserProfile = userProfileList.get(userProfileList.size() - 1);
        assertThat(testUserProfile.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testUserProfile.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testUserProfile.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    void putNonExistingUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();
        userProfile.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userProfile.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();
        userProfile.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();
        userProfile.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userProfile)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserProfileWithPatch() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();

        // Update the userProfile using partial update
        UserProfile partialUpdatedUserProfile = new UserProfile();
        partialUpdatedUserProfile.setId(userProfile.getId());

        partialUpdatedUserProfile.username(UPDATED_USERNAME).password(UPDATED_PASSWORD);

        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
        UserProfile testUserProfile = userProfileList.get(userProfileList.size() - 1);
        assertThat(testUserProfile.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testUserProfile.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testUserProfile.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    void fullUpdateUserProfileWithPatch() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();

        // Update the userProfile using partial update
        UserProfile partialUpdatedUserProfile = new UserProfile();
        partialUpdatedUserProfile.setId(userProfile.getId());

        partialUpdatedUserProfile.userId(UPDATED_USER_ID).username(UPDATED_USERNAME).password(UPDATED_PASSWORD);

        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserProfile))
            )
            .andExpect(status().isOk());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
        UserProfile testUserProfile = userProfileList.get(userProfileList.size() - 1);
        assertThat(testUserProfile.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testUserProfile.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testUserProfile.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    void patchNonExistingUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();
        userProfile.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userProfile.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();
        userProfile.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userProfile))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserProfile() throws Exception {
        int databaseSizeBeforeUpdate = userProfileRepository.findAll().size();
        userProfile.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserProfileMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userProfile))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserProfile in the database
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserProfile() throws Exception {
        // Initialize the database
        userProfileRepository.saveAndFlush(userProfile);

        int databaseSizeBeforeDelete = userProfileRepository.findAll().size();

        // Delete the userProfile
        restUserProfileMockMvc
            .perform(delete(ENTITY_API_URL_ID, userProfile.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserProfile> userProfileList = userProfileRepository.findAll();
        assertThat(userProfileList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
