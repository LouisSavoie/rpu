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

// level up character progress by 1, if character progress would be 10 then level up character and reset character progress to 0
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
// delevel skill progress by 1, if skill progress would be -1 then delevel skill and reset skill progress to 9
levelingObj.delevelSkill = async (skillId) => {
    await Skill.findById(skillId, (err, foundSkill) => {
        if (err) {
            console.log(err);
        } else {
            if (foundSkill.progress == 0) {
                foundSkill.progress = 9;
                foundSkill.level -= 1;
                foundSkill.save();
            } else {
                foundSkill.progress -= 1;
                foundSkill.save();
            }
        }
    });
};

// delevel character progress by 1, if character progress would be -1 then delevel character and reset character progress to 9
levelingObj.delevelCharacter = async (characterId) => {
    await Character.findById(characterId, (err, foundCharacter) => {
        if (err) {
            console.log(err);
        } else {
            if (foundCharacter.levelProgress == 0) {
                foundCharacter.levelProgress = 9;
                foundCharacter.level -= 1;
                foundCharacter.save();
            } else {
                foundCharacter.levelProgress -= 1;
                foundCharacter.save();
            }
        }
    });
};

// Delete Skill Specific Deleveling
// delevel character progress by skill progress, if character progress would be <0 then delevel character and reset character progress to 9 - remainder, then delevel character by skill level
levelingObj.deletedSkill = async (characterId, skill) => {
    await Character.findById(characterId, (err, foundCharacter) => {
        if (err) {
            console.log(err);
        } else {
            if (skill.progress <= foundCharacter.levelProgress) {
                foundCharacter.levelProgress -= skill.progress;
                foundCharacter.level -= skill.level;
                foundCharacter.save();
            } else {
                let helper = skill.progress - foundCharacter.levelProgress;
                foundCharacter.levelProgress = 10 - helper;
                foundCharacter.level -= 1 + skill.level;
                foundCharacter.save();
            }
        }
    });
};

// Export leveling object
module.exports = levelingObj;