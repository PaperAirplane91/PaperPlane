package zipcode.paperplane.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "archived")
    private Boolean archived;

    @OneToMany(mappedBy = "referenceDocumentId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "referenceDocumentId" }, allowSetters = true)
    private Set<Images> referenceImageIds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "internalUserReferenceId", "applicationUserReferenceIds" }, allowSetters = true)
    private ApplicationUser applicationUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Document id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Document title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public Document content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getArchived() {
        return this.archived;
    }

    public Document archived(Boolean archived) {
        this.setArchived(archived);
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Set<Images> getReferenceImageIds() {
        return this.referenceImageIds;
    }

    public void setReferenceImageIds(Set<Images> images) {
        if (this.referenceImageIds != null) {
            this.referenceImageIds.forEach(i -> i.setReferenceDocumentId(null));
        }
        if (images != null) {
            images.forEach(i -> i.setReferenceDocumentId(this));
        }
        this.referenceImageIds = images;
    }

    public Document referenceImageIds(Set<Images> images) {
        this.setReferenceImageIds(images);
        return this;
    }

    public Document addReferenceImageId(Images images) {
        this.referenceImageIds.add(images);
        images.setReferenceDocumentId(this);
        return this;
    }

    public Document removeReferenceImageId(Images images) {
        this.referenceImageIds.remove(images);
        images.setReferenceDocumentId(null);
        return this;
    }

    public ApplicationUser getApplicationUser() {
        return this.applicationUser;
    }

    public void setApplicationUser(ApplicationUser applicationUser) {
        this.applicationUser = applicationUser;
    }

    public Document applicationUser(ApplicationUser applicationUser) {
        this.setApplicationUser(applicationUser);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", archived='" + getArchived() + "'" +
            "}";
    }
}
