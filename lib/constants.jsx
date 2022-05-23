const DRUPAL_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const IMAGE_URL = process.env.NEXT_IMAGE_DOMAIN || DRUPAL_URL;

module.exports = {
  DRUPAL_URL,
  IMAGE_URL,
};
