
/**
 * Serves as the model to serialize data into a `Profile` Object
 */
class Profile {
  constructor(profileData) {
    // Initializes public fields
    let fields = {
      name: this.name,
      acadCareer: this.acadCareer
    } = profileData;
  }

  get name() {
    return this.name;
  }
}

module.exports = Profile;
