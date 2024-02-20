import { useEffect, useRef, useState } from "react";
import "../MultiSelect/MultiSelect.css";
import Pill from "../components/pill/Pill";
import SkillStageModal from "./SkillStageModal";

function MultiSelect() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillSet, setSelectedSkillSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkillForModal, setSelectedSkillForModal] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSkills = () => {
      setActiveSuggestion(0);
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      const mockData = [
        { id: 1, name: "Java" },
        { id: 2, name: "React" },
        { id: 3, name: "JavaScript" },
        { id: 4, name: "Python" },
        { id: 5, name: "HTML" },
        { id: 6, name: "CSS" },
        { id: 7, name: "C++" },
        { id: 8, name: "C#" },
        { id: 9, name: "PHP" },
        { id: 10, name: "SQL" },
        { id: 11, name: "Ruby" },
        { id: 12, name: "Swift" },
        { id: 13, name: "Objective-C" },
        { id: 14, name: "R" },
        { id: 15, name: "Go" },
        { id: 16, name: "TypeScript" },
        { id: 17, name: "Angular" },
        { id: 18, name: "Vue.js" },
        { id: 19, name: "Node.js" },
        { id: 20, name: "Express.js" },
        { id: 21, name: "MongoDB" },
        { id: 22, name: "Firebase" },
        { id: 23, name: "Django" },
        { id: 24, name: "Flask" },
        { id: 25, name: "Ruby on Rails" },
        { id: 26, name: "Spring" },
        { id: 27, name: "ASP.NET" },
        { id: 28, name: "Laravel" },
        { id: 29, name: "Symfony" },
        { id: 30, name: "Redux" },
        { id: 31, name: "GraphQL" },
        { id: 32, name: "RESTful APIs" },
        { id: 33, name: "SOAP" },
        { id: 34, name: "Jenkins" },
        { id: 35, name: "Docker" },
        { id: 36, name: "Kubernetes" },
        { id: 37, name: "Git" },
        { id: 38, name: "Subversion (SVN)" },
        { id: 39, name: "Mercurial" },
        { id: 40, name: "Jira" },
        { id: 41, name: "Confluence" },
        { id: 42, name: "Trello" },
        { id: 43, name: "Bitbucket" },
        { id: 44, name: "Agile Methodologies" },
        { id: 45, name: "Scrum" },
        { id: 46, name: "Kanban" },
        { id: 47, name: "Lean Software Development" },
        { id: 48, name: "Continuous Integration (CI)" },
        { id: 49, name: "Continuous Deployment (CD)" },
        { id: 50, name: "Test-Driven Development (TDD)" },
       
    ];
    


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
      setShowModal(true);
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
    setShowModal(false);
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

  const handleSubmit = () => {
    alert("Skills Submitted");
    console.log("Selected skills:", selectedSkills);

    setSelectedSkills([]);
    setSelectedSkillSet(new Set());
  };

  return (
    <div className="skill-search-container">
      <h1 className="heading">Skills</h1>
      <p className="sub-heading">Add Skills</p>
      <div className="skill-search-input">
        {selectedSkills.map((skill) => {
          return (
            <Pill
              key={skill.id}
              text={`${skill.name} (${skill.stage})`}
              onClick={() => handleRemoveSkill(skill)}
            />
          );
        })}
        <div>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. React Js"
            onKeyDown={handleKeyDown}
          />
          <ul className="suggestions-list">
            {suggestions.map((skill, index) => (
              <li
                className={index === activeSuggestion ? "active" : ""}
                key={skill.id}
                onClick={() => handleSelectSkill(skill)}
              >
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && selectedSkillForModal && (
        <SkillStageModal
          skill={selectedSkillForModal}
          onSelectStage={handleSkillStageSelection}
          onClose={() => setShowModal(false)}
        />
      )}
      <button className="multi-submit-btn" onClick={handleSubmit}>Submit</button>
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
