/**
 * These are the models that are used to serialize the data
 */
var Profile = require('./models/Profile.js');

/**
 * This class handles the formatting of REST responses to certain
 */
class Serializer {

  /**
   * Serializes data into a `Profile` Object
   *
   * @param {Object} profileData
   * @return {Object}
   */
  static profile(profileData) {
    let profile = {
      name: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].PER_NAMES[0].PER_NAME[0].NAME_DISPLAY[0],
      acadCareer: profileData.SCC_GETCONST_RESP.CONSTITUENT[0].RESIDENCY_OFFICIALS[0].RESIDENCY_OFFICIAL[0].ACAD_CAREER[0]
    };

    return new Profile(profile);
  }

}

module.exports = Serializer;
