package zipcode.paperplane.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ApplicationUser.
 */
@Entity
@Table(name = "application_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApplicationUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(value = 42)
    @Max(value = 42)
    @Column(name = "application_user_id")
    private Integer applicationUserId;

    @Column(name = "access_control")
    private Boolean accessControl;

    @OneToOne
    @JoinColumn(unique = true)
    private User internalUserReferenceId;

    @OneToMany(mappedBy = "applicationUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "referenceImageIds", "applicationUser" }, allowSetters = true)
    private Set<Document> applicationUserReferenceIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ApplicationUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getApplicationUserId() {
        return this.applicationUserId;
    }

    public ApplicationUser applicationUserId(Integer applicationUserId) {
        this.setApplicationUserId(applicationUserId);
        return this;
    }

    public void setApplicationUserId(Integer applicationUserId) {
        this.applicationUserId = applicationUserId;
    }

    public Boolean getAccessControl() {
        return this.accessControl;
    }

    public ApplicationUser accessControl(Boolean accessControl) {
        this.setAccessControl(accessControl);
        return this;
    }

    public void setAccessControl(Boolean accessControl) {
        this.accessControl = accessControl;
    }

    public User getInternalUserReferenceId() {
        return this.internalUserReferenceId;
    }

    public void setInternalUserReferenceId(User user) {
        this.internalUserReferenceId = user;
    }

    public ApplicationUser internalUserReferenceId(User user) {
        this.setInternalUserReferenceId(user);
        return this;
    }

    public Set<Document> getApplicationUserReferenceIds() {
        return this.applicationUserReferenceIds;
    }

    public void setApplicationUserReferenceIds(Set<Document> documents) {
        if (this.applicationUserReferenceIds != null) {
            this.applicationUserReferenceIds.forEach(i -> i.setApplicationUser(null));
        }
        if (documents != null) {
            documents.forEach(i -> i.setApplicationUser(this));
        }
        this.applicationUserReferenceIds = documents;
    }

    public ApplicationUser applicationUserReferenceIds(Set<Document> documents) {
        this.setApplicationUserReferenceIds(documents);
        return this;
    }

    public ApplicationUser addApplicationUserReferenceId(Document document) {
        this.applicationUserReferenceIds.add(document);
        document.setApplicationUser(this);
        return this;
    }

    public ApplicationUser removeApplicationUserReferenceId(Document document) {
        this.applicationUserReferenceIds.remove(document);
        document.setApplicationUser(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApplicationUser)) {
            return false;
        }
        return id != null && id.equals(((ApplicationUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApplicationUser{" +
            "id=" + getId() +
            ", applicationUserId=" + getApplicationUserId() +
            ", accessControl='" + getAccessControl() + "'" +
            "}";
    }
}
