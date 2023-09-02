package zipcode.paperplane.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Images.
 */
@Entity
@Table(name = "images")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Images implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "image_data")
    private byte[] imageData;

    @Column(name = "image_data_content_type")
    private String imageDataContentType;

    @Column(name = "caption")
    private String caption;

    @Column(name = "image_s_3_url")
    private String imageS3Url;

    @ManyToOne
    @JsonIgnoreProperties(value = { "referenceImageIds", "applicationUser" }, allowSetters = true)
    private Document referenceDocumentId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Images id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImageData() {
        return this.imageData;
    }

    public Images imageData(byte[] imageData) {
        this.setImageData(imageData);
        return this;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getImageDataContentType() {
        return this.imageDataContentType;
    }

    public Images imageDataContentType(String imageDataContentType) {
        this.imageDataContentType = imageDataContentType;
        return this;
    }

    public void setImageDataContentType(String imageDataContentType) {
        this.imageDataContentType = imageDataContentType;
    }

    public String getCaption() {
        return this.caption;
    }

    public Images caption(String caption) {
        this.setCaption(caption);
        return this;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getImageS3Url() {
        return this.imageS3Url;
    }

    public Images imageS3Url(String imageS3Url) {
        this.setImageS3Url(imageS3Url);
        return this;
    }

    public void setImageS3Url(String imageS3Url) {
        this.imageS3Url = imageS3Url;
    }

    public Document getReferenceDocumentId() {
        return this.referenceDocumentId;
    }

    public void setReferenceDocumentId(Document document) {
        this.referenceDocumentId = document;
    }

    public Images referenceDocumentId(Document document) {
        this.setReferenceDocumentId(document);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Images)) {
            return false;
        }
        return id != null && id.equals(((Images) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Images{" +
            "id=" + getId() +
            ", imageData='" + getImageData() + "'" +
            ", imageDataContentType='" + getImageDataContentType() + "'" +
            ", caption='" + getCaption() + "'" +
            ", imageS3Url='" + getImageS3Url() + "'" +
            "}";
    }
}
