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

    @Column(name = "image_id")
    private Integer imageId;

    @Column(name = "document_index")
    private Integer documentIndex;

    @Column(name = "image_data")
    private String imageData;

    @Column(name = "caption")
    private String caption;

    @ManyToOne
    @JsonIgnoreProperties(value = { "images", "assignedTo" }, allowSetters = true)
    private Document document;

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

    public Integer getImageId() {
        return this.imageId;
    }

    public Images imageId(Integer imageId) {
        this.setImageId(imageId);
        return this;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public Integer getDocumentIndex() {
        return this.documentIndex;
    }

    public Images documentIndex(Integer documentIndex) {
        this.setDocumentIndex(documentIndex);
        return this;
    }

    public void setDocumentIndex(Integer documentIndex) {
        this.documentIndex = documentIndex;
    }

    public String getImageData() {
        return this.imageData;
    }

    public Images imageData(String imageData) {
        this.setImageData(imageData);
        return this;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
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

    public Document getDocument() {
        return this.document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public Images document(Document document) {
        this.setDocument(document);
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
            ", imageId=" + getImageId() +
            ", documentIndex=" + getDocumentIndex() +
            ", imageData='" + getImageData() + "'" +
            ", caption='" + getCaption() + "'" +
            "}";
    }
}
