package zipcode.paperplane.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import zipcode.paperplane.domain.Images;
import zipcode.paperplane.repository.ImagesRepository;
import zipcode.paperplane.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link zipcode.paperplane.domain.Images}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ImagesResource {

    private final Logger log = LoggerFactory.getLogger(ImagesResource.class);

    private static final String ENTITY_NAME = "images";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImagesRepository imagesRepository;

    public ImagesResource(ImagesRepository imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    /**
     * {@code POST  /images} : Create a new images.
     *
     * @param images the images to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new images, or with status {@code 400 (Bad Request)} if the images has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/images")
    public ResponseEntity<Images> createImages(@RequestBody Images images) throws URISyntaxException {
        log.debug("REST request to save Images : {}", images);
        if (images.getId() != null) {
            throw new BadRequestAlertException("A new images cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Images result = imagesRepository.save(images);
        return ResponseEntity
            .created(new URI("/api/images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /images/:id} : Updates an existing images.
     *
     * @param id the id of the images to save.
     * @param images the images to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated images,
     * or with status {@code 400 (Bad Request)} if the images is not valid,
     * or with status {@code 500 (Internal Server Error)} if the images couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/images/{id}")
    public ResponseEntity<Images> updateImages(@PathVariable(value = "id", required = false) final Long id, @RequestBody Images images)
        throws URISyntaxException {
        log.debug("REST request to update Images : {}, {}", id, images);
        if (images.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, images.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!imagesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Images result = imagesRepository.save(images);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, images.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /images/:id} : Partial updates given fields of an existing images, field will ignore if it is null
     *
     * @param id the id of the images to save.
     * @param images the images to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated images,
     * or with status {@code 400 (Bad Request)} if the images is not valid,
     * or with status {@code 404 (Not Found)} if the images is not found,
     * or with status {@code 500 (Internal Server Error)} if the images couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/images/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Images> partialUpdateImages(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Images images
    ) throws URISyntaxException {
        log.debug("REST request to partial update Images partially : {}, {}", id, images);
        if (images.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, images.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!imagesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Images> result = imagesRepository
            .findById(images.getId())
            .map(existingImages -> {
                if (images.getImageId() != null) {
                    existingImages.setImageId(images.getImageId());
                }
                if (images.getDocumentIndex() != null) {
                    existingImages.setDocumentIndex(images.getDocumentIndex());
                }
                if (images.getImageData() != null) {
                    existingImages.setImageData(images.getImageData());
                }
                if (images.getCaption() != null) {
                    existingImages.setCaption(images.getCaption());
                }

                return existingImages;
            })
            .map(imagesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, images.getId().toString())
        );
    }

    /**
     * {@code GET  /images} : get all the images.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of images in body.
     */
    @GetMapping("/images")
    public List<Images> getAllImages() {
        log.debug("REST request to get all Images");
        return imagesRepository.findAll();
    }

    /**
     * {@code GET  /images/:id} : get the "id" images.
     *
     * @param id the id of the images to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the images, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/images/{id}")
    public ResponseEntity<Images> getImages(@PathVariable Long id) {
        log.debug("REST request to get Images : {}", id);
        Optional<Images> images = imagesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(images);
    }

    /**
     * {@code DELETE  /images/:id} : delete the "id" images.
     *
     * @param id the id of the images to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/images/{id}")
    public ResponseEntity<Void> deleteImages(@PathVariable Long id) {
        log.debug("REST request to delete Images : {}", id);
        imagesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
