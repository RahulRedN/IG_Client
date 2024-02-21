/* eslint-disable react/prop-types */

import classes from "./SkillStageModal.module.css"

function SkillStageModal({  onSelectStage, onCloseModal }) {

  const handleStageSelection = (stage) => {
    onSelectStage(stage);
    onCloseModal();
  };

  return (
<<<<<<< HEAD:src/MultiSelect/SkillStageModal.jsx
    <div className={classes.modal}>
      <div className={classes.modal_content}>
=======
    <div className="modal-skill">
      <div className="modal-content-skill">
>>>>>>> 57b3babfce3867e3f62e03a1ef360d6526788d2f:src/components/JobSeeker/MultiSelect/SkillStageModal.jsx
        <h2>How would you rate yourself on this skill?</h2>
        <ul>
          <li>
            <label>
              <input

                type="radio"
                name="stage"
                value="Beginner"
                onChange={() => handleStageSelection('Beginner')}
              />
              Beginner
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="stage"
                value="Intermediate"
                onChange={() => handleStageSelection('Intermediate')}
              />
              Intermediate
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="stage"
                value="Expert"
                onChange={() => handleStageSelection('Expert')}
              />
              Expert
            </label>
          </li>
        </ul>
        <button onClick={onCloseModal}>Close</button>
      </div>
    </div>
  );
}

export default SkillStageModal;
