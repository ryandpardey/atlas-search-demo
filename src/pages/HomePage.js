// Dependencies
import React, { useState } from "react";
import { useHomeFetch } from "../hooks/useHomeFetch";
import PlayerGrid from "../components/PlayerGrid";
import DreamTeamGrid from "../components/DreamTeamGrid";
import SearchBar from "../components/SearchBar";
import PlayerModal from "../components/PlayerModal";
import AdvancedSearch from "../components/AdvancedSearch";

const HomePage = () => {
  const [position2Fill, setPosition2Fill] = useState(100);
  const [highlightCard, setHighlightCard] = useState(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const [playerIndex, setPlayerIndex] = useState(-100);

  const {
    operator,
    setOperator,
    searchTerm,
    setSearchTerm,
    players,
    dreamTeam,
    setShowDreamTeam,
    // setDreamTeam,
    showPlayerChoices,
    setShowPlayerChoices,
    setSubmitted,
    showAutocompletePlayers,
    setShowAutocompletePlayers,
    salary,
    setSalary,
    age,
    setAge,
    overall,
    setOverall,
    skillMoves,
    setSkillMoves,
    defending,
    setDefending,
    dribbling,
    setDribbling,
    pace,
    setPace,
    showAdvancedSearch,
    setShowAdvancedSearch,
    setPositions,
    setCountries,
    setClubs,
    dob,
    setDob,
  } = useHomeFetch();

  // insert SAVE here

  //-------------------------------- FUNCTION TO ADDPLAYER --------------------------------------------------------
  const addPlayerToTeam = (player, spot) => {
    console.log("Trying to add player.");
    console.log("IN ADDING PLAYER FUNCTION:", spot);

    let position = getPosition(spot);

    const data = {
      position2Fill: spot,
      newPlayer: {
        spot: spot,
        position: position,
        player: player,
      },
    };

    const URL_TO_POST_PLAYER = "";

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // fetch(URL_TO_POST_PLAYER, requestOptions).then(() => {
    //   console.log("SUBMITTED PLAYER!!");
    //   setHighlightCard(null);
    //   setShowPlayerChoices(false);
    //   setShowDreamTeam(true);
    //   setSearchTerm("");
    // });
  };

  //-------------------------------- END FUNCTION TO ADDPLAYER --------------------------------------------------------

  const relegatePlayerFromTeam = async (pos) => {
    console.log(`Trying to remove player ${pos}.`);

    const RELEGATE_PLAYER_URL = ``;

    setPosition2Fill(pos);

    //  const response = await fetch(RELEGATE_PLAYER_URL);

    setShowDreamTeam(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <h2 className="text-center text-4xl text-white">Atlas Search Soccer</h2>
      <div className="flex mx-20 w-full justify-evenly items-center">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          operator={operator}
          setOperator={setOperator}
          setSubmitted={setSubmitted}
          showAutocompletePlayers={showAutocompletePlayers}
          setShowAutocompletePlayers={setShowAutocompletePlayers}
          players={players}
          addPlayerToTeam={addPlayerToTeam}
          position2Fill={position2Fill}
        />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
        onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
      >
        <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
          clipRule="evenodd"
        />
      </svg>

      <PlayerGrid
        header={searchTerm ? null : "Player Search Results"}
        players={players}
        addPlayerToTeam={addPlayerToTeam}
        position2Fill={position2Fill}
        setPosition2Fill={setPosition2Fill}
        setHighlightCard={setHighlightCard}
        highlightCard={highlightCard}
        dreamTeam={dreamTeam}
        setShowPlayerChoices={setShowPlayerChoices}
        showPlayerChoices={showPlayerChoices}
        searchTerm={searchTerm}
        operator={operator}
        setPlayerIndex={setPlayerIndex}
        setShowPlayerModal={setShowPlayerModal}
        showAdvancedSearch={showAdvancedSearch}
      />
      {showAdvancedSearch && (
        <AdvancedSearch
          salary={salary}
          setSalary={setSalary}
          age={age}
          setAge={setAge}
          overall={overall}
          setOverall={setOverall}
          skillMoves={skillMoves}
          setSkillMoves={setSkillMoves}
          defending={defending}
          setDefending={setDefending}
          dribbling={dribbling}
          setDribbling={setDribbling}
          pace={pace}
          setPace={setPace}
          setCountries={setCountries}
          setClubs={setClubs}
          setPositions={setPositions}
          dob={dob}
          setDob={setDob}
        />
      )}

      <br></br>
      <hr
        style={{
          color: "green",
          backgroundColor: "green",
          height: 2,
          borderColor: "green",
        }}
      />

      <div className="w-full bg-black relative">
        <img
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          alt="stadium"
          className="w-full h-full object-cover absolute"
        />
        <DreamTeamGrid
          players={dreamTeam}
          relegatePlayerFromTeam={relegatePlayerFromTeam}
          position2Fill={position2Fill}
          setPosition2Fill={setPosition2Fill}
          setHighlightCard={setHighlightCard}
          highlightCard={highlightCard}
        />
      </div>
      {showPlayerModal ? (
        <PlayerModal
          players={players}
          playerIndex={playerIndex}
          setShowPlayerModal={setShowPlayerModal}
          setPlayerIndex={setPlayerIndex}
          addPlayerToTeam={addPlayerToTeam}
          position2Fill={position2Fill}
        />
      ) : null}
    </div>
  );
};

const getPosition = (spot) => {
  let position = "player";

  switch (spot) {
    case 0:
      position = "goalie";
      break;
    case 1:
      position = "left-back";
      break;
    case 2:
      position = "center-back-left";
      break;
    case 3:
      position = "center-back-right";
      break;
    case 4:
      position = "right-back";
      break;
    case 5:
      position = "left-wing";
      break;
    case 6:
      position = "center-mid";
      break;
    case 7:
      position = "right-wing";
      break;
    case 8:
      position = "forward-left";
      break;
    case 9:
      position = "striker";
      break;
    case 10:
      position = "forward-right";
      break;
    default:
      position = "player";
  }

  return position;
};

export default HomePage;

// SAVE
// const saveToLocalStorage = (items) => {
//   localStorage.setItem("fifa-dream-team", JSON.stringify(items));
// };
//------------------------------------------------------------------------------
// bug BLURB
//   if (position2Fill !== 100) {
//   fetch(URL_TO_POST_PLAYER, requestOptions).then(() => {
//     console.log("SUBMITTED PLAYER!!");
//   });
// }
// if (position2Fill !== 100) {
//   setDreamTeam(
//     dreamTeam.map((member) =>
//       member.spot === spot
//         ? {
//             ...member,
//             player: player,
//           }
//         : { ...member }
//     )
//   );
// saveToLocalStorage(dreamTeam);
//------------------------------------------------------------------------------
// BLURB 2
// setDreamTeam(
//   dreamTeam.map((member) =>
//     member.spot === pos
//       ? {
//           ...member,
//           player: {},
//         }
//       : { ...member }
//   )
// );

// saveToLocalStorage(dreamTeam);
