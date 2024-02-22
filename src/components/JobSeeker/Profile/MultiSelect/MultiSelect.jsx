import { useEffect, useRef, useState } from "react";
import Pill from "./pill/Pill";
import SkillStageModal from "./SkillStageModal";
import "./MultiSelect.css";
import mockData from "./MockData";

import axios from "axios";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSkills } from "../../../../redux/jobseekerReducer";

function MultiSelect({ onClose }) {
  const uid = useSelector((state) => state.jobseeker.data.uid);
  const skills = useSelector((state) => state.jobseeker.data.skills);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillSet, setSelectedSkillSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [selectedSkillForModal, setSelectedSkillForModal] = useState(null);

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let SS = [],
      SSS = new Set();
    skills.forEach((str) => {
      const [id, name, stage] = str.split(";");
      SS = [...SS, { id, name, stage }];
      SSS.add(name);
    });

    setSelectedSkills(SS);
    setSelectedSkillSet(SSS);
  }, [skills]);

  useEffect(() => {
    const fetchSkills = () => {
      setActiveSuggestion(0);
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      const filteredSkills = mockData.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !selectedSkillSet.has(skill.name)
      );
      setSuggestions(filteredSkills);
    };

    fetchSkills();
  }, [searchTerm, selectedSkillSet]);

  const handleSelectSkill = (skill) => {
    if (!selectedSkillSet.has(skill.name)) {
      setSelectedSkillForModal(skill);
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter(
      (selectedSkill) => selectedSkill.id !== skill.id
    );
    setSelectedSkills(updatedSkills);

    const updatedSkillSet = new Set(selectedSkillSet);
    updatedSkillSet.delete(skill.name);
    setSelectedSkillSet(updatedSkillSet);
  };

  const handleSkillStageSelection = (stage) => {
    const updatedSkills = [
      ...selectedSkills,
      { ...selectedSkillForModal, stage },
    ];
    setSelectedSkills(updatedSkills);
    setSelectedSkillSet(
      new Set([...selectedSkillSet, selectedSkillForModal.name])
    );
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
    setSelectedSkillForModal(null);
    // onClose();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedSkills.length > 0
    ) {
      const lastSkill = selectedSkills[selectedSkills.length - 1];
      handleRemoveSkill(lastSkill);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.length
    ) {
      handleSelectSkill(suggestions[activeSuggestion]);
    }
  };

  const handleSubmit = async () => {
    const data = selectedSkills.map(
      (obj) => obj.id + ";" + obj.name + ";" + obj.stage
    );
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER + "/api/jobseeker/updateSkills",
        { uid, skills: data }
      );

      if (res.status == 200) {
        toast.success("Skills Updated!");
        dispatch(setSkills(data));
      }
    } catch (error) {
      toast.error("An error occured!");
      console.log(error);
    }
    setSelectedSkills([]);
    setSelectedSkillSet(new Set());
    onClose();
  };

  return (
    <div className="modal-multi">
      <Toaster position="top-center" />
      <div className="modal-content-multi">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-header">
          <div className="multi-select-container">
            <h1 className="heading">Skills</h1>

            <h2 className="sub-heading"> Add Skills</h2>
          </div>
          <div className="skill-search-body">
            <input
              ref={inputRef}
              type="text"
              className="skill-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for skills"
              onKeyDown={handleKeyDown}
            />
            <ul className="suggestions-list">
              {suggestions.map((skill, index) => (
                <li
                  className={index === activeSuggestion ? "active" : ""}
                  key={skill.id}
                  onClick={() => handleSelectSkill(skill)}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            <div className="selected-skills">
              {selectedSkills.map((skill) => (
                <Pill
                  key={skill.id}
                  text={`${skill.name} (${skill.stage})`}
                  onClick={() => handleRemoveSkill(skill)}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="submit-multi-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      {selectedSkillForModal && (
        <SkillStageModal
          skill={selectedSkillForModal}
          onSelectStage={handleSkillStageSelection}
          onClose={() => setSelectedSkillForModal(null)}
          onCloseModal={() => setSelectedSkillForModal(null)}
        />
      )}
    </div>
  );
}

export default MultiSelect;

// import {useEffect, useRef, useState} from "react";
// import "../MultiSelect/MultiSelect.css"
// import Pill from "../components/pill/Pill"

// function MultiSelect() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectedUserSet, setSelectedUserSet] = useState(new Set());
//   const [activeSuggestion, setActiveSuggestion] = useState(0);

//   const inputRef = useRef(null);

//   // https://dummyjson.com/users/search?q=Jo

//   useEffect(() => {
//     const fetchUsers = () => {
//       setActiveSuggestion(0);
//       if (searchTerm.trim() === "") {
//         setSuggestions([]);
//         return;
//       }

//       // fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
//       //   .then((res) => res.json())
//       //   .then((data) => setSuggestions(data))
//       //   .catch((err) => {
//       //     console.error(err);
//       //   });
//     };

//     fetchUsers();
//   }, [searchTerm]);

//   const dummyUsers = [
//     { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", image: "john.jpg" },
//     { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com", image: "jane.jpg" },
//     { id: 3, firstName: "Alice", lastName: "Smith", email: "alice@example.com", image: "alice.jpg" },
//     { id: 4, firstName: "Bob", lastName: "Smith", email: "bob@example.com", image: "bob.jpg" },
//   ];

//   const handleSelectUser = (user) => {
//     setSelectedUsers([...selectedUsers, user]);
//     setSelectedUserSet(new Set([...selectedUserSet, user.email]));
//     setSearchTerm("");
//     setSuggestions([]);
//     inputRef.current.focus();
//   };

//   const handleRemoveUser = (user) => {
//     const updatedUsers = selectedUsers.filter(
//       (selectedUser) => selectedUser.id !== user.id
//     );
//     setSelectedUsers(updatedUsers);

//     const updatedEmails = new Set(selectedUserSet);
//     updatedEmails.delete(user.email);
//     setSelectedUserSet(updatedEmails);
//   };

//   const handleKeyDown = (e) => {
//     if (
//       e.key === "Backspace" &&
//       e.target.value === "" &&
//       selectedUsers.length > 0
//     ) {
//       const lastUser = selectedUsers[selectedUsers.length - 1];
//       handleRemoveUser(lastUser);
//       setSuggestions([]);
//     } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
//       e.preventDefault();
//       setActiveSuggestion((prevIndex) =>
//         prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
//       );
//     } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
//       e.preventDefault();
//       setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
//     } else if (
//       e.key === "Enter" &&
//       activeSuggestion >= 0 &&
//       activeSuggestion < suggestions.users.length
//     ) {
//       handleSelectUser(suggestions.users[activeSuggestion]);
//     }
//   };

//   return (
//     <div className="user-search-container">
//       <div className="user-search-input">
//         {/* Pills */}
//         {selectedUsers.map((user) => {
//           return (
//             <Pill
//               key={user.id}
//               // image={user.image}
//               text={`${user.firstName} ${user.lastName}`}
//               onClick={() => handleRemoveUser(user)}
//             />
//           );
//         })}
//         {/* input feild with search suggestions */}
//         <div>
//           <input
//             ref={inputRef}
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search For a User..."
//             onKeyDown={handleKeyDown}
//           />
//           {/* Search Suggestions */}
//           <ul className="suggestions-list">
//             {suggestions?.users?.map((user, index) => {
//               return !selectedUserSet.has(user.id) ? (
//                 <li
//                   className={index === activeSuggestion ? "active" : ""}
//                   key={user.id}
//                   onClick={() => handleSelectUser(user)}
//                 >
//                   {/* <img
//                     src={user.image}
//                     alt={`${user.firstName} ${user.lastName}`}
//                   /> */}
//                   <span>
//                     {user.firstName} {user.lastName}
//                   </span>
//                 </li>
//               ) : (
//                 <></>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MultiSelect;

//!second one

// import { useEffect, useRef, useState } from "react";
// import "../MultiSelect/MultiSelect.css";
// import Pill from "../components/pill/Pill";

// function MultiSelect() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [selectedUserSet, setSelectedUserSet] = useState(new Set());
//   const [activeSuggestion, setActiveSuggestion] = useState(0);

//   const inputRef = useRef(null);

//   // Dummy array to simulate user suggestions
//   const dummyUsers = [
//     { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", image: "john.jpg" },
//     { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com", image: "jane.jpg" },
//     { id: 3, firstName: "Alice", lastName: "Smith", email: "alice@example.com", image: "alice.jpg" },
//     { id: 4, firstName: "Bob", lastName: "Smith", email: "bob@example.com", image: "bob.jpg" },
//   ];

//   useEffect(() => {
//     // Filter dummyUsers based on searchTerm
//     const filteredUsers = dummyUsers.filter(user =>
//       `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSuggestions(filteredUsers);
//   }, [searchTerm]);

//   const handleSelectUser = (user) => {
//     setSelectedUsers([...selectedUsers, user]);
//     setSelectedUserSet(new Set([...selectedUserSet, user.email]));
//     setSearchTerm("");
//     setSuggestions([]);
//     inputRef.current.focus();
//   };

//   const handleRemoveUser = (user) => {
//     const updatedUsers = selectedUsers.filter(
//       (selectedUser) => selectedUser.id !== user.id
//     );
//     setSelectedUsers(updatedUsers);

//     const updatedEmails = new Set(selectedUserSet);
//     updatedEmails.delete(user.email);
//     setSelectedUserSet(updatedEmails);
//   };

//   const handleKeyDown = (e) => {
//     if (
//       e.key === "Backspace" &&
//       e.target.value === "" &&
//       selectedUsers.length > 0
//     ) {
//       const lastUser = selectedUsers[selectedUsers.length - 1];
//       handleRemoveUser(lastUser);
//       setSuggestions([]);
//     } else if (e.key === "ArrowDown" && suggestions?.length > 0) {
//       e.preventDefault();
//       setActiveSuggestion((prevIndex) =>
//         prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
//       );
//     } else if (e.key === "ArrowUp" && suggestions?.length > 0) {
//       e.preventDefault();
//       setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
//     } else if (
//       e.key === "Enter" &&
//       activeSuggestion >= 0 &&
//       activeSuggestion < suggestions.length
//     ) {
//       handleSelectUser(suggestions[activeSuggestion]);
//     }
//   };

//   return (
//     <div className="user-search-container">
//       <div className="user-search-input">
//         {/* Pills */}
//         {selectedUsers.map((user) => {
//           return (
//             <Pill
//               key={user.email}
//               image={user.image}
//               text={`${user.firstName} ${user.lastName}`}
//               onClick={() => handleRemoveUser(user)}
//             />
//           );
//         })}
//         {/* input feild with search suggestions */}
//         <div>
//           <input
//             ref={inputRef}
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search For a User..."
//             onKeyDown={handleKeyDown}
//           />
//           {/* Search Suggestions */}
//           <ul className="suggestions-list">
//             {suggestions.map((user, index) => {
//               return !selectedUserSet.has(user.email) ? (
//                 <li
//                   className={index === activeSuggestion ? "active" : ""}
//                   key={user.email}
//                   onClick={() => handleSelectUser(user)}
//                 >
//                   <img
//                     src={user.image}
//                     alt={`${user.firstName} ${user.lastName}`}
//                   />
//                   <span>
//                     {user.firstName} {user.lastName}
//                   </span>
//                 </li>
//               ) : (
//                 <></>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MultiSelect;
