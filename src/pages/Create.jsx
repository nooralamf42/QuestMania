import { FaDice } from "react-icons/fa";
import { useState } from "react";
import { auth, createMessege, database } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import questions from "../data/data";
import { toast } from "react-toastify";
import { Loading } from "../components";

function Create() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { username } = useParams();
  const diceHandler = () => {
    const questionNumber = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[questionNumber];
    setMessage(randomQuestion);
  };
  const [loading, setLoading] = useState(false);
  const clickHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    createMessege(message, username)
      .then(() => navigate("/sent/" + username))
      .catch((e) => toast(e))
      .finally(() => setLoading(false));
  };

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };
  return (
    <Container>
      <div className="w-full max-w-[500px] mx-auto py-10 relative ">
        <div className="rounded-t-3xl overflow-hidden">
          <div className="bg-gray-200 flex items-center gap-4 p-3">
              <h2 className="font-semibold">send message anonymous!!</h2>
          </div>
          <form onSubmit={clickHandler}>
            <textarea
              type="text"
              minLength={5}
              required
              value={message}
              onInput={inputHandler}
              className="p-2 focus:outline-none w-full text-xl bg-gray-150 bg-opacity-80 backdrop-blur-md rounded-b-3xl"
              placeholder="type your question here"
            />
            <button
              type="button"
              className="absolute bottom-28 right-3 rounded-full bg-white bg-opacity-30 p-1 m-2"
              onClick={diceHandler}
            >
              <FaDice color="black" size={28} />
            </button>
            <button
              className="mt-5 text-white text-lg hover:bg-opacity-70 duration-200 bg-black py-2 rounded-2xl w-full"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Loading visible={loading} />
    </Container>
  );
}

export default Create;
