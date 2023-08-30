import userProfile from 'app/entities/user-profile/user-profile.reducer';
import document from 'app/entities/document/document.reducer';
import images from 'app/entities/images/images.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userProfile,
  document,
  images,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
