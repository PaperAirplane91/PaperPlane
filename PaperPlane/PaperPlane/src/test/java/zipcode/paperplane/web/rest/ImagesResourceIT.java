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
import org.springframework.util.Base64Utils;
import zipcode.paperplane.IntegrationTest;
import zipcode.paperplane.domain.Images;
import zipcode.paperplane.repository.ImagesRepository;

/**
 * Integration tests for the {@link ImagesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ImagesResourceIT {

    private static final byte[] DEFAULT_IMAGE_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_DATA_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CAPTION = "AAAAAAAAAA";
    private static final String UPDATED_CAPTION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_S_3_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_S_3_URL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/images";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ImagesRepository imagesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restImagesMockMvc;

    private Images images;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Images createEntity(EntityManager em) {
        Images images = new Images()
            .imageData(DEFAULT_IMAGE_DATA)
            .imageDataContentType(DEFAULT_IMAGE_DATA_CONTENT_TYPE)
            .caption(DEFAULT_CAPTION)
            .imageS3Url(DEFAULT_IMAGE_S_3_URL);
        return images;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Images createUpdatedEntity(EntityManager em) {
        Images images = new Images()
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE)
            .caption(UPDATED_CAPTION)
            .imageS3Url(UPDATED_IMAGE_S_3_URL);
        return images;
    }

    @BeforeEach
    public void initTest() {
        images = createEntity(em);
    }

    @Test
    @Transactional
    void createImages() throws Exception {
        int databaseSizeBeforeCreate = imagesRepository.findAll().size();
        // Create the Images
        restImagesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(images)))
            .andExpect(status().isCreated());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeCreate + 1);
        Images testImages = imagesList.get(imagesList.size() - 1);
        assertThat(testImages.getImageData()).isEqualTo(DEFAULT_IMAGE_DATA);
        assertThat(testImages.getImageDataContentType()).isEqualTo(DEFAULT_IMAGE_DATA_CONTENT_TYPE);
        assertThat(testImages.getCaption()).isEqualTo(DEFAULT_CAPTION);
        assertThat(testImages.getImageS3Url()).isEqualTo(DEFAULT_IMAGE_S_3_URL);
    }

    @Test
    @Transactional
    void createImagesWithExistingId() throws Exception {
        // Create the Images with an existing ID
        images.setId(1L);

        int databaseSizeBeforeCreate = imagesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restImagesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(images)))
            .andExpect(status().isBadRequest());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllImages() throws Exception {
        // Initialize the database
        imagesRepository.saveAndFlush(images);

        // Get all the imagesList
        restImagesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(images.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageDataContentType").value(hasItem(DEFAULT_IMAGE_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imageData").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE_DATA))))
            .andExpect(jsonPath("$.[*].caption").value(hasItem(DEFAULT_CAPTION)))
            .andExpect(jsonPath("$.[*].imageS3Url").value(hasItem(DEFAULT_IMAGE_S_3_URL)));
    }

    @Test
    @Transactional
    void getImages() throws Exception {
        // Initialize the database
        imagesRepository.saveAndFlush(images);

        // Get the images
        restImagesMockMvc
            .perform(get(ENTITY_API_URL_ID, images.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(images.getId().intValue()))
            .andExpect(jsonPath("$.imageDataContentType").value(DEFAULT_IMAGE_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.imageData").value(Base64Utils.encodeToString(DEFAULT_IMAGE_DATA)))
            .andExpect(jsonPath("$.caption").value(DEFAULT_CAPTION))
            .andExpect(jsonPath("$.imageS3Url").value(DEFAULT_IMAGE_S_3_URL));
    }

    @Test
    @Transactional
    void getNonExistingImages() throws Exception {
        // Get the images
        restImagesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingImages() throws Exception {
        // Initialize the database
        imagesRepository.saveAndFlush(images);

        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();

        // Update the images
        Images updatedImages = imagesRepository.findById(images.getId()).get();
        // Disconnect from session so that the updates on updatedImages are not directly saved in db
        em.detach(updatedImages);
        updatedImages
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE)
            .caption(UPDATED_CAPTION)
            .imageS3Url(UPDATED_IMAGE_S_3_URL);

        restImagesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedImages.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedImages))
            )
            .andExpect(status().isOk());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
        Images testImages = imagesList.get(imagesList.size() - 1);
        assertThat(testImages.getImageData()).isEqualTo(UPDATED_IMAGE_DATA);
        assertThat(testImages.getImageDataContentType()).isEqualTo(UPDATED_IMAGE_DATA_CONTENT_TYPE);
        assertThat(testImages.getCaption()).isEqualTo(UPDATED_CAPTION);
        assertThat(testImages.getImageS3Url()).isEqualTo(UPDATED_IMAGE_S_3_URL);
    }

    @Test
    @Transactional
    void putNonExistingImages() throws Exception {
        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();
        images.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImagesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, images.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(images))
            )
            .andExpect(status().isBadRequest());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchImages() throws Exception {
        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();
        images.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImagesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(images))
            )
            .andExpect(status().isBadRequest());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamImages() throws Exception {
        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();
        images.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImagesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(images)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateImagesWithPatch() throws Exception {
        // Initialize the database
        imagesRepository.saveAndFlush(images);

        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();

        // Update the images using partial update
        Images partialUpdatedImages = new Images();
        partialUpdatedImages.setId(images.getId());

        partialUpdatedImages.caption(UPDATED_CAPTION).imageS3Url(UPDATED_IMAGE_S_3_URL);

        restImagesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedImages.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedImages))
            )
            .andExpect(status().isOk());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
        Images testImages = imagesList.get(imagesList.size() - 1);
        assertThat(testImages.getImageData()).isEqualTo(DEFAULT_IMAGE_DATA);
        assertThat(testImages.getImageDataContentType()).isEqualTo(DEFAULT_IMAGE_DATA_CONTENT_TYPE);
        assertThat(testImages.getCaption()).isEqualTo(UPDATED_CAPTION);
        assertThat(testImages.getImageS3Url()).isEqualTo(UPDATED_IMAGE_S_3_URL);
    }

    @Test
    @Transactional
    void fullUpdateImagesWithPatch() throws Exception {
        // Initialize the database
        imagesRepository.saveAndFlush(images);

        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();

        // Update the images using partial update
        Images partialUpdatedImages = new Images();
        partialUpdatedImages.setId(images.getId());

        partialUpdatedImages
            .imageData(UPDATED_IMAGE_DATA)
            .imageDataContentType(UPDATED_IMAGE_DATA_CONTENT_TYPE)
            .caption(UPDATED_CAPTION)
            .imageS3Url(UPDATED_IMAGE_S_3_URL);

        restImagesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedImages.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedImages))
            )
            .andExpect(status().isOk());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
        Images testImages = imagesList.get(imagesList.size() - 1);
        assertThat(testImages.getImageData()).isEqualTo(UPDATED_IMAGE_DATA);
        assertThat(testImages.getImageDataContentType()).isEqualTo(UPDATED_IMAGE_DATA_CONTENT_TYPE);
        assertThat(testImages.getCaption()).isEqualTo(UPDATED_CAPTION);
        assertThat(testImages.getImageS3Url()).isEqualTo(UPDATED_IMAGE_S_3_URL);
    }

    @Test
    @Transactional
    void patchNonExistingImages() throws Exception {
        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();
        images.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImagesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, images.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(images))
            )
            .andExpect(status().isBadRequest());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchImages() throws Exception {
        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();
        images.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImagesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(images))
            )
            .andExpect(status().isBadRequest());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamImages() throws Exception {
        int databaseSizeBeforeUpdate = imagesRepository.findAll().size();
        images.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restImagesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(images)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Images in the database
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteImages() throws Exception {
        // Initialize the database
        imagesRepository.saveAndFlush(images);

        int databaseSizeBeforeDelete = imagesRepository.findAll().size();

        // Delete the images
        restImagesMockMvc
            .perform(delete(ENTITY_API_URL_ID, images.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Images> imagesList = imagesRepository.findAll();
        assertThat(imagesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
