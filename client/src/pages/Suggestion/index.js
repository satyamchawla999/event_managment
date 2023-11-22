import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { setPage } from "../../feature/user/authSlice";
import "./style.css";
import axios from "axios";

const SuggestionPage = () => {
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState([]);
  useEffect(() => {
    dispatch(setPage({ page: "suggestion" }));
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/suggestions/get-suggestions");
        if(response.status === 200) {
          console.log('fetched successfully');
          setSuggestion(response.data.suggestions);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="suggestionPage">
        <h1 className="text-2xl mb-2 font-bold">Suggestion's</h1>
        <hr></hr>
        <hr></hr>
        <hr></hr>

        <div className="suggestionContainer">
          {suggestion.length === 0 ? (
            <div className="w-full text-black mt-4 text-center">
              No Suggestion's
            </div>
          ) : (
            <>
              {suggestion.map((item) => (
                <div className="suggestionItem">
                  <p>{item?.email}</p>
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                  <p>{item?.message}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;
