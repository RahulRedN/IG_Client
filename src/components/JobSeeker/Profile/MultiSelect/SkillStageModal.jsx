/* eslint-disable react/prop-types */

import "./SkillStageModal.css"

function SkillStageModal({  onSelectStage, onCloseModal }) {

  const handleStageSelection = (stage) => {
    onSelectStage(stage);
    onCloseModal();
  };

  return (
    <div className="modal-skill">
      <div className="modal-content-skill">
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