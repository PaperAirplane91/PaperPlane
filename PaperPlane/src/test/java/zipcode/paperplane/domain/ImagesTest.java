package zipcode.paperplane.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import zipcode.paperplane.web.rest.TestUtil;

class ImagesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Images.class);
        Images images1 = new Images();
        images1.setId(1L);
        Images images2 = new Images();
        images2.setId(images1.getId());
        assertThat(images1).isEqualTo(images2);
        images2.setId(2L);
        assertThat(images1).isNotEqualTo(images2);
        images1.setId(null);
        assertThat(images1).isNotEqualTo(images2);
    }
}
