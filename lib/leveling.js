// Requires
const Skill = require("../models/skill");
const Character = require("../models/character");

// Create leveling object
let levelingObj = {};

// LEVELING UP
// level up skill progress by 1, if skill progress would be 10 then level up skill and reset skill progress to 0
levelingObj.levelSkill = async (skillId) => {
    await Skill.findById(skillId, (err, foundSkill) => {
        if (err) {
            console.log(err);
        } else {
            if (foundSkill.progress == 9) {
                foundSkill.progress = 0;
                foundSkill.level += 1;
                foundSkill.save();
            } else {
                foundSkill.progress += 1;
                foundSkill.save();
            }
        }
    });
};

levelingObj.levelCharacter = async (characterId) => {
    await Character.findById(characterId, (err, foundCharacter) => {
        if (err) {
            console.log(err);
        } else {
            if (foundCharacter.levelProgress == 9) {
                foundCharacter.levelProgress = 0;
                foundCharacter.level += 1;
                foundCharacter.save();
            } else {
                foundCharacter.levelProgress += 1;
                foundCharacter.save();
            }
        }
    });
};

// DELEVELING

// Export leveling object
module.exports = levelingObj;