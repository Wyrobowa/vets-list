import removeTags from './modules/removeTags';
import googleMaps from './modules/googleMaps';
import gallerySliderInit from './modules/gallerySlider';
import galleryRemoveImages from './modules/galleryRemoveImages';
import starRating from './modules/starRating';
import typeAhead from './modules/typeAhead';

removeTags();
googleMaps();
gallerySliderInit();
galleryRemoveImages();
starRating();
typeAhead(document.querySelector('.search'));
